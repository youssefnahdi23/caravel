import {
  clean,
  cleanHeader,
  escapeHtml,
  isEmail,
  onlyPost,
  parseBody,
  recentlySubmitted,
  sendFormEmail,
  setSubmissionCookie,
} from './_mailer.js';

const COOKIE_NAME = 'caravel_project_sent';

export default async function handler(req, res) {
  if (onlyPost(req, res)) return;

  try {
    if (recentlySubmitted(req, COOKIE_NAME)) {
      res.setHeader('Retry-After', '86400');
      return res.status(429).json({ error: 'Submission limit reached' });
    }

    const body = parseBody(req);
    // This field is hidden from people but is commonly filled by bots.
    if (clean(body.website)) return res.status(200).json({ ok: true });

    const name = cleanHeader(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const business = clean(body.business, 100);
    const company = clean(body.company, 120) || '—';
    const packageName = cleanHeader(body.packageName, 150);
    const packagePrice = clean(body.packagePrice, 40);
    const packageSlug = clean(body.packageSlug, 100);
    if (!name || !isEmail(email) || !business || !packageName || !packageSlug) {
      return res.status(400).json({ error: 'Invalid form details' });
    }

    await sendFormEmail({
      replyTo: { name, address: email },
      subject: `New project request — ${packageName}`,
      text: `New Caravel Studio project request\n\nPackage: ${packageName}\nStarting from: ${packagePrice}\nName: ${name}\nEmail: ${email}\nBusiness type: ${business}\nBusiness name: ${company}`,
      html: `
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
          </div>
        </div>`,
    });

    setSubmissionCookie(res, COOKIE_NAME);
    return res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) return res.status(400).json({ error: 'Invalid request body' });
    console.error('Project request email failed', error);
    return res.status(500).json({ error: 'Email delivery failed' });
  }
}
