# Portfolio Project Notes

## Project

Personal portfolio website for Rohit Nair.

Repo root:

- `/Users/rohitnair/Documents/Playground`

## Main goal

Build a clean, professional portfolio site that:

- introduces Rohit clearly
- shows career experience and education
- showcases case studies/work
- highlights awards and recognition
- drives inbound interest for workshops, guest lectures, classes, and AI masterclasses

This is not just a portfolio for jobs. It is also a lead-generation site for:

- colleges
- brands
- companies
- teams
- workshop organizers

## Current positioning

The site is currently framed around:

- brand and growth marketing leadership
- teaching and visiting faculty work
- practical AI learning
- workshops, lectures, and corporate capability building

The homepage flow should stay simple and intentional:

1. About / positioning
2. Case studies / selected work
3. Experience and education timeline
4. Workshops / services
5. Awards / recognition
6. Contact / inquiry CTA

## Important product decisions

- Do not split `projects` and `case studies` in a confusing way on the homepage.
- Prefer using case studies as the main work showcase.
- Every case should support one or both of:
  - `Watch on YouTube`
  - `Read article`
- Every case should also support:
  - `Open case study`
- Case studies should be ordered by release date, newest first.
- When the user shares a case study link, always try to fetch and attach a representative image from the web.
- For YouTube links, use YouTube thumbnails or other strong public visuals.
- For article links, use `og:image`, `twitter:image`, or another strong lead image when available.
- Every time the user shares a new case study or project link, research awards and shortlist/win information on the internet and update the recognition section automatically.
- Prefer official or primary sources for awards:
  - official festival / awards result pages
  - official agency or network press releases
  - official case pages
- Also check the wider awards layer the user explicitly cares about:
  - Kyoorius Creative Awards
  - Good Ads Matter Awards
  - Spikes Asia
  - Cannes Lions
  - ABBY Creative Awards
- If only shortlist status is verified, label it clearly as shortlist recognition instead of implying a win.
- Case-study card summaries should always describe the gist of the work itself.
- Do not describe the writing format in public-facing case summaries with phrases like `Effie-style case study`.

## Design direction

Current direction:

- clean
- direct
- mobile-first
- minimal copy
- less explanation, more confidence
- case studies should feel like a horizontal gallery / work rail
- experience and education should also stay compact and horizontally browsable
- do not use expandable long-form work history unless explicitly needed
- workshops should also use a horizontal rail instead of a stacked grid
- recognition and contact should never sit side by side
- contact should be the final standalone section on the page
- do not expose admin/content-studio links on the public homepage
- contact inquiries should submit to the live Google Form first when configured; local JSON storage is only a silent backup and should never be exposed in user-facing messaging
- production hosting direction is GitHub + Vercel with Git-based redeploys
- for now, do not treat production `/admin` as durable content editing because the current implementation writes to local files
- the correct live-update workflow today is: edit repo here -> push to GitHub -> Vercel redeploys
- use Rohit's portrait in the hero as a clean, intentional visual element rather than a tiny avatar or a random photo drop
- portrait should appear before the intro copy in the hero flow so the page introduces Rohit visually first and then with words
- keep the portrait treatment minimal; do not add extra caption copy under the image unless explicitly requested
- if background motion is added, keep it ambient and subtle; current direction is soft parallax glow, not loud animated decoration
- the first glow pass was too subtle in practice; current implementation is slightly stronger so the motion is actually perceptible while still staying behind the content
- after that first pass still felt invisible in the live preview, the background effect was changed to a dedicated ambient glow layer with three softly animated orbs so the motion reads more clearly
- the orb animation was then made more readable with shorter cycles, larger drift distances, and a light opacity pulse because the previous version still felt static in practice
- recognition should be case-led, not an exhaustive wall of award cards
- prefer:
  - one recognition card per case study, with all awards nested inside that single card
  - order case cards by latest recognition year, newest first
  - within each case card, list the award entries newest first
  - show the award year directly on each nested award row so the chronology is clear
  - horizontal scanning over long vertical scrolling
  - actual award detail chips such as Gold / Silver / Bronze / Blue Elephant / Black Elephant / Baby Blue Elephant
