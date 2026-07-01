"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { photoUrl, streamConfigured, streamThumbnailUrl, streamIframeUrl } from "@/lib/media";
import type { PostMeta } from "@/lib/posts";
import type { PhotoMeta } from "@/lib/photos";
import type { VlogMeta } from "@/lib/vlogs";
import type { Project } from "@/content/projects";
import { Slideshow } from "@/components/Slideshow";
import { features } from "@/lib/features";

function VideoModal({ streamId, title, vertical = false, onClose }: {
  streamId: string;
  title: string;
  vertical?: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(5,5,6,0.9)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px",
      }}
    >
      <button
        onClick={onClose}
        aria-label="Fechar"
        style={{
          position: "absolute", top: 18, right: 22,
          background: "none", border: "none", cursor: "pointer",
          color: "#f4f4f3", fontSize: 34, lineHeight: 1,
        }}
      >
        &times;
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: vertical ? "min(420px, 90vw)" : "min(960px, 92vw)",
          aspectRatio: vertical ? "9 / 16" : "16 / 9",
          maxHeight: "88vh",
          borderRadius: 14,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <iframe
          src={`${streamIframeUrl(streamId)}?autoplay=true`}
          title={title}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}

type FilterType = "tudo" | "fotos" | "vlogs" | "textos" | "android";

const filters: { id: FilterType; label: string }[] = [
  { id: "tudo", label: "Tudo" },
  { id: "fotos", label: "Fotos" },
  { id: "vlogs", label: "Vlogs" },
  { id: "textos", label: "Textos" },
  { id: "android", label: "Android" },
].filter((f) => f.id !== "vlogs" || features.vlogs) as { id: FilterType; label: string }[];

const ptMonths = [
  "jan","fev","mar","abr","mai","jun",
  "jul","ago","set","out","nov","dez",
];

