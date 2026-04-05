"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import type { SiteData } from "@/lib/site-data";

type Props = {
  initialData: SiteData;
};

function slugId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function splitLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function joinLines(values: string[]) {
  return values.join("\n");
}

export function AdminStudio({ initialData }: Props) {
  const [token, setToken] = useState("");
  const [data, setData] = useState<SiteData>(initialData);
  const [jsonDraft, setJsonDraft] = useState(
    JSON.stringify(
      {
        education: initialData.education,
        projects: initialData.projects,
        awards: initialData.awards,
        caseStudies: initialData.caseStudies,
        site: initialData.site
      },
      null,
      2
    )
  );
  const [status, setStatus] = useState("Make your edits, then save to update the live portfolio content.");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem("portfolio-admin-token");
    if (saved) {
      setToken(saved);
    }
  }, []);

  function rememberToken(nextToken: string) {
    setToken(nextToken);
    window.sessionStorage.setItem("portfolio-admin-token", nextToken);
  }

  async function saveContent(event: FormEvent) {
    event.preventDefault();
    setStatus("Saving content...");
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-token": token
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      setStatus(error?.error ?? "Could not save content.");
      return;
    }

    setStatus("Saved successfully. Your homepage and admin now point to the updated content.");
  }

  async function uploadAsset(event: ChangeEvent<HTMLInputElement>, field: "heroImage" | "thumbnailUrl", caseStudyId?: string) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setStatus(`Uploading ${file.name}...`);
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: {
        "x-admin-token": token
      },
      body: formData
    });

    setUploading(false);

    if (!response.ok) {
      const error = await response.json().catch(() => null);
      setStatus(error?.error ?? "Upload failed.");
      return;
    }

    const body = (await response.json()) as { url: string };
    setData((current) => {
      if (field === "heroImage") {
        return {
          ...current,
          profile: {
            ...current.profile,
            heroImage: body.url
          }
        };
      }

      return {
        ...current,
        caseStudies: current.caseStudies.map((entry) =>
          entry.id === caseStudyId
            ? {
                ...entry,
                thumbnailUrl: body.url
              }
            : entry
        )
      };
    });
    setStatus(`Uploaded ${file.name}. Save content to persist the new URL in the portfolio data.`);
    event.target.value = "";
  }

  return (
    <main className="section-spacing">
      <div className="page-shell" style={{ display: "grid", gap: 20 }}>
        <div className="glass-card" style={{ borderRadius: 28, padding: 24 }}>
          <div className="section-title">
            <h2>Content studio</h2>
            <p>Edit profile copy, timelines, projects, awards, and YouTube case studies from one place.</p>
          </div>
          <div className="grid-two">
            <div style={{ display: "grid", gap: 12 }}>
              <label>
                <div style={{ marginBottom: 8 }}>Admin token</div>
                <input
                  className="input"
                  type="password"
                  value={token}
                  onChange={(event) => rememberToken(event.target.value)}
                  placeholder="Set ADMIN_TOKEN in .env.local, then paste it here"
                />
              </label>
              <p style={{ margin: 0, color: "var(--muted)", lineHeight: 1.6 }}>
                The admin uses a simple shared token. It is a good fit for a private editing tool while we keep the architecture lightweight.
              </p>
            </div>
            <div className="glass-card" style={{ borderRadius: 20, padding: 18, background: "rgba(255, 250, 242, 0.72)" }}>
              <p style={{ margin: 0, lineHeight: 1.7 }}>{status}</p>
            </div>
          </div>
        </div>

        <form onSubmit={saveContent} style={{ display: "grid", gap: 20 }}>
          <section className="glass-card" style={{ borderRadius: 28, padding: 24, display: "grid", gap: 16 }}>
            <div className="section-title">
              <h2>Profile</h2>
              <p>The homepage hero, links, and top-level stats come from here.</p>
            </div>
            <div className="grid-two">
              <label>
                <div style={{ marginBottom: 8 }}>Name</div>
                <input
                  className="input"
                  value={data.profile.name}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, name: event.target.value } })}
                />
              </label>
              <label>
                <div style={{ marginBottom: 8 }}>Headline</div>
                <input
                  className="input"
                  value={data.profile.headline}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, headline: event.target.value } })}
                />
              </label>
            </div>
            <div className="grid-two">
              <label>
                <div style={{ marginBottom: 8 }}>Location</div>
                <input
                  className="input"
                  value={data.profile.location}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, location: event.target.value } })}
                />
              </label>
              <label>
                <div style={{ marginBottom: 8 }}>Email</div>
                <input
                  className="input"
                  value={data.profile.email}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, email: event.target.value } })}
                />
              </label>
            </div>
            <div className="grid-two">
              <label>
                <div style={{ marginBottom: 8 }}>LinkedIn URL</div>
                <input
                  className="input"
                  value={data.profile.linkedinUrl}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, linkedinUrl: event.target.value } })}
                />
              </label>
              <label>
                <div style={{ marginBottom: 8 }}>Resume URL</div>
                <input
                  className="input"
                  value={data.profile.resumeUrl}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, resumeUrl: event.target.value } })}
                />
              </label>
            </div>
            <label>
              <div style={{ marginBottom: 8 }}>Bio</div>
              <textarea
                className="textarea"
                value={data.profile.bio}
                onChange={(event) => setData({ ...data, profile: { ...data.profile, bio: event.target.value } })}
              />
            </label>
            <div className="grid-two">
              {data.profile.stats.map((stat, index) => (
                <div key={stat.label + index} style={{ display: "grid", gap: 12 }}>
                  <input
                    className="input"
                    placeholder="Stat label"
                    value={stat.label}
                    onChange={(event) =>
                      setData({
                        ...data,
                        profile: {
                          ...data.profile,
                          stats: data.profile.stats.map((entry, statIndex) =>
                            statIndex === index ? { ...entry, label: event.target.value } : entry
                          )
                        }
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Stat value"
                    value={stat.value}
                    onChange={(event) =>
                      setData({
                        ...data,
                        profile: {
                          ...data.profile,
                          stats: data.profile.stats.map((entry, statIndex) =>
                            statIndex === index ? { ...entry, value: event.target.value } : entry
                          )
                        }
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <div className="grid-two">
              <label>
                <div style={{ marginBottom: 8 }}>Hero image URL</div>
                <input
                  className="input"
                  value={data.profile.heroImage}
                  onChange={(event) => setData({ ...data, profile: { ...data.profile, heroImage: event.target.value } })}
                />
              </label>
              <label>
                <div style={{ marginBottom: 8 }}>Upload hero image</div>
                <input type="file" accept="image/*" onChange={(event) => uploadAsset(event, "heroImage")} disabled={uploading} />
              </label>
            </div>
          </section>

          <section className="glass-card" style={{ borderRadius: 28, padding: 24, display: "grid", gap: 16 }}>
            <div className="section-title">
              <h2>Experience</h2>
              <p>These entries render into expandable timeline cards on the homepage.</p>
            </div>
            {data.experience.map((item, index) => (
              <div key={item.id} style={{ display: "grid", gap: 12, padding: 18, borderRadius: 20, border: "1px solid var(--line)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <strong>Experience #{index + 1}</strong>
                  <button
                    className="button-ghost"
                    type="button"
                    onClick={() =>
                      setData({
                        ...data,
                        experience: data.experience.filter((entry) => entry.id !== item.id)
                      })
                    }
                  >
                    Remove
                  </button>
                </div>
                <div className="grid-two">
                  <input
                    className="input"
                    placeholder="Role"
                    value={item.role}
                    onChange={(event) =>
                      setData({
                        ...data,
                        experience: data.experience.map((entry) =>
                          entry.id === item.id ? { ...entry, role: event.target.value } : entry
                        )
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Company"
                    value={item.company}
                    onChange={(event) =>
                      setData({
                        ...data,
                        experience: data.experience.map((entry) =>
                          entry.id === item.id ? { ...entry, company: event.target.value } : entry
                        )
                      })
                    }
                  />
                </div>
                <div className="grid-two">
                  <input
                    className="input"
                    placeholder="Period"
                    value={item.period}
                    onChange={(event) =>
                      setData({
                        ...data,
                        experience: data.experience.map((entry) =>
                          entry.id === item.id ? { ...entry, period: event.target.value } : entry
                        )
                      })
                    }
                  />
                  <input
                    className="input"
                    placeholder="Location"
                    value={item.location}
                    onChange={(event) =>
                      setData({
                        ...data,
                        experience: data.experience.map((entry) =>
                          entry.id === item.id ? { ...entry, location: event.target.value } : entry
                        )
                      })
                    }
                  />
                </div>
                <textarea
                  className="textarea"
                  placeholder="Summary"
                  value={item.summary}
                  onChange={(event) =>
                    setData({
                      ...data,
                      experience: data.experience.map((entry) =>
                        entry.id === item.id ? { ...entry, summary: event.target.value } : entry
                      )
                    })
                  }
                />
                <textarea
                  className="textarea"
                  placeholder="One highlight per line"
                  value={joinLines(item.highlights)}
                  onChange={(event) =>
                    setData({
                      ...data,
                      experience: data.experience.map((entry) =>
                        entry.id === item.id ? { ...entry, highlights: splitLines(event.target.value) } : entry
                      )
                    })
                  }
                />
              </div>
            ))}
            <button
              className="button-ghost"
              type="button"
              onClick={() =>
                setData({
                  ...data,
                  experience: [
                    ...data.experience,
                    {
                      id: slugId("exp"),
                      company: "",
                      role: "",
                      period: "",
                      location: "",
                      summary: "",
                      highlights: []
                    }
                  ]
                })
              }
            >
              Add experience
            </button>
          </section>

          <section className="glass-card" style={{ borderRadius: 28, padding: 24, display: "grid", gap: 16 }}>
            <div className="section-title">
              <h2>Education, projects, awards, and case studies</h2>
              <p>For speed, the remaining content blocks use direct JSON editing in one place.</p>
            </div>
            <textarea
              className="textarea"
              style={{ minHeight: 540, fontFamily: "monospace", fontSize: 14 }}
              value={jsonDraft}
              onChange={(event) => {
                setJsonDraft(event.target.value);
                try {
                  const parsed = JSON.parse(event.target.value) as Pick<
                    SiteData,
                    "education" | "projects" | "awards" | "caseStudies" | "site"
                  >;
                  setData({
                    ...data,
                    education: parsed.education,
                    projects: parsed.projects,
                    awards: parsed.awards,
                    caseStudies: parsed.caseStudies,
                    site: parsed.site
                  });
                  setStatus("JSON updated locally. Save when you’re ready.");
                } catch {
                  setStatus("JSON has a formatting issue. Fix it before saving.");
                }
              }}
            />
            <div style={{ display: "grid", gap: 12 }}>
              {data.caseStudies.map((caseStudy) => (
                <div key={caseStudy.id} className="grid-two" style={{ alignItems: "center" }}>
                  <label>
                    <div style={{ marginBottom: 8 }}>Thumbnail URL for {caseStudy.title}</div>
                    <input
                      className="input"
                      value={caseStudy.thumbnailUrl}
                      onChange={(event) =>
                        setData({
                          ...data,
                          caseStudies: data.caseStudies.map((entry) =>
                            entry.id === caseStudy.id ? { ...entry, thumbnailUrl: event.target.value } : entry
                          )
                        })
                      }
                    />
                  </label>
                  <label>
                    <div style={{ marginBottom: 8 }}>Upload thumbnail</div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => uploadAsset(event, "thumbnailUrl", caseStudy.id)}
                      disabled={uploading}
                    />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <div className="cta-row">
            <button className="button-primary" type="submit">
              Save content
            </button>
            <a className="button-ghost" href="/">
              View homepage
            </a>
          </div>
        </form>
      </div>
    </main>
  );
}
