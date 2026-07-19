import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const DAY_SECONDS = 24 * 60 * 60;

export function clean(value, max = 200) {
  return String(value || '').trim().slice(0, max);
}

export function cleanHeader(value, max = 200) {
  return clean(value, max).replace(/[\r\n]+/g, ' ');
}

export function escapeHtml(value) {
  return clean(value, 500)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export function isPhone(value) {
  const digits = value.replace(/\D/g, '');
  return /^[+\d().\s-]+$/.test(value) && digits.length >= 8 && digits.length <= 15;
}

export function parseBody(req) {
  if (typeof req.body !== 'string') return req.body || {};
  return JSON.parse(req.body || '{}');
}

function emailConfig() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD?.replaceAll(' ', '');
  if (!user || !pass) throw new Error('Gmail is not configured');

  return {
    user,
    recipient: process.env.FORM_RECIPIENT_EMAIL || user,
    secret: process.env.FORM_SECRET || pass,
  };
}

export async function sendFormEmail({ replyTo, subject, html, text }) {
  const { user, recipient } = emailConfig();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass: process.env.GMAIL_APP_PASSWORD.replaceAll(' ', '') },
  });

  await transporter.sendMail({
    from: { name: 'Caravel Website', address: user },
    to: recipient,
    replyTo,
    subject,
    html,
    text,
  });
}

function signature(cookieName, timestamp, secret) {
  return crypto.createHmac('sha256', secret).update(`${cookieName}:${timestamp}`).digest('base64url');
}

export function recentlySubmitted(req, cookieName) {
  const { secret } = emailConfig();
  const cookieHeader = req.headers.cookie || '';
  const raw = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);
  if (!raw) return false;

  const [timestamp, providedSignature] = raw.split('.');
  if (!timestamp || !providedSignature || !/^\d+$/.test(timestamp)) return false;
  const expectedSignature = signature(cookieName, timestamp, secret);
  const validSignature = providedSignature.length === expectedSignature.length
    && crypto.timingSafeEqual(Buffer.from(providedSignature), Buffer.from(expectedSignature));
  const age = Math.floor(Date.now() / 1000) - Number(timestamp);
  return validSignature && age >= 0 && age < DAY_SECONDS;
}

export function setSubmissionCookie(res, cookieName) {
  const { secret } = emailConfig();
  const timestamp = String(Math.floor(Date.now() / 1000));
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${cookieName}=${timestamp}.${signature(cookieName, timestamp, secret)}; Max-Age=${DAY_SECONDS}; Path=/; HttpOnly${secure}; SameSite=Strict`);
}

export function onlyPost(req, res) {
  if (req.method === 'POST') return false;
  res.setHeader('Allow', 'POST');
  res.status(405).json({ error: 'Method not allowed' });
  return true;
}
