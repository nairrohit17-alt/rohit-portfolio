# Session Checklist

Use this file to restart work on the portfolio project quickly in a new chat or session.

## First step

Tell Codex:

`Continue the portfolio project in /Users/rohitnair/Documents/Playground. Read PROJECT_NOTES.md and SESSION_CHECKLIST.md first.`

## Files to read first

1. `/Users/rohitnair/Documents/Playground/PROJECT_NOTES.md`
2. `/Users/rohitnair/Documents/Playground/SESSION_CHECKLIST.md`
3. `/Users/rohitnair/Documents/Playground/content/site-data.json`
4. `/Users/rohitnair/Documents/Playground/components/portfolio-page.tsx`
5. `/Users/rohitnair/Documents/Playground/app/globals.css`
6. `/Users/rohitnair/Documents/Playground/DEPLOYMENT.md`

## How to run the site

From:

- `/Users/rohitnair/Documents/Playground`

Run:

```bash
npm run build
npm run start
```

Preview URLs:

- `http://localhost:3000`
- `http://localhost:3000/admin`

## If the preview is stale or broken

Run:

```bash
pkill -f "next dev|next start"
rm -rf .next
npm run build
npm run start
```

Then refresh the browser / preview pane.

## Deployment note

- if Vercel blocks deployment for vulnerable Next.js, upgrade immediately instead of retrying old builds
- current project version is `Next.js 16.2.2`

## How to add a new case study

For each new case:

1. Get the link from Rohit.
2. Determine whether it is:
   - YouTube/video-led
   - article-led
3. Extract:
   - title
   - client / brand
   - year
   - summary
   - challenge
   - approach
   - outcome
4. Fetch a representative image from the web:
   - YouTube thumbnail
   - `og:image`
   - `twitter:image`
   - other clean lead visual if needed
5. Research award recognition from the internet:
   - official award result pages
   - official agency / network releases
   - official case or festival pages
   - shortlist mentions if wins are not yet verified
   - Kyoorius Creative Awards
   - Good Ads Matter Awards
   - Spikes Asia
   - Cannes Lions
   - ABBY Creative Awards
   - note: use the official Kyoorius winners / archive pages and do not spell it as "Curious"
   - if older Kyoorius archive pages are hard to surface, use strong secondary sources from the agency itself or Kyoorius coverage pages and label them conservatively
   - if a brand or agency has an official case page with verified results, use that as a primary source for awards and campaign outcomes
6. Add or update the case and recognition entries in:
   - `/Users/rohitnair/Documents/Playground/content/site-data.json`
   - include `releaseDate` and keep the work ordered newest first
7. If only shortlist status is verified, label it clearly as shortlist recognition.
8. Rebuild and restart if it doesn’t appear.
9. In the recognition rail, keep the sort date-led:
   - use one card per case study
   - order the case cards by latest recognition year, newest first
   - inside each card, list each award entry newest first
   - show the award year on each nested award row so the order is obvious to the user

Summary rule:

- Make the summary a crisp gist of the case study itself.
- Do not mention the writing format in the public card copy.
- If no reliable awards source is found for a case, add the case without recognition rather than overclaiming.

## Current homepage structure goal

1. About / positioning
2. Case studies
3. Experience and education timeline
4. Workshops / services
5. Awards / recognition
6. Contact

## Current copy / tone goal

- first-person
- public-facing
- simple
- direct
- confident
- Neil French-inspired, but still clear and usable

Avoid:

- internal/meta phrasing
- repeated explanatory copy
- overlong section intros
- resume-like language when sharper brand language is possible
- copy that says the same thing twice
- long descriptive blocks where one line would do

## What to keep in mind

- Keep the site clean and easy to follow.
- Avoid making it feel cluttered or overdesigned.
- Keep the page minimal.
- One strong headline is often enough.
- Reduce duplicated meaning across sections.
- Use the approved Selected Work headline:
  - `The work behind the thinking.`
- For the `About` section, keep only:
  - one headline
  - one short supporting line
  - no extra cards, lists, or supporting blocks
