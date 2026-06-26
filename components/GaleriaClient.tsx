"use client";

import { useState, useEffect } from "react";
import type { PhotoMeta } from "@/lib/photos";

const ACCENT = "oklch(0.78 0.14 55)";
const PT_MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

type FilterType = "todos" | "pessoas" | "urbano" | "natureza" | "cotidiano";

const FILTERS: { id: FilterType; label: string }[] = [
  { id: "todos",     label: "Todos" },
  { id: "pessoas",   label: "Pessoas" },
  { id: "urbano",    label: "Urbano" },
  { id: "natureza",  label: "Natureza" },
  { id: "cotidiano", label: "Cotidiano" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00Z");
  return `${PT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function albumName(p: PhotoMeta) {
  return p.title ?? p.location ?? p.slug;
}

function albumBg(p: PhotoMeta): React.CSSProperties {
  if (p.photos.length > 0) {
    return {
      backgroundImage: `url(${p.photos[0]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: "linear-gradient(145deg, #1a1016, #100b0e)" };
}

// ── Slideshow overlay ──────────────────────────────────────────────────────────

interface SlideshowProps {
  album: PhotoMeta;
  slide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (i: number) => void;
}

function Slideshow({ album, slide, onClose, onPrev, onNext, onGoto }: SlideshowProps) {
  const total = album.photos.length;
  const current = album.photos[slide];

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    background: "none",
    border: `1px solid ${disabled ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.2)"}`,
    color: disabled ? "#2a2a2f" : "#f4f4f3",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: disabled ? "default" : "pointer",
    fontSize: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#07070a",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#9a9aa0",
              cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              padding: 0,
            }}
          >
            ← galeria
          </button>
          <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.1)" }} />
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "16px",
              letterSpacing: "-0.02em",
              color: "#f4f4f3",
              margin: 0,
            }}
          >
            {albumName(album)}
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: "#76767c",
            }}
          >
            {slide + 1} / {total}
          </span>
          <button onClick={onPrev} style={navBtn(slide === 0)}>←</button>
          <button onClick={onNext} style={navBtn(slide >= total - 1)}>→</button>
        </div>
      </div>

      {/* Large photo */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {current ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current}
            alt={album.description}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(145deg, #1a1016, #100b0e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.16em",
                color: "#2a2a2e",
              }}
            >
              {slide + 1} / {total}
            </span>
          </div>
        )}
      </div>

      {/* Filmstrip */}
      <div
        style={{
          height: "88px",
          flexShrink: 0,
          borderTop: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          padding: "0 18px",
          gap: "7px",
          overflowX: "auto",
        }}
      >
        {album.photos.map((src, i) => (
          <button
            key={i}
            onClick={() => onGoto(i)}
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "5px",
              flexShrink: 0,
              overflow: "hidden",
              cursor: "pointer",
              padding: 0,
              background: "transparent",
              border: `2px solid ${i === slide ? ACCENT : "rgba(255,255,255,0.06)"}`,
              transition: "border-color 0.15s",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            width: `${((slide + 1) / total) * 100}%`,
            background: ACCENT,
            borderRadius: "1px",
            transition: "width 0.22s",
          }}
        />
      </div>
    </div>
  );
}

// ── Main gallery component ─────────────────────────────────────────────────────

