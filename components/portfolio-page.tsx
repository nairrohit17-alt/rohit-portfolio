"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import type { CaseStudyItem, SiteData } from "@/lib/site-data";

type Props = {
  data: SiteData;
};

type ThemeMode = "light" | "dark";

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    const directId = parsed.searchParams.get("v");
    if (directId) {
      return directId;
    }

    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts.at(-1) ?? "";
  } catch {
    return "";
  }
}

function getCaseStudyImage(caseStudy: CaseStudyItem) {
  if (caseStudy.thumbnailUrl) {
    return caseStudy.thumbnailUrl;
  }

  const videoId = extractYouTubeId(caseStudy.youtubeUrl);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : "";
}

function getPrimaryWorkLink(caseStudy?: CaseStudyItem | null) {
  if (caseStudy?.youtubeUrl) {
    return { href: caseStudy.youtubeUrl, label: "Watch on YouTube" };
  }

  if (caseStudy?.articleUrl) {
    return { href: caseStudy.articleUrl, label: "Read article" };
  }

  return null;
}

function ThemeToggle({ mode, onToggle }: { mode: ThemeMode; onToggle: () => void }) {
  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label="Toggle theme">
      <span>{mode === "dark" ? "Dark" : "Light"}</span>
    </button>
  );
}

function RailHint({ text = "Swipe to explore" }: { text?: string }) {
  return <p className="rail-hint">{text}</p>;
}