- If hero and About overlap, merge them into one section instead of repeating the same idea twice
- If a hero supporting line repeats the headline or summary, remove it instead of keeping a third layer of the same message
- Avoid isolated right-column descriptive lines unless they materially improve the layout
- Recognition and Contact should be separate sections, not a side-by-side split
- Contact should sit at the very end of the page
- Do not expose the admin/content studio link in the public-facing contact section
- Use Rohit's photo in the hero in a clean, premium way when available
- In the hero flow, show Rohit's portrait before the intro copy
- Keep the portrait treatment minimal and avoid extra caption copy under the image unless requested
- keep the theme toggle icon-based in the header rather than a text label pill
- If adding background motion, keep it ambient and subtle; prefer soft parallax glow over obvious animation
- Recognition should stay compact:
  - case-wise summary cards
  - newest awards first
  - avoid exhaustive one-award-per-card stacks
- Experience and Education should stay compact too:
  - horizontal rails
  - minimal company / role / year cards
  - avoid long expandable stacks unless explicitly requested
- Workshops should also use a horizontal rail, not a tall vertical block
- Recognition cards should show crisp award specifics:
  - Gold / Silver / Bronze
  - Black Elephant / Blue Elephant / Baby Blue Elephant
  - First List / Merit where relevant
- Every horizontal rail should include a visible swipe cue such as `Swipe to explore`
- Standardize interaction microcopy proactively:
  - use `Swipe to explore`
  - avoid mixed variants like `Swipe through the roles` or `Swipe through the qualifications`
  - fix obvious UX inconsistencies without waiting for user feedback
- After each meaningful change, update:
  - `/Users/rohitnair/Documents/Playground/PROJECT_NOTES.md`
  - `/Users/rohitnair/Documents/Playground/SESSION_CHECKLIST.md`
- Preserve corrected experience titles exactly as provided by Rohit
- Keep case-study cards compact in the rail and avoid oversized, heavy tiles
- In the case-study modal, prefer a framed image with controlled aspect ratio over a full-bleed cropped visual
- When a shared link is only one asset from a larger campaign, frame the case around the stronger campaign idea rather than over-focusing on the single asset
- For jewellery / lifestyle campaigns too, prioritize the larger brand platform or campaign thought if the linked video is only one expression of it
- For automotive work too, prefer the wider campaign/positioning story over a narrow feature-film description when the linked asset is part of a broader launch
- For infrastructure / durable categories too, prefer the larger brand-positioning idea if the shared video is one expression of a broader platform
- For automotive SUV launches too, frame the case around the tension or duality the campaign resolved, not just the hero film description
- For automotive stunts or halo launches too, frame the case around the larger cultural or precision idea, not just the recorded event
- For historically rooted brand launches too, foreground the product truth and larger cultural platform if that is what makes the work distinctive
- For YouTube-led case thumbnails, verify the image URL before saving it; if `maxresdefault` is unavailable, fall back to `sddefault` or `hqdefault`
- Keep contact conversion simple:
  - prefer a direct inquiry form over a mailto link
  - collect name, email, phone, and a short inquiry description
  - submit to the configured Google Form first when env config is available
  - keep local JSON storage only as a silent backup
  - show explicit success / error feedback after submit
  - keep backend workflow details hidden from the end user
  - note: the current Google Form uses `emailAddress` as the email field, not an `entry.xxxxx` key
- The site is meant to generate inquiries for:
  - workshops
  - guest lectures
  - classes
  - AI masterclasses
  - corporate training
- For production deployment, the current default should be:
  - GitHub + Vercel
  - push-to-deploy workflow
  - do not rely on production `/admin` for durable writes until the backend is moved off local filesystem

## Current design direction

- mobile-first
- dark mode supported
- landing page should feel simple and direct
- case studies currently use a horizontal scroll rail
- experience/education currently sit after case studies
- experience/education use compact horizontal rails

## If the user says something “didn’t change”

Before assuming the code is wrong:

1. Check the running server on port `3000`
2. Verify whether it is stale
3. Rebuild and restart production preview
4. Then refresh the page

This project has repeatedly had stale preview/server issues.

## If something looks unchanged

Do not assume the code change failed.

Check whether:

- the server is stale
- port `3000` is occupied by an older process
- the browser / preview pane needs a hard refresh

## Current admin token

- `rohit-portfolio-admin-2026`

## Recommended resume prompt for next chat

`Continue the portfolio project in /Users/rohitnair/Documents/Playground. Read PROJECT_NOTES.md and SESSION_CHECKLIST.md first. Then verify the latest production preview on port 3000 before making changes.`