- every horizontally scrollable section should include a visible swipe cue so users understand the interaction immediately
- use one consistent rail hint across the site:
  - `Swipe to explore`
- do not vary interaction microcopy section by section unless there is a strong reason
- proactively normalize obvious UX inconsistencies without waiting for user correction

Important voice direction:

- public-facing only
- no internal/meta lines like "the site is built around..." or "this is the commercial intent..."
- first-person voice
- sharper, more confident, Neil French-inspired tone
- user described preferred identity as:
  - brand and growth marketing leader
- user prefers minimal copy:
  - one strong headline
  - one short supporting line
  - avoid repeated explanation
  - if in doubt, cut copy rather than add it
- approved Selected Work headline:
  - `The work behind the thinking.`
- for the About section specifically:
  - one headline
  - one short description
  - nothing else
- if two sections are saying similar things, merge them instead of stacking them
- avoid desktop layouts where a short line sits awkwardly by itself on the right
- prefer one clean left-to-right reading flow

Still evolving:

- reduce repetition further
- make landing page feel simpler and more premium
- keep the homepage from over-explaining
- focus on strong headlines and compact supporting copy

## Content already added

### Profile

- LinkedIn URL: `https://www.linkedin.com/in/rohit-nair-a6653440/?skipRedirect=true`
- Email: `nairrohit17@gmail.com`

### Education

- Welingkar Institute of Management
- K C College

### Experience

- Haymarket Media Group
- Bennett Coleman & Co. Ltd. (The Times of India)
- JetSynthesys
- Dentsu Webchutney
- 22feet Tribal Worldwide
- Leo Burnett
- Pentagon Events & Activations

### Case studies currently in content

0. `DoomTroopers`
   - type: video-led
   - client: KRAFTON India / BGMI
   - has image
   - YouTube link attached
   - supporting article reference attached

1. `The 8-Bit Journo`
   - type: YouTube/video-led
   - has image

2. `The Common Man Takes on Conmen`
   - type: article-led
   - source: afaqs!
   - has image

3. `Anti Scam Shala`
   - type: article-led
   - source: Impact
   - has image

## Kyoorius verification snapshot

- `DoomTroopers`
  - verified on the official Kyoorius Creative Awards winners site
  - two Baby Blue Elephants confirmed
- `Anti Scam Shala`
  - verified on the official Kyoorius Creative Awards winners site
  - First List recognitions confirmed
- `#ConmanVSCommonMan`
  - verified on the official Kyoorius Creative Awards winners site
  - Blue Elephant and First List recognition confirmed
- `The 8-Bit Journo`
  - older official archive pages were not easy to surface directly from the current public winners UI
  - Dentsu Webchutney's own Medium recap and Melt's Kyoorius winners coverage both credit it with five Elephants, including a Black Elephant and a Gold Elephant

## Services currently reflected in site content

- Workshops for colleges
- AI masterclasses
- Corporate training
- Guest lectures and classes

## Files that matter most

- Main homepage: `/Users/rohitnair/Documents/Playground/components/portfolio-page.tsx`
- Main styles: `/Users/rohitnair/Documents/Playground/app/globals.css`
- Content data: `/Users/rohitnair/Documents/Playground/content/site-data.json`
- Types/helpers: `/Users/rohitnair/Documents/Playground/lib/site-data.ts`
- Admin page: `/Users/rohitnair/Documents/Playground/app/admin/page.tsx`
- Admin UI: `/Users/rohitnair/Documents/Playground/components/admin-studio.tsx`

## Runtime / preview notes

- Preview URL: `http://localhost:3000`
- planned production workflow is documented in:
  - `/Users/rohitnair/Documents/Playground/DEPLOYMENT.md`
- production deploy was blocked once by a Vercel security gate on old `Next.js 15.2.4`
- project has now been upgraded to `Next.js 16.2.2`
- Vercel redeploying an older failed snapshot can keep using the old commit hash; if that happens, push a fresh commit to `main` instead of redeploying the stale snapshot again

## Inquiry form integration

- Public inquiry form is now connected to Google Forms using:
  - action URL: `https://docs.google.com/forms/d/e/1FAIpQLSeftHpuZHfIVp3XgGLCf_1QWLNxeA_QOly4Y_HpIxR0eldnLg/formResponse`
  - name field: `entry.1839045283`
  - email field: `emailAddress`
  - phone field: `entry.729128081`
  - description field: `entry.303266401`
