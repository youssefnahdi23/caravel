# Caravel

Official React website for Caravel, a community for Tunisia's tech-passionate builders.

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository into Vercel and deploy with the Vite preset. Vercel automatically runs `npm run build` and serves `dist`.

### Form email configuration

Both the community form and project-request form send server-side email through Nodemailer and Gmail SMTP. The visitor does not need to open an email app.

1. Enable 2-Step Verification on the Google account that will send the messages.
2. Create a Google **App Password** for Mail. Do not use the account's normal password.
3. In the Vercel project, open **Settings → Environment Variables** and add:
   - `GMAIL_USER`: the Gmail address used to send notifications
   - `GMAIL_APP_PASSWORD`: the 16-character Google App Password
   - `FORM_RECIPIENT_EMAIL`: the inbox that should receive submissions (optional; defaults to `GMAIL_USER`)
   - `FORM_SECRET`: a long random string used to sign rate-limit cookies (recommended)
4. Redeploy after adding the variables.

Copy `.env.example` to `.env.local` for local credentials. `.env.local` is ignored by Git. To exercise Vercel API routes locally, run `npx vercel dev`; plain `npm run dev` runs only the Vite frontend.

Gmail's SMTP service is free within Google's sending limits. The form endpoints validate and escape input, include a bot honeypot, and limit each browser to one submission per form every 24 hours.

Founder assets and the downloadable CV live in `public/assets/`.
