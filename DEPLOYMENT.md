# Deployment Guide

This project is ready to go live with a simple workflow:

1. Host the site on Vercel
2. Keep the code in GitHub
3. Make future updates in this repo
4. Push changes to GitHub
5. Let Vercel redeploy automatically

That gives Rohit a live public URL while preserving the ability to keep updating the site from this workspace.

## Recommended production workflow

Use:

- GitHub for source control
- Vercel for hosting and automatic redeploys

Why this is the right fit:

- the app is a standard Next.js project
- Vercel supports zero-config Next.js deployment
- every push to the connected production branch triggers a new deployment automatically

Official references:

- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Import an existing project](https://vercel.com/docs/getting-started-with-vercel/import)
- [Git settings](https://vercel.com/docs/projects/project-configuration/git-settings)
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)

## Important production caveat

The current `/admin`, `/api/content`, and `/api/upload` flows write to local files:

- `content/site-data.json`
- `public/uploads`

That works locally, but it is **not a durable production editing system** on Vercel.

Vercel Functions run with a read-only filesystem and only temporary writable scratch space.

Official reference:

- [Vercel Runtimes](https://vercel.com/docs/functions/runtimes)

So the correct launch workflow right now is:

- do **not** rely on production `/admin` for long-term live editing
- make changes in this repo
- commit and push those changes
- let Vercel redeploy the live site

If Rohit later wants true live CMS-style editing from `/admin`, the content and uploads should be moved to durable storage such as:

- Supabase
- Postgres / Neon
- Sanity
- Vercel Blob for assets plus a database for structured content

## What to deploy now

Deploy the current site now with GitHub + Vercel.

Keep this ongoing workflow:

1. Edit content and code in this repo
2. Test locally
3. Push to GitHub
4. Vercel auto-deploys
5. Share the live URL

## Step 1: Create a GitHub repo

Create a new empty GitHub repository from your GitHub account, for example:

- `rohit-portfolio`

Do not add a README from GitHub if you want the cleanest push from this local repo.

## Step 2: Connect this local repo to GitHub

From this project root:

```bash
cd /Users/rohitnair/Documents/Playground
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

If this repo is already initialized locally, only the `remote add`, `branch`, and `push` steps may still be needed.

## Step 3: Import the GitHub repo into Vercel

1. Go to [Vercel](https://vercel.com/)
2. Click `Add New...` -> `Project`
3. Import the GitHub repo
4. Vercel will auto-detect Next.js
5. Keep the default build settings unless Vercel suggests otherwise
6. Add the required environment variables before or immediately after the first deploy

## Step 4: Add production environment variables in Vercel

Add these project-level variables:

```env
ADMIN_TOKEN=rohit-portfolio-admin-2026
INQUIRY_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/1FAIpQLSeftHpuZHfIVp3XgGLCf_1QWLNxeA_QOly4Y_HpIxR0eldnLg/formResponse
INQUIRY_GOOGLE_FORM_NAME_FIELD=entry.1839045283
INQUIRY_GOOGLE_FORM_EMAIL_FIELD=emailAddress
INQUIRY_GOOGLE_FORM_PHONE_FIELD=entry.729128081
INQUIRY_GOOGLE_FORM_MESSAGE_FIELD=entry.303266401
```

Important:

- after changing environment variables on Vercel, redeploy the project

Official reference:

- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables)

## Step 5: Verify the live deployment

After deploy:

1. Open the live URL
2. Check the homepage
3. Check a few case-study cards and modals
4. Submit a test inquiry
5. Confirm the inquiry reaches the Google Form
6. Confirm Google email notifications are enabled in the form owner account

## Step 6: Optional custom domain

After the Vercel project is working, you can add a custom domain from the Vercel dashboard, for example:

- `rohitnair.in`
- `rohitnair.me`
- `www.rohitnair.in`

## Ongoing update workflow

This is the workflow to keep using after launch:

1. Make changes in `/Users/rohitnair/Documents/Playground`
2. Test locally:

```bash
npm run build
npm run start
```

3. Commit and push:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

4. Vercel automatically rebuilds and publishes the changes

## What this means in practice

Yes, you can keep updating the site from here.

But the durable production-safe way to do it **today** is:

- edit repo here
- push to GitHub
- let Vercel deploy

Not:

- edit content through production `/admin`

## Recommended next phase after launch

After the site is live, the best technical upgrade would be:

- keep Vercel hosting
- move content from `site-data.json` into a database or CMS
- move uploads from local filesystem into durable object storage
- then upgrade `/admin` so edits update the live site directly without requiring a Git push

That is a separate improvement phase and not required to launch now.