export function GaleriaClient({ photos }: { photos: PhotoMeta[] }) {
  const [filter, setFilter]       = useState<FilterType>("todos");
  const [openSlug, setOpenSlug]   = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const filtered = filter === "todos"
    ? photos
    : photos.filter((p) => p.tag === filter);

  const openAlbum = openSlug ? (photos.find((p) => p.slug === openSlug) ?? null) : null;

  useEffect(() => {
    if (!openAlbum) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSlideIndex((i) => Math.min(openAlbum.photos.length - 1, i + 1));
      if (e.key === "ArrowLeft")  setSlideIndex((i) => Math.max(0, i - 1));
      if (e.key === "Escape")     { setOpenSlug(null); setSlideIndex(0); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openAlbum]);

  const openFn = (slug: string) => { setOpenSlug(slug); setSlideIndex(0); };
  const closeFn = () => { setOpenSlug(null); setSlideIndex(0); };

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <>
      {openAlbum && (
        <Slideshow
          album={openAlbum}
          slide={slideIndex}
          onClose={closeFn}
          onPrev={() => setSlideIndex((i) => Math.max(0, i - 1))}
          onNext={() => setSlideIndex((i) => Math.min(openAlbum.photos.length - 1, i + 1))}
          onGoto={setSlideIndex}
        />
      )}

      <div style={{ padding: "36px 30px 60px", maxWidth: "780px" }}>

        {/* Header */}
        <div style={{ marginBottom: "22px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.22em",
              color: ACCENT,
              marginBottom: "8px",
            }}
          >
            01 — GALERIA
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "30px",
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#f4f4f3",
              margin: "0 0 6px",
            }}
          >
            Arquivo Visual
          </h1>
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "13px",
              lineHeight: 1.6,
              color: "#9a9aa0",
              margin: 0,
            }}
          >
            Álbuns por tema, ideia ou sensação — nem sempre um lugar.
          </p>
        </div>

        {/* Filter chips */}
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "24px" }}>
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setFilter(id)}
              style={{
                padding: "5px 13px",
                borderRadius: "999px",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.04em",
                transition: "all 0.15s",
                ...(filter === id
                  ? { background: ACCENT, color: "#0a0a0b", border: "none" }
                  : { background: "transparent", border: "1px solid rgba(255,255,255,0.11)", color: "#9a9aa0" }),
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured album hero */}
        {featured && (
          <button
            onClick={() => openFn(featured.slug)}
            style={{
              display: "block",
              width: "100%",
              marginBottom: "24px",
              cursor: "pointer",
              borderRadius: "12px",
              overflow: "hidden",
              padding: 0,
              border: "none",
              background: "transparent",
            }}
          >
            <div
              style={{
                aspectRatio: "16/9",
                position: "relative",
                overflow: "hidden",
                ...albumBg(featured),
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "14px",
                  left: "14px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: ACCENT,
                  background: "rgba(0,0,0,0.7)",
                  border: "1px solid oklch(0.78 0.14 55 / 0.3)",
                  padding: "4px 9px",
                  borderRadius: "3px",
                }}
              >
                destaque
              </div>
              <div style={{ position: "absolute", bottom: "20px", left: "20px", right: "120px" }}>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "22px",
                    letterSpacing: "-0.025em",
                    color: "#f4f4f3",
                    margin: "0 0 5px",
                    lineHeight: 1.15,
                    textAlign: "left",
                  }}
                >
                  {albumName(featured)}
                </h2>
                <div
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: "12px",
                    color: "#b4b4b9",
                    textAlign: "left",
                  }}
                >
                  {featured.description} · {featured.photos.length} fotos
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: ACCENT,
                  background: "rgba(0,0,0,0.6)",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "1px solid oklch(0.78 0.14 55 / 0.3)",
                  whiteSpace: "nowrap",
                }}
              >
                ver álbum →
              </div>
            </div>
          </button>
        )}

        {/* Separator */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.07)" }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "9px",
              letterSpacing: "0.16em",
              color: "#353538",
            }}
          >
            {filtered.length} ÁLBUNS
          </span>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* Album list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {rest.map((album) => (
            <button
              key={album.slug}
              onClick={() => openFn(album.slug)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 0",
                cursor: "pointer",
                background: "transparent",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                width: "100%",
                textAlign: "left",
                transition: "opacity 0.15s",
              }}
            >
              <div
                style={{
                  width: "72px",
                  height: "54px",
                  borderRadius: "6px",
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                  ...albumBg(album),
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "8px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.78 0.14 55 / 0.7)",
                    marginBottom: "4px",
                  }}
                >
                  {album.tag ?? "foto"} · {formatDate(album.date)}
                </div>
                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    letterSpacing: "-0.015em",
                    color: "#f4f4f3",
                    margin: "0 0 2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {albumName(album)}
                </h3>
                <div
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontSize: "11px",
                    color: "#9a9aa0",
                  }}
                >
                  {album.description}
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    color: "#9a9aa0",
                  }}
                >
                  {album.photos.length}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "9px",
                    color: "#454548",
                  }}
                >
                  fotos
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "14px",
                  color: "#454548",
                  flexShrink: 0,
                }}
              >
                →
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div
            style={{
              paddingTop: "48px",
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontSize: "15px",
              color: "#76767c",
            }}
          >
            Nenhum álbum aqui ainda.
          </div>
        )}

      </div>
    </>
  );
}