- Google treats the email field as a built-in collected-email field, not a normal `entry.xxxxx`.
- The public site should only show:
  - `Thanks for submitting your inquiry.`
- Do not expose whether delivery happened through Google Forms or local storage.
- Local inquiry JSON remains only as a silent backup in:
  - `/Users/rohitnair/Documents/Playground/content/inquiries.json`
- Admin URL: `http://localhost:3000/admin`

Admin token currently in local env:

- `rohit-portfolio-admin-2026`

Important:

- There were repeated stale-server issues where new content did not appear until the running Next.js server was restarted.
- If changes do not appear, check what is listening on port `3000`, stop it, and restart the current build.
- Production preview via `npm run start` has been more stable than `npm run dev`.
- The user frequently sees stale output in the preview pane even after code changes.
- Always assume the running server may be old and verify by checking live HTML if something "didn't change".

## Recommended restart flow if preview looks stale

From repo root:

```bash
pkill -f "next dev|next start"
rm -rf .next
npm run build
npm run start
```

Then refresh `http://localhost:3000`.

## Open tasks / next priorities

- Add real awards and accolades from Rohit's history
- Continue researching verified awards for each existing and new case study
- Keep adding more case studies from links Rohit shares
- Improve homepage polish and reduce any remaining clunkiness
- Continue simplifying the homepage copy and layout
- Make case studies feel even more elegant as a horizontally scrollable work rail
- Improve workshop/contact conversion copy further
- Ensure dark mode stays legible across every section/card
- Consider Next.js upgrade from `15.2.4`

## Latest accepted changes

- Hero and homepage copy were rewritten to be more first-person and public-facing.
- Repetitive explanatory copy was reduced.
- Dark mode contrast was fixed multiple times, especially for the intro cards and body copy.
- Case studies were converted from clunky stacked blocks into a horizontal scroll rail.
- Experience and education were moved after case studies and simplified into compact horizontal rails.
- Modal case studies were made scrollable.
- About section was tightened further to one headline plus one short supporting line.
- About section cards were removed entirely; the section should remain just a headline and a single short description.
- Hero and About were merged into one single About section to avoid repetition and odd desktop composition.
- Remove redundant hero/supporting lines when they repeat what the headline or profile headline already says.
- Future sessions should update `PROJECT_NOTES.md` and `SESSION_CHECKLIST.md` after meaningful changes by default.
- Recognition was expanded beyond Cannes / Spikes / ABBYs to include Kyoorius and Good Ads Matter where verified.
- `The 8-Bit Journo` Kyoorius recognition was added from Dentsu Webchutney's Medium recap plus Melt coverage after the user shared a direct source.
- Recognition UI was redesigned into a compact horizontal rail of case-wise cards, so users can scan award signals quickly and still reach Contact without scroll fatigue.
- Experience and Education were simplified into horizontal swipeable timeline rails so visitors can scan roles and qualifications without expanding long accordions.
- Recognition cards were upgraded to include crisp award-detail chips such as Golds, Bronzes, and Elephant types.
- Workshops were converted into a horizontal rail and a shared swipe cue pattern was added across work, experience, education, workshops, and recognition.
- The redundant recognition totals block was removed; the section now goes straight into the swipeable award cards.
- Selected Work headline was changed to `The work behind the thinking.` to avoid implying only some of the work is worth showing.
- Public contact section no longer includes the `Open content studio` link.
- Case-study tiles were reduced in size to feel less clunky in the horizontal rail.
- Case-study modal media was redesigned into a framed image plus compact context block so visuals feel cleaner and less randomly cropped.
- Rohit's portrait image was added to the hero as a framed circular profile block with minimal supporting copy.
- Hero portrait was moved above the introductory copy so the page flow starts with Rohit first, then the introduction.
- The extra portrait caption copy under the hero image was removed to keep the top cleaner.
- Times of India designation was corrected to `Chief Manager, Brand Strategy`.
- The 8-Bit Journo summary was rewritten to describe the case itself, not the writing style. Use that as the default rule for future case summaries.
- `BGMI Ki Boli` was added as a case study with release-date ordering, plus Effie, ABBY, and Kyoorius recognition.
- `BGMI Ki Boli` recognition was expanded after a deeper source pass: the official GOAFEST 2024 PDFs show a much bigger ABBY haul, and the official Kyoorius 2024 winners pages show a larger mix of Baby Blue Elephants and First List recognitions than the first conservative entry captured.
- `The World's Most Reported Trailer` for `Thappad` was added as a 2020 case study with release-date ordering, using Dentsu India's official case page as the primary source for summary and verified Cannes/Spikes recognition.
- `GEPL Aftermovie` was added as a 2024 case study for JetSynthesys / Global e-Cricket Premier League. No verified awards were added yet because the current public source pass did not confirm them strongly enough.
- GEPL case copy should foreground the initiative and larger IP story, not over-index on the aftermovie asset itself.
- `Don't Care To Share` was added as a 2023 BGMI case study from the X-Suit Carnival campaign, using the provided YouTube link plus campaign coverage.
- Frame `Don't Care To Share` as the broader campaign idea rather than just the single film asset `The Invasion`.
- No verified awards have been added for `Don't Care To Share` yet.
- `Greater Together` was added as a 2019 Platinum Days of Love / Platinum Guild International case study.
- Frame it around the broader `#GreaterTogether` relationship platform and interactive campaign idea, not just the film asset.
- No verified awards have been added for `Greater Together` yet.
- `This Is It` was added as a 2019 Jeep India / Jeep Compass case study.
- Frame it as the broader integrated Jeep Compass campaign and positioning idea, not just the product film.
- No verified awards have been added for `This Is It` yet.
- `Naye India Ke Badhte Load Ke Liye` was added as a 2018 Anchor by Panasonic / Panasonic Life Solutions India case study.
- Frame it as the broader brand-positioning platform for Anchor's electrical solutions story, not just the single Hindi MCB film asset.
- Verified recognition added so far:
  - `1 Bronze ABBY` at `ABBY Awards 2022`
