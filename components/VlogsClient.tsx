"use client";

import { useEffect, useState } from "react";
import type { VlogMeta } from "@/lib/vlogs";
import { streamConfigured, streamIframeUrl, streamThumbnailUrl } from "@/lib/media";
import { PageHeader, pageContainerStyle } from "@/components/PageHeader";

type Filter = "todos" | "vlogs" | "shorts" | "tutoriais";

const ACCENT = "oklch(0.76 0.20 142)";

const PT_MONTHS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function formatDate(date: string): string {
  const d = new Date(date + "T12:00:00Z");
  return `${d.getUTCDate()} ${PT_MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Vídeo está pronto para tocar (tem UID no Stream e o customer code está setado). */
function isPlayable(v: VlogMeta): boolean {
  return Boolean(v.streamId) && streamConfigured();
}

function posterFor(v: VlogMeta): string | undefined {
  return isPlayable(v) ? streamThumbnailUrl(v.streamId!) : undefined;
}

function chipStyle(active: boolean): React.CSSProperties {
  const base: React.CSSProperties = {
    padding: "7px 15px",
    borderRadius: "999px",
    cursor: "pointer",
    userSelect: "none",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "12px",
  };
  return active
    ? { ...base, background: ACCENT, color: "#050a05" }
    : { ...base, border: "1px solid rgba(255,255,255,0.12)", color: "#9a9aa0" };
}

function PlayIcon({ size, icon }: { size: number; icon: number }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: "rgba(10,10,11,0.52)",
        border: `${size >= 64 ? 2 : 1.5}px solid rgba(255,255,255,${size >= 64 ? 0.55 : 0.45})`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 0, height: 0,
          borderLeft: `${icon}px solid #f4f4f3`,
          borderTop: `${Math.round(icon * 0.636)}px solid transparent`,
          borderBottom: `${Math.round(icon * 0.636)}px solid transparent`,
          marginLeft: `${Math.round(icon * 0.2)}px`,
        }} />
      </div>
    </div>
  );
}

function TypeBadge({ label, xs = false }: { label: string; xs?: boolean }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: xs ? "8px" : "9px",
      letterSpacing: "0.1em",
      color: ACCENT,
      background: "rgba(0,0,0,0.75)",
      padding: xs ? "3px 7px" : "3px 8px",
      borderRadius: "3px",
      border: "1px solid oklch(0.76 0.20 142 / 0.3)",
    }}>
      {label.toUpperCase()}
    </span>
  );
}

function Duration({ time, xs = false }: { time: string; xs?: boolean }) {
  return (
    <div style={{
      position: "absolute",
      right: xs ? 8 : 10,
      bottom: xs ? 8 : 10,
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: xs ? "10px" : "11px",
      color: "#f4f4f3",
      background: "rgba(0,0,0,0.82)",
      padding: xs ? "2px 6px" : "3px 7px",
      borderRadius: xs ? 3 : 4,
    }}>
      {time}
    </div>
  );
}

interface ThumbProps {
  ratio: "16/9" | "9/16";
  bg: string;
  poster?: string;
  badge: string;
  duration: string;
  radius?: number;
  playSize?: number;
  playIcon?: number;
  xs?: boolean;
  topLeft?: React.ReactNode;
  onClick?: () => void;
}

function Thumb({ ratio, bg, poster, badge, duration, radius = 10, playSize = 52, playIcon = 14, xs = false, topLeft, onClick }: ThumbProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "relative",
        aspectRatio: ratio,
        borderRadius: radius,
        background: poster ? `center / cover no-repeat url("${poster}")` : bg,
        border: "1px solid rgba(255,255,255,0.07)",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div style={{ position: "absolute", left: xs ? 9 : 12, top: xs ? 9 : 12, display: "flex", alignItems: "center", gap: 8, zIndex: 2 }}>
        {topLeft}
        <TypeBadge label={badge} xs={xs} />
      </div>
      <PlayIcon size={playSize} icon={playIcon} />
      <Duration time={duration} xs={xs} />
    </div>
  );
}

function VideoModal({ vlog, onClose }: { vlog: VlogMeta; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const vertical = vlog.type === "short";

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
          src={`${streamIframeUrl(vlog.streamId!)}?autoplay=true`}
          title={vlog.title}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>
    </div>
  );
}

