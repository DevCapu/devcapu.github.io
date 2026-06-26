"use client";

import { useEffect } from "react";

const ACCENT = "oklch(0.78 0.14 55)";

export interface SlideshowProps {
  photos: string[];
  title?: string;
  description?: string;
  slide: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoto: (i: number) => void;
}

export function Slideshow({ photos, title, description, slide, onClose, onPrev, onNext, onGoto }: SlideshowProps) {
  const total = photos.length;
  const current = photos[slide];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

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
            {title}
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
            alt={description ?? ""}
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
        {photos.map((src, i) => (
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