function formatDate(dateStr: string, type: "foto" | "texto" | "android"): string {
  const d = new Date(dateStr + "T12:00:00Z");
  const day = d.getUTCDate();
  const month = ptMonths[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  if (type === "android") return `projeto · ${month} ${year}`;
  return `${day} ${month} ${year}`;
}

interface TimelineItem {
  type: "foto" | "vlog" | "texto" | "android";
  date: string;
  title: string;
  href: string;
  isExternal?: boolean;
  excerpt?: string;
  description?: string;
  photos?: string[];
  tech?: string[];
  readingTime?: string;
  duration?: string;
  vlogType?: string;
  bg?: string;
  streamId?: string;
}

interface TimelineProps {
  posts: PostMeta[];
  photos: PhotoMeta[];
  vlogs: VlogMeta[];
  projects: Project[];
}

export function Timeline({ posts, photos, vlogs, projects }: TimelineProps) {
  const [filter, setFilter] = useState<FilterType>("tudo");
  const [slideshow, setSlideshow] = useState<{ photos: string[]; index: number } | null>(null);
  const [playingVlog, setPlayingVlog] = useState<TimelineItem | null>(null);

  const items: TimelineItem[] = [
    ...photos.map((p): TimelineItem => ({
      type: "foto",
      date: p.date,
      title: p.title ?? p.location ?? "Galeria",
      href: "/photos",
      description: p.description,
      photos: p.photos,
    })),
    ...vlogs.map((v): TimelineItem => ({
      type: "vlog",
      date: v.date,
      title: v.title,
      href: "/vlogs",
      description: v.description,
      duration: v.duration,
      vlogType: v.type,
      bg: v.bg,
      streamId: v.streamId,
    })),
    ...posts.map((p): TimelineItem => ({
      type: "texto",
      date: p.date,
      title: p.title,
      href: p.isExternal ? (p.externalUrl ?? "#") : `/blog/${p.slug}`,
      isExternal: p.isExternal,
      excerpt: p.excerpt,
      readingTime: p.readingTime,
    })),
    ...projects.map((p): TimelineItem => ({
      type: "android",
      date: "2026-04-01",
      title: p.name,
      href: p.githubUrl ?? p.demoUrl ?? "/projects",
      description: p.description,
      tech: p.tech,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const filtered = items.filter((item) => {
    if (filter === "tudo") return true;
    if (filter === "fotos") return item.type === "foto";
    if (filter === "vlogs") return item.type === "vlog";
    if (filter === "textos") return item.type === "texto";
    if (filter === "android") return item.type === "android";
    return true;
  });

  return (
    <div
      style={{ maxWidth: "820px", margin: "0 auto", padding: "64px 40px 88px" }}
    >
      {playingVlog && playingVlog.streamId && (
        <VideoModal
          streamId={playingVlog.streamId}
          title={playingVlog.title}
          vertical={playingVlog.vlogType === "short"}
          onClose={() => setPlayingVlog(null)}
        />
      )}
      {slideshow && (
        <Slideshow
          photos={slideshow.photos}
          slide={slideshow.index}
          onClose={() => setSlideshow(null)}
          onPrev={() => setSlideshow((s) => s && s.index > 0 ? { ...s, index: s.index - 1 } : s)}
          onNext={() => setSlideshow((s) => s && s.index < s.photos.length - 1 ? { ...s, index: s.index + 1 } : s)}
          onGoto={(i) => setSlideshow((s) => s ? { ...s, index: i } : s)}
        />
      )}
      <h1
        className="font-grotesk"
        style={{
          fontWeight: 600,
          fontSize: "44px",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: "#f4f4f3",
          margin: "0 0 18px",
        }}
      >
        Um diário entre commits e fronteiras.
      </h1>
      <p
        className="font-hanken"
        style={{
          fontSize: "17px",
          lineHeight: 1.6,
          color: "#9a9aa0",
          margin: "0 0 30px",
          maxWidth: "600px",
        }}
      >
        Aqui eu junto fotos de viagem, vídeos, textos e os apps que construo,
        num lugar só.
      </p>

      <div
        style={{ display: "flex", gap: "9px", flexWrap: "wrap" }}
        className="font-mono"
      >
        {filters.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setFilter(id)}
            style={{
              padding: "7px 14px",
              borderRadius: "999px",
              fontSize: "12px",
              cursor: "pointer",
              border:
                filter === id
                  ? "none"
                  : "1px solid rgba(255,255,255,0.12)",
              background: filter === id ? "#f4f4f3" : "transparent",
              color: filter === id ? "#0a0a0b" : "#9a9aa0",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="font-hanken"
          style={{
            padding: "48px 0",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "44px",
            color: "#76767c",
            fontSize: "15px",
          }}
        >
          Nenhum conteúdo aqui ainda.
        </div>
      ) : (
        filtered.map((item, i) => (
          <article
            key={`${item.type}-${item.title}-${i}`}
            style={{
              padding: "38px 0",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: i === 0 ? "44px" : 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "13px",
                marginBottom: "15px",
              }}
            >
              <span
                className="font-mono"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  border: "1px solid oklch(0.76 0.20 142 / 0.35)",
                  padding: "4px 9px",
                  borderRadius: "999px",
                }}
              >
                {item.type}
              </span>
              <span
                className="font-mono"
                style={{ fontSize: "12px", color: "#76767c" }}
              >
                {item.type === "foto" &&
                  `galeria · ${formatDate(item.date, "foto")}`}
                {item.type === "vlog" &&
                  `${item.duration} · ${formatDate(item.date, "foto")}`}
                {item.type === "texto" && (
                  item.isExternal
                    ? formatDate(item.date, "texto")
                    : `leitura ${item.readingTime?.replace(" read", "") ?? ""} · ${formatDate(item.date, "texto")}`
                )}
                {item.type === "android" && formatDate(item.date, "android")}
              </span>
            </div>

            {item.type === "texto" && (
              <>
                <h2
                  className="font-grotesk"
                  style={{
                    fontWeight: 600,
                    fontSize: "27px",
                    letterSpacing: "-0.02em",
                    color: "#f4f4f3",
                    margin: "0 0 10px",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  className="font-hanken"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "#b4b4b9",
                    margin: "0 0 14px",
                  }}
                >
                  {item.excerpt}
                </p>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-hanken"
                    style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-bright)", textDecoration: "none" }}
                  >
                    Ler artigo ↗
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="font-hanken"
                    style={{ fontSize: "14px", fontWeight: 600, color: "var(--accent-bright)", textDecoration: "none" }}
                  >
                    Continuar lendo →
                  </Link>
                )}
              </>
            )}

            {item.type === "foto" && (
              <>
                <h2
                  className="font-grotesk"
                  style={{
                    fontWeight: 600,
                    fontSize: "27px",
                    letterSpacing: "-0.02em",
                    color: "#f4f4f3",
                    margin: "0 0 8px",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  className="font-hanken"
                  style={{
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "#9a9aa0",
                    margin: 0,
                  }}
                >
                  {item.description}
                </p>
                {item.photos && item.photos.length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "8px",
                      marginTop: "18px",
                    }}
                  >
                    {item.photos.slice(0, 2).map((photo, pi) => (
                      <button
                        key={pi}
                        type="button"
                        onClick={() => setSlideshow({ photos: item.photos!, index: pi })}
                        style={{
                          aspectRatio: "1",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.06)",
                          padding: 0,
                          cursor: "zoom-in",
                          display: "block",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoUrl(photo)}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </button>
                    ))}
                    {item.photos.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setSlideshow({ photos: item.photos!, index: 2 })}
                        style={{
                          aspectRatio: "1",
                          borderRadius: "8px",
                          overflow: "hidden",
                          border: "1px solid rgba(255,255,255,0.06)",
                          padding: 0,
                          cursor: "zoom-in",
                          position: "relative",
                          display: "block",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoUrl(item.photos[2])}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                        {item.photos.length > 3 && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: "rgba(0,0,0,0.55)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className="font-grotesk"
                              style={{
                                fontWeight: 600,
                                fontSize: "20px",
                                color: "#f4f4f3",
                              }}
                            >
                              +{item.photos.length - 3}
                            </span>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </>
            )}

            {item.type === "vlog" && (
              <>
                <h2
                  className="font-grotesk"
                  style={{ fontWeight: 600, fontSize: "27px", letterSpacing: "-0.02em", color: "#f4f4f3", margin: "0 0 8px" }}
                >
                  {item.title}
                </h2>
                {item.description && (
                  <p className="font-hanken" style={{ fontSize: "15px", lineHeight: 1.6, color: "#9a9aa0", margin: 0 }}>
                    {item.description}
                  </p>
                )}
                <button
                  onClick={() => item.streamId && streamConfigured() ? setPlayingVlog(item) : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16/9",
                    borderRadius: "10px",
                    marginTop: "18px",
                    background: item.streamId && streamConfigured()
                      ? `center/cover no-repeat url("${streamThumbnailUrl(item.streamId)}")`
                      : item.bg,
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: 0,
                    cursor: item.streamId && streamConfigured() ? "pointer" : "default",
                  }}
                >
                  <div style={{
                    width: "60px", height: "60px", borderRadius: "50%",
                    background: "rgba(10,10,11,0.5)",
                    border: "1.5px solid rgba(255,255,255,0.45)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <div style={{
                      width: 0, height: 0,
                      borderLeft: "15px solid #f4f4f3",
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      marginLeft: "4px",
                    }} />
                  </div>
                </button>
                <Link href="/vlogs" className="font-hanken" style={{ display: "inline-block", marginTop: "16px", fontSize: "14px", fontWeight: 600, color: "var(--accent-bright)", textDecoration: "none" }}>
                  Assistir vídeos →
                </Link>
              </>
            )}

            {item.type === "android" && (
              <>
                <h2
                  className="font-grotesk"
                  style={{
                    fontWeight: 600,
                    fontSize: "27px",
                    letterSpacing: "-0.02em",
                    color: "#f4f4f3",
                    margin: "0 0 16px",
                  }}
                >
                  {item.title}
                </h2>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    gap: "18px",
                    alignItems: "center",
                    padding: "18px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "14px",
                    background: "#111113",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      width: "58px",
                      height: "58px",
                      flexShrink: 0,
                      borderRadius: "13px",
                      background:
                        "repeating-linear-gradient(135deg,#1d1d20,#1d1d20 8px,#141417 8px,#141417 16px)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      className="font-mono"
                      style={{ fontSize: "9px", color: "#76767c" }}
                    >
                      apk
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    {item.tech && (
                      <div
                        className="font-mono"
                        style={{
                          fontSize: "10px",
                          letterSpacing: "0.1em",
                          color: "var(--accent)",
                          marginBottom: "4px",
                        }}
                      >
                        {item.tech.join(" · ").toUpperCase()}
                      </div>
                    )}
                    <div
                      className="font-hanken"
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.5,
                        color: "#9a9aa0",
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                  <span
                    className="font-mono"
                    style={{ fontSize: "18px", color: "#76767c" }}
                  >
                    ↗
                  </span>
                </a>
              </>
            )}
          </article>
        ))
      )}

      <div
        style={{
          marginTop: "48px",
          paddingTop: "38px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            className="font-grotesk"
            style={{
              fontWeight: 600,
              fontSize: "22px",
              color: "#f4f4f3",
              marginBottom: "6px",
            }}
          >
            Vamos conversar
          </div>
          <div
            className="font-mono"
            style={{ fontSize: "14px", color: "#76767c" }}
          >
            felipe@devcapu.com
          </div>
        </div>
        <div
          style={{ display: "flex", gap: "18px" }}
          className="font-mono"
        >
          <a
            href="https://instagram.com/devcapu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#9a9aa0",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            instagram
          </a>
          <a
            href="https://youtube.com/@devcapu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#9a9aa0",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            youtube
          </a>
          <a
            href="https://github.com/devcapu"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#9a9aa0",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            github
          </a>
        </div>
      </div>
    </div>
  );
}