const ytLinkStyle: React.CSSProperties = {
  flexShrink: 0,
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "11px",
  color: ACCENT,
  textDecoration: "none",
  padding: "9px 16px",
  border: "1px solid oklch(0.76 0.20 142 / 0.35)",
  borderRadius: "7px",
  whiteSpace: "nowrap",
};

export function VlogsClient({ vlogs }: { vlogs: VlogMeta[] }) {
  const [filter, setFilter] = useState<Filter>("todos");
  const [playing, setPlaying] = useState<VlogMeta | null>(null);

  const play = (v: VlogMeta) => () => {
    if (isPlayable(v)) setPlaying(v);
  };

  const vlogList = vlogs.filter(v => v.type === "vlog");
  const shortList = vlogs.filter(v => v.type === "short");
  const tutorialList = vlogs.filter(v => v.type === "tutorial");
  const heroVlog = vlogList[0];

  const remaining = vlogs
    .filter(v => v.id !== heroVlog?.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const bentoItems: Array<{ video: VlogMeta; span: 3 | 1 }> = [];
  let longFirst = true;
  const lQ = remaining.filter(v => v.type !== "short");
  const sQ = remaining.filter(v => v.type === "short");

  while (lQ.length > 0 && sQ.length > 0) {
    if (longFirst) {
      bentoItems.push({ video: lQ.shift()!, span: 3 });
      bentoItems.push({ video: sQ.shift()!, span: 1 });
    } else {
      bentoItems.push({ video: sQ.shift()!, span: 1 });
      bentoItems.push({ video: lQ.shift()!, span: 3 });
    }
    longFirst = !longFirst;
  }
  sQ.forEach(v => bentoItems.push({ video: v, span: 1 }));
  const extraLongs = lQ;

  // Card vertical (short), usado na bento e na grade de shorts.
  const shortCard = (v: VlogMeta) => (
    <div key={v.id} style={{ gridColumn: "span 1" }}>
      <Thumb ratio="9/16" bg={v.bg} poster={posterFor(v)} badge="short" duration={v.duration} playSize={40} playIcon={11} xs onClick={isPlayable(v) ? play(v) : undefined} />
      <div style={{ marginTop: "11px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#454548", marginBottom: "5px" }}>{formatDate(v.date)}</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "-0.01em", color: "#f4f4f3", margin: 0, lineHeight: 1.3 }}>
          {v.title}
        </h3>
      </div>
    </div>
  );

  // Card horizontal compacto (usado na bento para vlog/tutorial 3-col).
  const bentoWideCard = (v: VlogMeta) => (
    <div key={v.id} style={{ gridColumn: "span 3" }}>
      <Thumb ratio="16/9" bg={v.bg} poster={posterFor(v)} badge={v.type} duration={v.duration} onClick={isPlayable(v) ? play(v) : undefined} />
      <div style={{ marginTop: "11px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#454548", marginBottom: "5px" }}>{formatDate(v.date)}</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", letterSpacing: "-0.02em", color: "#f4f4f3", margin: "0 0 5px", lineHeight: 1.2 }}>
          {v.title}
        </h3>
        {v.description && (
          <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "13px", lineHeight: 1.5, color: "#9a9aa0", margin: 0 }}>
            {v.description}
          </p>
        )}
      </div>
    </div>
  );

  // Card horizontal grande (usado nas listas filtradas de vlogs/tutoriais).
  const wideListCard = (v: VlogMeta) => (
    <div key={v.id}>
      <Thumb ratio="16/9" bg={v.bg} poster={posterFor(v)} badge={v.type} duration={v.duration} playSize={64} playIcon={18} onClick={isPlayable(v) ? play(v) : undefined} />
      <div style={{ marginTop: "16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "28px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#454548", marginBottom: "7px" }}>{formatDate(v.date)}</div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "22px", letterSpacing: "-0.02em", color: "#f4f4f3", margin: "0 0 8px", lineHeight: 1.15 }}>
            {v.title}
          </h3>
          {v.description && (
            <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "#9a9aa0", margin: 0 }}>
              {v.description}
            </p>
          )}
        </div>
        <a href="https://youtube.com/@devcapu" target="_blank" rel="noopener noreferrer" style={{ ...ytLinkStyle, marginTop: "24px" }}>
          ↗ YouTube
        </a>
      </div>
    </div>
  );

  return (
    <div style={pageContainerStyle}>

      <PageHeader
        kicker="02 — VLOGS"
        title="Vídeos"
        subtitle="Vlogs de viagem, shorts do dia a dia e tutoriais Android — em ordem cronológica inversa."
      />

      {/* FILTER CHIPS */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "44px" }}>
        <span style={chipStyle(filter === "todos")} onClick={() => setFilter("todos")}>Todos</span>
        {vlogList.length > 0 && <span style={chipStyle(filter === "vlogs")} onClick={() => setFilter("vlogs")}>Vlogs</span>}
        {shortList.length > 0 && <span style={chipStyle(filter === "shorts")} onClick={() => setFilter("shorts")}>Shorts</span>}
        {tutorialList.length > 0 && <span style={chipStyle(filter === "tutoriais")} onClick={() => setFilter("tutoriais")}>Tutoriais</span>}
      </div>

      {/* HERO — vídeo mais recente */}
      {(filter === "todos" || filter === "vlogs") && heroVlog && (
        <div style={{ marginBottom: "48px" }}>
          <Thumb
            ratio="16/9"
            bg={heroVlog.bg}
            poster={posterFor(heroVlog)}
            badge="vlog"
            duration={heroVlog.duration}
            radius={14}
            playSize={76}
            playIcon={22}
            onClick={isPlayable(heroVlog) ? play(heroVlog) : undefined}
            topLeft={
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                color: "#050a05",
                background: ACCENT,
                padding: "4px 11px",
                borderRadius: "4px",
              }}>
                MAIS RECENTE
              </span>
            }
          />
          <div style={{ marginTop: "22px" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#5a5a60", marginBottom: "10px" }}>vlogs · {formatDate(heroVlog.date)}</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "29px", letterSpacing: "-0.025em", color: "#f4f4f3", margin: "0 0 10px", lineHeight: 1.1 }}>
              {heroVlog.title}
            </h2>
            {heroVlog.description && (
              <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "15px", lineHeight: 1.65, color: "#9a9aa0", margin: 0, maxWidth: "520px" }}>
                {heroVlog.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* VLOGS — lista filtrada (demais vlogs além do hero) */}
      {filter === "vlogs" && vlogList.length > 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {vlogList.slice(1).map(wideListCard)}
        </div>
      )}

      {/* SEPARATOR */}
      {filter === "todos" && remaining.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.16em", color: "#454548" }}>{remaining.length} VÍDEOS ANTERIORES</span>
          <div style={{ height: "1px", flex: 1, background: "rgba(255,255,255,0.08)" }} />
        </div>
      )}

      {/* BENTO GRID */}
      {filter === "todos" && bentoItems.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", alignItems: "start" }}>
          {bentoItems.map(({ video, span }) =>
            span === 3 ? bentoWideCard(video) : shortCard(video)
          )}
        </div>
      )}

      {/* SHORTS GRID — filtered view */}
      {filter === "shorts" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", alignItems: "start" }}>
          {shortList.map(shortCard)}
        </div>
      )}

      {/* TUTORIAIS — filtered view */}
      {filter === "tutoriais" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {tutorialList.map(wideListCard)}
        </div>
      )}

      {/* LONG-FORMS SEM PAR — shown in "todos" */}
      {filter === "todos" && extraLongs.length > 0 && (
        <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "32px" }}>
          {extraLongs.map(wideListCard)}
        </div>
      )}

      {/* FOOTER */}
      <div style={{ marginTop: "72px", paddingTop: "38px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "22px", color: "#f4f4f3", marginBottom: "6px" }}>Vamos conversar</div>
          <div style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "14px", color: "#76767c" }}>felipe@devcapu.com</div>
        </div>
        <div style={{ display: "flex", gap: "18px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
          <a href="https://instagram.com/devcapu" target="_blank" rel="noopener noreferrer" style={{ color: "#9a9aa0", textDecoration: "none" }}>instagram</a>
          <a href="https://youtube.com/@devcapu" target="_blank" rel="noopener noreferrer" style={{ color: "#9a9aa0", textDecoration: "none" }}>youtube</a>
          <a href="https://github.com/devcapu" target="_blank" rel="noopener noreferrer" style={{ color: "#9a9aa0", textDecoration: "none" }}>github</a>
        </div>
      </div>

      {playing && <VideoModal vlog={playing} onClose={() => setPlaying(null)} />}
    </div>
  );
}
