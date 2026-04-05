# Career Portfolio

An interactive portfolio site built with Next.js. It includes:

- A polished public homepage for education, experience, projects, awards, and video case studies
- A private `/admin` content studio for editing portfolio content
- Local JSON-backed content storage
- Media upload support for hero images and case study thumbnails

## Run locally

1. Install Node.js 20 or newer.
2. Copy `.env.example` to `.env.local`.
3. Set `ADMIN_TOKEN` in `.env.local`.
4. Install dependencies with `npm install`.
5. Start the app with `npm run dev`.

The public site will be available at `http://localhost:3000` and the admin at `http://localhost:3000/admin`.

## How content works

- Main content lives in `content/site-data.json`
- The homepage reads from that file
- The admin saves updates back into that file through `/api/content`
- Uploaded assets are stored in `public/uploads`

## Content model

You can update:

- Profile headline, bio, links, hero image, and quick stats
- Work experience timeline
- Education history
- Projects
- Awards and recognition
- Video case studies with write-up + YouTube link

## YouTube case studies

Each case study supports:

- Card summary on the homepage
- A detailed write-up modal
- A direct `Watch on YouTube` CTA
- An optional thumbnail image

## Inquiry form

The public contact section now uses a simple inquiry form instead of a `mailto` link.

It collects:

- name
- email address
- mobile number
- inquiry description

Submissions are:

- saved locally in `content/inquiries.json`
- optionally forwarded to a Google Form through `/api/inquiry`

### Google Form setup

To forward submissions into your Google Form:

1. Create a Google Form with these fields:
   - Name
   - Email address
   - Mobile number
   - What are you looking for?
2. Open the live form, inspect the form HTML, and copy:
   - the form `action` URL
   - each field's `entry.xxxxxxx` name
3. Add them to `.env.local`:

```env
INQUIRY_GOOGLE_FORM_ACTION_URL=https://docs.google.com/forms/d/e/.../formResponse
INQUIRY_GOOGLE_FORM_NAME_FIELD=entry.123456789
INQUIRY_GOOGLE_FORM_EMAIL_FIELD=entry.234567891
INQUIRY_GOOGLE_FORM_PHONE_FIELD=entry.345678912
INQUIRY_GOOGLE_FORM_MESSAGE_FIELD=entry.456789123
```

4. Restart the app.

Once that is connected, new site inquiries will be pushed into the Google Form response sheet.

### Email notifications

To receive a Gmail alert for each new inquiry, turn on response notifications in Google Forms / its linked Sheet workflow. The site-side integration is ready for that flow, but the actual notification behavior is configured in your Google account.

## LinkedIn workflow

This starter includes a place to store your LinkedIn URL, but it does not auto-sync LinkedIn profile data by default.

That is intentional because LinkedIn data access usually requires one of:

- Manual copy updates
- An approved LinkedIn API integration
- A custom ingestion workflow with your credentials and explicit consent

For now, the recommended workflow is:

1. Add your current LinkedIn URL.
2. Copy in updated experience and education details through `/admin`.
3. Share new case studies and YouTube links as you publish them.
4. We can keep updating the portfolio over time from the same content model.

## Notes

- The admin is protected by a simple shared token, which is fine for a private editor and quick iteration.
- If you want a stronger backend later, this structure is a clean starting point for moving to Postgres, Supabase, Sanity, or another CMS.

## Production deployment

For the current live workflow, use:

- GitHub for source control
- Vercel for hosting

Then keep updating the site by pushing changes from this repo.

Important:

- the current `/admin` and upload APIs write to local files
- that is fine locally
- that is not a durable long-term live editing system on Vercel

Use the detailed launch instructions in:

- `DEPLOYMENT.md`