function SectionHeading({
  label,
  title,
  body
}: {
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{label}</p>
      <div className="section-heading-grid">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

function InquiryForm({ linkedinUrl }: { linkedinUrl: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        error?: string;
        deliveredToGoogleForm?: boolean;
        message?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || "Something went wrong while sending your inquiry.");
      }

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setStatus("success");
      setStatusMessage("Thanks for submitting your inquiry.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong while sending your inquiry.");
    }
  }

  return (
    <form className="inquiry-form" onSubmit={onSubmit}>
      <div className="inquiry-grid">
        <label className="field">
          <span className="field-label">Name</span>
          <input
            className="input"
            type="text"
            name="name"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <label className="field">
          <span className="field-label">Email address</span>
          <input
            className="input"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
      </div>
      <label className="field">
        <span className="field-label">Mobile number</span>
        <input
          className="input"
          type="tel"
          name="phone"
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
      </label>
      <label className="field">
        <span className="field-label">What are you looking for?</span>
        <textarea
          className="textarea"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </label>
      <div className="inquiry-actions">
        <button className="button button-primary" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Submit inquiry"}
        </button>
        <a className="button button-secondary" href={linkedinUrl} target="_blank" rel="noreferrer">
          Connect on LinkedIn
        </a>
      </div>
      {statusMessage ? (
        <p className={`form-status ${status === "error" ? "form-status-error" : "form-status-success"}`}>
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}

function CaseStudyModal({
  caseStudy,
  onClose
}: {
  caseStudy: CaseStudyItem;
  onClose: () => void;
}) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal-shell" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p className="eyebrow">
              {caseStudy.client} / {caseStudy.year}
            </p>
            <h3>{caseStudy.title}</h3>
          </div>
          <button className="text-button" type="button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-copy">
            <div>
              <h4>The problem</h4>
              <p>{caseStudy.challenge}</p>
            </div>
            <div>
              <h4>The thinking</h4>
              <p>{caseStudy.approach}</p>
            </div>
            <div>
              <h4>What happened</h4>
              <p>{caseStudy.outcome}</p>
            </div>
          </div>
          <div className="modal-media-stack">
            <div className="modal-media">
              {getCaseStudyImage(caseStudy) ? (
                <Image
                  src={getCaseStudyImage(caseStudy)}
                  alt={caseStudy.title}
                  fill
                  sizes="(max-width: 860px) 100vw, 38vw"
                  style={{ objectFit: "contain" }}
                />
              ) : (
                <div className="modal-media-fallback">
                  <p>{caseStudy.summary}</p>
                </div>
              )}
            </div>
            <div className="modal-media-meta">
              <p className="eyebrow">Snapshot</p>
              <p>{caseStudy.summary}</p>
              <div className="case-study-tag-row">
                {caseStudy.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="button-row">
          {getPrimaryWorkLink(caseStudy) ? (
            <a className="button button-primary" href={getPrimaryWorkLink(caseStudy)?.href} target="_blank" rel="noreferrer">
              {getPrimaryWorkLink(caseStudy)?.label}
            </a>
          ) : null}
          <button className="button button-secondary" type="button" onClick={onClose}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPage({ data }: Props) {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyItem | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const orderedCaseStudies = [...data.caseStudies].sort((left, right) => {
    const leftDate = left.releaseDate ?? `${left.year}-01-01`;
    const rightDate = right.releaseDate ?? `${right.year}-01-01`;
    return rightDate.localeCompare(leftDate);
  });
  const caseStudyById = new Map(orderedCaseStudies.map((caseStudy) => [caseStudy.id, caseStudy]));

  const recognitionGroups = orderedCaseStudies
    .map((caseStudy) => {
      const awards = data.awards
        .filter((award) => award.caseStudyId === caseStudy.id)
        .map((award) => ({
          ...award,
          platform: award.issuer.replace(/\s+\d{4}$/, "").trim(),
          sortYear: Number.parseInt(award.year, 10) || 0
        }))
        .sort((left, right) => {
          if (right.sortYear !== left.sortYear) {
            return right.sortYear - left.sortYear;
          }

          return left.platform.localeCompare(right.platform);
        });

      if (!awards.length) {
        return null;
      }

      const latestAwardYear = awards[0]?.sortYear ?? 0;
      const earliestAwardYear = awards.at(-1)?.sortYear ?? latestAwardYear;
      const totalRecognitions = awards.reduce((sum, award) => sum + award.recognitionCount, 0);
      const platforms = [...new Set(awards.map((award) => award.platform))];
      const highlight =
        platforms.length === 1
          ? `Recognised by ${platforms[0]}.`
          : `Recognised across ${platforms.slice(0, -1).join(", ")} and ${platforms.at(-1)}.`;

      return {
        id: caseStudy.id,
        title: caseStudy.title,
        client: caseStudy.client,
        latestAwardYear,
        earliestAwardYear,
        totalRecognitions,
        awards,
        highlight
      };
    })
    .filter((group): group is NonNullable<typeof group> => Boolean(group))
    .sort((left, right) => {
      if (right.latestAwardYear !== left.latestAwardYear) {
        return right.latestAwardYear - left.latestAwardYear;
      }

      return left.title.localeCompare(right.title);
    });
  useEffect(() => {
    const savedMode = window.localStorage.getItem("portfolio-theme");
    if (savedMode === "light" || savedMode === "dark") {
      setThemeMode(savedMode);
      return;
    }

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setThemeMode(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", themeMode);
  }, [themeMode]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`portfolio-app theme-${themeMode}`}>
      <div className="ambient-glow-layer" aria-hidden="true">
        <span className="ambient-glow ambient-glow-one" />
        <span className="ambient-glow ambient-glow-two" />
        <span className="ambient-glow ambient-glow-three" />
      </div>
      <main className="site-shell">
        <section className="hero" id="top">
          <header className="topbar">
            <a className="brandmark" href="#top">
              RN
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
            <nav className={`topnav ${menuOpen ? "topnav-open" : ""}`}>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#case-studies" onClick={() => setMenuOpen(false)}>
                Work
              </a>
              <a href="#experience" onClick={() => setMenuOpen(false)}>
                Experience
              </a>
              <a href="#services" onClick={() => setMenuOpen(false)}>
                Workshops
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </nav>
            <ThemeToggle mode={themeMode} onToggle={() => setThemeMode((current) => (current === "dark" ? "light" : "dark"))} />
          </header>

          <div className="hero-layout">
            {data.profile.heroImage ? (
              <aside className="hero-portrait-panel" aria-label="Portrait of Rohit Nair">
                <div className="hero-portrait-frame">
                  <Image
                    src={data.profile.heroImage}
                    alt={data.profile.name}
                    fill
                    sizes="(max-width: 720px) 58vw, 320px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </aside>
            ) : null}
            <div className="hero-copy" id="about">
              <p className="eyebrow">Brand and growth marketing leader / {data.profile.location}</p>
              <h1>I build brands people notice, trust, and remember.</h1>
              <p className="hero-summary">{data.profile.headline}</p>
              <div className="button-row">
                <a className="button button-primary" href="#contact">
                  Bring me in for a workshop
                </a>
                <a className="button button-secondary" href="#case-studies">
                  View my work
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section" id="case-studies">
          <SectionHeading
            label="Selected Work"
            title="The work behind the thinking."
            body=""
          />
          <RailHint />
          <div className="case-study-rail">
            {orderedCaseStudies.map((caseStudy) => {
              const primaryLink = getPrimaryWorkLink(caseStudy);

              return (
                <article key={caseStudy.id} className="case-study-tile">
                  <div className="case-study-tile-image">
                    {getCaseStudyImage(caseStudy) ? (
                      <Image
                        src={getCaseStudyImage(caseStudy)}
                        alt={caseStudy.title}
                        fill
                        sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : null}
                  </div>
                  <div className="case-study-tile-copy">
                    <p className="eyebrow">
                      {caseStudy.client} / {caseStudy.year}
                    </p>
                    <h3>{caseStudy.title}</h3>
                    <p>{caseStudy.summary}</p>
                    <div className="case-study-tag-row">
                      {caseStudy.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <div className="button-row case-study-tile-actions">
                      <button className="button button-secondary" type="button" onClick={() => setSelectedCaseStudy(caseStudy)}>
                        Open case study
                      </button>
                      {primaryLink ? (
                        <a className="button button-primary" href={primaryLink.href} target="_blank" rel="noreferrer">
                          {primaryLink.label}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="content-section" id="experience">
          <SectionHeading label="Experience" title="A quick career timeline." />
          <div className="timeline-lane">
            <div className="timeline-lane-head">
              <p className="column-label">Work</p>
              <RailHint />
            </div>
            <div className="timeline-rail">
              {data.experience.map((item) => (
                <article key={item.id} className="timeline-tile">
                  <p className="eyebrow">{item.period}</p>
                  <h3>{item.role}</h3>
                  <p className="timeline-meta">{item.company}</p>
                  <p className="timeline-copy">{item.location}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="timeline-lane">
            <div className="timeline-lane-head">
              <p className="column-label">Education</p>
              <RailHint />
            </div>
            <div className="timeline-rail">
              {data.education.map((item) => (
                <article key={item.id} className="timeline-tile timeline-tile-education">
                  <p className="eyebrow">{item.period}</p>
                  <h3>{item.degree}</h3>
                  <p className="timeline-meta">{item.institution}</p>
                  <p className="timeline-copy">{item.location}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="services">
          <SectionHeading
            label="Workshops"
            title="If you want sharper thinking in the room, I can help."
            body=""
          />
          <RailHint />
          <div className="services-rail">
            {data.site.services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.summary}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section">
          <SectionHeading label="Recognition" title="Recognition" />
          <RailHint />
          <div className="recognition-rail">
            {recognitionGroups.map((group) => (
              <article key={group.id} className="recognition-card">
                <div className="project-card-top">
                  <p className="eyebrow">
                    {group.latestAwardYear === group.earliestAwardYear
                      ? String(group.latestAwardYear)
                      : `${group.latestAwardYear} - ${group.earliestAwardYear}`}
                  </p>
                  <span>{group.totalRecognitions}</span>
                </div>
                <h3>{group.title}</h3>
                <p>{group.highlight}</p>
                <div className="recognition-award-list">
                  {group.awards.map((award) => (
                    <div key={award.id} className="recognition-award-item">
                      <div className="recognition-award-top">
                        <span className="eyebrow">{award.year}</span>
                        <span>{award.platform}</span>
                      </div>
                      <div className="recognition-breakdown">
                        {award.breakdown.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="case-study-tag-row">
                  <span>{group.client}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section content-section-contact" id="contact">
          <div className="contact-card">
            <p className="eyebrow">Contact</p>
            <h2>{data.site.contactHeading}</h2>
            <p>{data.site.contactBody}</p>
            <InquiryForm linkedinUrl={data.profile.linkedinUrl} />
          </div>
        </section>
      </main>

      <button
        className={`back-to-top ${showBackToTop ? "back-to-top-visible" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>

      {selectedCaseStudy ? <CaseStudyModal caseStudy={selectedCaseStudy} onClose={() => setSelectedCaseStudy(null)} /> : null}
    </div>
  );
}
