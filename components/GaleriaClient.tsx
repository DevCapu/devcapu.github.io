"use client";

import { useState } from "react";
import type { PhotoMeta } from "@/lib/photos";
import { Slideshow } from "@/components/Slideshow";

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

// ── Main gallery component ─────────────────────────────────────────────────────

export function GaleriaClient({ photos }: { photos: PhotoMeta[] }) {
  const [filter, setFilter]       = useState<FilterType>("todos");
  const [openSlug, setOpenSlug]   = useState<string | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  const filtered = filter === "todos"
    ? photos
    : photos.filter((p) => p.tag === filter);

  const openAlbum = openSlug ? (photos.find((p) => p.slug === openSlug) ?? null) : null;

  const openFn = (slug: string) => { setOpenSlug(slug); setSlideIndex(0); };
  const closeFn = () => { setOpenSlug(null); setSlideIndex(0); };

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <>
      {openAlbum && (
        <Slideshow
          photos={openAlbum.photos}
          title={albumName(openAlbum)}
          description={openAlbum.description}
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
