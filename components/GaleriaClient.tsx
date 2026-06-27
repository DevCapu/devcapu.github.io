"use client";

import { useState, useEffect } from "react";
import type { PhotoMeta } from "@/lib/photos";
import { photoUrl } from "@/lib/media";

const ACCENT = "oklch(0.78 0.14 55)";



const PT_MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

const TAG_GRADIENTS: Record<string, [string, string]> = {
  pessoas:   ["#1d1218", "#130d10"],
  urbano:    ["#0e1a0e", "#090e09"],
  natureza:  ["#111a0c", "#0b100a"],
  cotidiano: ["#1c160e", "#12100a"],
  praia:     ["#0c0e1c", "#07080e"],
  interior:  ["#1a120c", "#100b07"],
  família:   ["#1d1215", "#120b0d"],
};
const DEFAULT_GRADIENT: [string, string] = ["#131313", "#0a0a0a"];

const ASPECT_CYCLE = ["4/5", "3/4", "4/3", "1/1", "3/4", "4/3"] as const;

function tagGradient(tag?: string): string {
  const [from, to] = (tag && TAG_GRADIENTS[tag]) || DEFAULT_GRADIENT;
  return `linear-gradient(145deg,${from} 0%,${to} 100%)`;
}

function albumName(p: PhotoMeta): string {
  return p.title ?? p.location ?? p.slug;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00Z");
  return `${PT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

export function GaleriaClient({ photos }: { photos: PhotoMeta[] }) {
  const [filter, setFilter] = useState<string>("todos");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [slide, setSlide] = useState(0);

  const tags = Array.from(new Set(photos.map((p) => p.tag).filter((t): t is string => !!t)));
  const filters = [
    { id: "todos", label: "Todos" },
    ...tags.map((tag) => ({
      id: tag,
      label: tag.charAt(0).toUpperCase() + tag.slice(1),
    })),
  ];

  const filtered = filter === "todos" ? photos : photos.filter((p) => p.tag === filter);
  const openAlbum = openSlug ? (photos.find((p) => p.slug === openSlug) ?? null) : null;
  const photoCount = openAlbum?.photos.length ?? 0;
  const currentPhoto = openAlbum?.photos[slide] ?? null;

  useEffect(() => {
    if (!openSlug) return;
    const album = photos.find((p) => p.slug === openSlug);
    const count = album?.photos.length ?? 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSlide((s) => Math.min(Math.max(0, count - 1), s + 1));
      if (e.key === "ArrowLeft") setSlide((s) => Math.max(0, s - 1));
      if (e.key === "Escape") { setOpenSlug(null); setSlide(0); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openSlug, photos]);

  const openFn = (slug: string) => { setOpenSlug(slug); setSlide(0); };
  const closeFn = () => { setOpenSlug(null); setSlide(0); };

  const navBtnStyle = (side: "left" | "right", disabled: boolean): React.CSSProperties => ({
    position: "absolute",
    [side]: "18px",
    top: "50%",
    transform: "translateY(-50%)",
    background: disabled ? "rgba(7,7,10,0.5)" : "rgba(7,7,10,0.85)",
    border: `1px solid ${disabled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.22)"}`,
    color: disabled ? "#252530" : "#f4f4f3",
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    cursor: disabled ? "default" : "pointer",
    fontSize: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    transition: "all 0.15s",
    fontFamily: "inherit",
  });

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative" }}>

      {/* ── GRID VIEW ── */}
      {!openAlbum && (
        <div style={{ height: "100%", overflowY: "auto" }}>
          <div style={{ padding: "40px 36px 72px", maxWidth: "1080px" }}>

            <div style={{ marginBottom: "26px" }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.24em", color: ACCENT, marginBottom: "10px" }}>
                01 — GALERIA
              </div>
              <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "32px", lineHeight: 1.05, letterSpacing: "-0.03em", color: "#f4f4f3", margin: "0 0 7px" }}>
                Arquivo Visual
              </h1>
              <p style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "14px", lineHeight: 1.6, color: "#9a9aa0", margin: 0 }}>
                Álbuns por tema, ideia ou sensação — nem sempre um lugar.
              </p>
            </div>

            {/* Filter chips */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "28px" }}>
              {filters.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setFilter(id)}
                  style={{
                    padding: "5px 14px",
                    borderRadius: "999px",
                    cursor: "pointer",
                    fontFamily: "'JetBrains Mono',monospace",
                    fontSize: "10px",
                    letterSpacing: "0.04em",
                    transition: "all 0.15s",
                    ...(filter === id
                      ? { background: ACCENT, color: "#0a0a0b", border: "none" }
                      : { background: "transparent", border: "1px solid rgba(255,255,255,0.10)", color: "#9a9aa0" }),
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mosaic */}
            {filtered.length === 0 ? (
              <div style={{ paddingTop: "48px", fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "15px", color: "#76767c" }}>
                Nenhum álbum aqui ainda.
              </div>
            ) : (
              <div style={{ columns: 3, columnGap: "10px" }}>
                {filtered.map((album, i) => {
                  const hasPhoto = album.photos.length > 0;
                  const cardBg: React.CSSProperties = hasPhoto
                    ? { backgroundImage: `url(${photoUrl(album.photos[0])})`, backgroundSize: "cover", backgroundPosition: "center" }
                    : { background: tagGradient(album.tag) };
                  const aspect = ASPECT_CYCLE[i % ASPECT_CYCLE.length];

                  return (
                    <div
                      key={album.slug}
                      onClick={() => openFn(album.slug)}
                      style={{ breakInside: "avoid", marginBottom: "10px", borderRadius: "10px", overflow: "hidden", cursor: "pointer" }}
                    >
                      <div style={{ aspectRatio: aspect, position: "relative", overflow: "hidden", ...cardBg }}>
                        {/* Grain */}
                        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(153deg,transparent,transparent 17px,rgba(255,255,255,0.017) 17px,rgba(255,255,255,0.017) 18px)" }} />
                        {/* Vignette */}
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,0.45) 100%)" }} />
                        {/* Bottom gradient */}
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.08) 48%,transparent 100%)" }} />

                        {/* Tag */}
                        <div style={{ position: "absolute", top: "10px", left: "10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, background: "rgba(0,0,0,0.72)", border: "1px solid oklch(0.78 0.14 55 / 0.28)", padding: "3px 8px", borderRadius: "3px" }}>
                          {album.tag ?? "foto"}
                        </div>

                        {/* Count */}
                        <div style={{ position: "absolute", top: "10px", right: "10px", fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", color: "#b4b4b9", background: "rgba(0,0,0,0.72)", padding: "3px 8px", borderRadius: "3px" }}>
                          {album.photos.length} ↗
                        </div>

                        {/* Info */}
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "11px 13px" }}>
                          <h3 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "-0.015em", color: "#f4f4f3", margin: "0 0 3px", lineHeight: 1.25 }}>
                            {albumName(album)}
                          </h3>
                          <div style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "11px", color: "#78787e", lineHeight: 1.4 }}>
                            {album.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── LIGHTBOX ── */}
      {openAlbum && (
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", background: "#070709" }}>

          {/* Top bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 26px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
              <button onClick={closeFn} style={{ background: "none", border: "none", color: "#9a9aa0", fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" }}>
                ← voltar
              </button>
              <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.09)" }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT }}>
                  {openAlbum.tag ?? "foto"}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "9px", color: "#454548" }}>
                  {formatDate(openAlbum.date)}
                </span>
              </div>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#56565c", letterSpacing: "0.06em" }}>
              {photoCount > 0 ? `${slide + 1} / ${photoCount}` : "—"}
            </div>
          </div>

          {/* Album meta */}
          <div style={{ padding: "18px 26px 0", flexShrink: 0 }}>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, fontSize: "26px", letterSpacing: "-0.025em", color: "#f4f4f3", margin: "0 0 4px" }}>
              {albumName(openAlbum)}
            </h2>
            <p style={{ fontFamily: "'Hanken Grotesk',sans-serif", fontSize: "13px", color: "#9a9aa0", margin: 0 }}>
              {openAlbum.description}
            </p>
          </div>

          {/* Photo */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden", margin: "16px 26px 12px", borderRadius: "10px" }}>
            {currentPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={currentPhoto}
                src={photoUrl(currentPhoto)}
                alt={albumName(openAlbum)}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : (
              <div style={{ position: "absolute", inset: 0, background: tagGradient(openAlbum.tag), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: "0.2em", color: "#242428" }}>
                  {photoCount > 0 ? `${slide + 1} / ${photoCount}` : "sem fotos"}
                </div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "28px", fontWeight: 600, letterSpacing: "-0.025em", color: "#1c1c20", textAlign: "center", maxWidth: "480px", lineHeight: 1.2 }}>
                  {albumName(openAlbum)}
                </div>
              </div>
            )}
            <button
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              style={navBtnStyle("left", slide === 0)}
            >
              ←
            </button>
            <button
              onClick={() => setSlide((s) => Math.min(Math.max(0, photoCount - 1), s + 1))}
              style={navBtnStyle("right", slide >= photoCount - 1)}
            >
              →
            </button>
          </div>

          {/* Progress + hint */}
          <div style={{ padding: "0 26px 18px", flexShrink: 0 }}>
            <div style={{ height: "2px", background: "rgba(255,255,255,0.07)", borderRadius: "1px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${photoCount > 0 ? ((slide + 1) / photoCount) * 100 : 0}%`, background: ACCENT, borderRadius: "1px", transition: "width 0.2s" }} />
            </div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "8px", letterSpacing: "0.14em", color: "#282830", marginTop: "8px", textAlign: "center" }}>
              ← → NAVEGAR · ESC FECHAR
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
