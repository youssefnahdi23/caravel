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

const COOKIE_NAME = 'caravel_community_sent';
const ALLOWED_INTERESTS = new Set([
  'Meeting the community',
  'Building a project',
  'Sharing my skills',
  'Learning and exploring',
]);

export default async function handler(req, res) {
  if (onlyPost(req, res)) return;

  try {
    if (recentlySubmitted(req, COOKIE_NAME)) {
      res.setHeader('Retry-After', '86400');
      return res.status(429).json({ error: 'Submission limit reached' });
    }

    const body = parseBody(req);
    if (clean(body.website)) return res.status(200).json({ ok: true });

    const name = cleanHeader(body.name, 100);
    const email = clean(body.email, 254).toLowerCase();
    const interest = clean(body.interest, 100);
    if (!name || !isEmail(email) || !ALLOWED_INTERESTS.has(interest)) {
      return res.status(400).json({ error: 'Invalid form details' });
    }

    await sendFormEmail({
      replyTo: { name, address: email },
      subject: `New Caravel community request — ${name}`,
      text: `New Caravel community request\n\nName: ${name}\nEmail: ${email}\nMain interest: ${interest}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:620px;margin:auto;color:#0b2b45">
          <div style="background:#082f52;color:#fff;padding:28px 32px"><strong style="font-size:22px">Caravel</strong><p style="margin:8px 0 0;color:#80d1ee">New community request</p></div>
          <div style="padding:30px 32px;background:#fbfaf6">
            <h1 style="font-size:27px;margin:0 0 24px;color:#082f52">${escapeHtml(name)} wants to join</h1>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:12px 0;border-top:1px solid #d9dfe2;color:#647584">Email</td><td style="padding:12px 0;border-top:1px solid #d9dfe2;text-align:right"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:12px 0;border-top:1px solid #d9dfe2;color:#647584">Interested in</td><td style="padding:12px 0;border-top:1px solid #d9dfe2;text-align:right">${escapeHtml(interest)}</td></tr>
            </table>
          </div>
        </div>`,
    });

    setSubmissionCookie(res, COOKIE_NAME);
    return res.status(200).json({ ok: true });
  } catch (error) {
    if (error instanceof SyntaxError) return res.status(400).json({ error: 'Invalid request body' });
    console.error('Community request email failed', error);
    return res.status(500).json({ error: 'Email delivery failed' });
  }
}
