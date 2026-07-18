import crypto from 'node:crypto';

const DAY_SECONDS = 24 * 60 * 60;
const COOKIE_NAME = 'caravel_project_sent';

function clean(value, max = 200) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(value) {
  return clean(value, 500)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function signature(timestamp, secret) {
  return crypto.createHmac('sha256', secret).update(timestamp).digest('base64url');
}

function recentlySubmitted(req, secret) {
  const cookieHeader = req.headers.cookie || '';
  const raw = cookieHeader.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${COOKIE_NAME}=`))?.split('=')[1];
  if (!raw) return false;
  const [timestamp, providedSignature] = raw.split('.');
  if (!timestamp || !providedSignature || !/^\d+$/.test(timestamp)) return false;
  const expectedSignature = signature(timestamp, secret);
  const validSignature = providedSignature.length === expectedSignature.length
    && crypto.timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature));
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  return validSignature && age >= 0 && age < DAY_SECONDS;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const recipientEmail = process.env.PROJECT_LEAD_EMAIL || 'youssefnahdi95@gmail.com';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || recipientEmail;
  const senderName = process.env.BREVO_SENDER_NAME || 'Caravel Studio';
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  if (recentlySubmitted(req, apiKey)) {
    res.setHeader('Retry-After', String(DAY_SECONDS));
    return res.status(429).json({ error: 'Submission limit reached' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  } catch {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  // Honeypot fields are invisible to people and commonly filled by bots.
  if (clean(body.website)) return res.status(200).json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 254).toLowerCase();
  const business = clean(body.business, 100);
  const company = clean(body.company, 120) || '—';
  const packageName = clean(body.packageName, 150);
  const packagePrice = clean(body.packagePrice, 40);
  const packageSlug = clean(body.packageSlug, 100);
  if (!name || !isEmail(email) || !business || !packageName || !packageSlug) {
    return res.status(400).json({ error: 'Invalid form details' });
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { accept: 'application/json', 'api-key': apiKey, 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: recipientEmail, name: 'Youssef Nahdi' }],
      replyTo: { email, name },
      subject: `New project request — ${packageName}`,
      tags: ['caravel-project-request'],
      htmlContent: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#0b2b45">
          <div style="background:#082f52;color:#fff;padding:28px 32px"><strong style="font-size:22px">Caravel Studio</strong><p style="margin:8px 0 0;color:#80d1ee">New project enquiry</p></div>
          <div style="padding:30px 32px;background:#fbfaf6">
            <p style="margin-top:0">A visitor is interested in:</p>
            <h1 style="font-size:27px;margin:8px 0;color:#082f52">${escapeHtml(packageName)}</h1>
            <p style="font-size:18px;color:#e85f48;margin-top:0">Starting from ${escapeHtml(packagePrice)}</p>
            <table style="width:100%;border-collapse:collapse;margin-top:28px">
              <tr><td style="padding:12px 0;border-top:1px solid #d9dfe2;color:#647584">Name</td><td style="padding:12px 0;border-top:1px solid #d9dfe2;text-align:right"><strong>${escapeHtml(name)}</strong></td></tr>
              <tr><td style="padding:12px 0;border-top:1px solid #d9dfe2;color:#647584">Email</td><td style="padding:12px 0;border-top:1px solid #d9dfe2;text-align:right"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:12px 0;border-top:1px solid #d9dfe2;color:#647584">Business type</td><td style="padding:12px 0;border-top:1px solid #d9dfe2;text-align:right">${escapeHtml(business)}</td></tr>
              <tr><td style="padding:12px 0;border-top:1px solid #d9dfe2;color:#647584">Business name</td><td style="padding:12px 0;border-top:1px solid #d9dfe2;text-align:right">${escapeHtml(company)}</td></tr>
            </table>
            <p style="margin:28px 0 0"><a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#ff795e;color:#082f52;text-decoration:none;font-weight:bold;padding:13px 20px;border-radius:30px">Reply to ${escapeHtml(name)}</a></p>
          </div>
        </div>`,
    }),
  });

  if (!response.ok) {
    console.error('Brevo send failed', response.status, await response.text());
    return res.status(502).json({ error: 'Email delivery failed' });
  }

  const timestamp = String(Math.floor(Date.now() / 1000));
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${timestamp}.${signature(timestamp, apiKey)}; Max-Age=${DAY_SECONDS}; Path=/; HttpOnly; Secure; SameSite=Strict`);
  return res.status(200).json({ ok: true });
}