- `All Muscle All Heart` was added as a 2017 ISUZU mu-X / Isuzu Motors India case study.
- Frame it as the broader launch-positioning platform for the mu-X, not just the uploaded film asset.
- No verified awards have been added for `All Muscle All Heart` yet.
- `Legendary Precision Salutes India` was added as a 2017 Nissan GT-R / Nissan India case study.
- Frame it as the larger `#OMGTR` / Map of India precision campaign rather than just the stunt film.
- No verified awards have been added for `Legendary Precision Salutes India` yet.
- Nissan case image bug was caused by a missing YouTube `maxresdefault` thumbnail; use a verified fallback such as `sddefault` or `hqdefault` when `maxresdefault` 404s.
- `The Story of a Legend Reborn` was added as a 2016 Bajaj V / Bajaj Auto case study.
- Frame it as the broader Bajaj V / INS Vikrant platform, not just the uploaded film.
- Verified recognition added so far:
  - `1 Bronze Lion` at `Cannes Lions 2016`
- Contact was refactored from a `mailto` CTA into a proper inquiry form.
- The form now collects name, email, mobile number, and inquiry description.
- Submissions are saved locally in `content/inquiries.json` and can also be forwarded to a Google Form through env-configured field IDs.
- Keep the contact experience simple and direct; prefer a clean inquiry form over a prefilled email link.
- Current status:
  - local inquiry saving works
  - Google Form forwarding is coded but not configured yet in `.env.local`
  - users should see clear success/error feedback after submission instead of silent form reset
  - do not expose internal delivery-state wording like local save vs Google forwarding to the end user

## Current pain points the user is still sensitive to

- repeated copy
- anything that sounds like internal planning copy
- cluttered or overly explanatory layouts
- dark mode readability bugs
- stale preview/server issues
- case study presentation feeling clunky

## How future sessions should continue

When resuming this project in a new chat:

1. Read this file first.
2. Inspect:
   - `content/site-data.json`
   - `components/portfolio-page.tsx`
   - `app/globals.css`
3. Start from the latest repo state, not from memory.
4. Assume this is an ongoing collaborative portfolio build, not a fresh project.

## Instruction for future Codex sessions

If the user says “continue the portfolio project”, continue from this repo and this notes file without re-asking for basic context unless necessary.
