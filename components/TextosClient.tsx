"use client";

import { useState } from "react";
import type { PostMeta } from "@/lib/posts";

type Filter = "todos" | "aqui" | "externos";

const ACCENT = "oklch(0.78 0.14 55)";
const ACCENT_BRIGHT = "oklch(0.80 0.14 55)";
const PT_MONTHS = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-").map(Number);
  return `${day} ${PT_MONTHS[month - 1]} ${year}`;
}

function formatReadingTime(rt: string): string {
  const match = rt.match(/(\d+)\s*min/);
  return match ? `leitura ${match[1]} min` : "leitura rápida";
}

function buildMeta(post: PostMeta): string {
  const rt = formatReadingTime(post.readingTime);
  const dt = formatDate(post.date);
  if (post.isExternal) {
    const parts = [post.siteName, dt];
    return parts.filter(Boolean).join(" · ");
  }
  return [rt, dt].join(" · ");
}

export function TextosClient({ posts }: { posts: PostMeta[] }) {
  const [filter, setFilter] = useState<Filter>("todos");

  const filtered = posts.filter((p) =>
    filter === "todos" ? true : filter === "aqui" ? !p.isExternal : !!p.isExternal
  );

  const countLabel = filtered.length === 1 ? "1 texto" : `${filtered.length} textos`;

  function chipStyle(key: Filter): React.CSSProperties {
    const base: React.CSSProperties = {
      padding: "7px 15px",
      borderRadius: "999px",
      cursor: "pointer",
      userSelect: "none",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "12px",
    };
    return filter === key
      ? { ...base, background: ACCENT, color: "#0a0a0b" }
      : { ...base, border: "1px solid rgba(255,255,255,0.12)", color: "#9a9aa0" };
  }

  return (
    <div style={{ maxWidth: "780px", margin: "0 auto", padding: "64px 40px 88px" }}>

      {/* PAGE HEADER */}
      <div style={{ marginBottom: "34px" }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", letterSpacing: "0.18em", color: ACCENT, marginBottom: "12px" }}>
          03 — TEXTOS
        </div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "42px", lineHeight: 1.06, letterSpacing: "-0.03em", color: "#f4f4f3", margin: "0 0 10px" }}>
          Textos
        </h1>
        <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "16px", lineHeight: 1.6, color: "#9a9aa0", margin: 0, maxWidth: "560px" }}>
          Aqui moram as coisas que escrevi, sejam pensamentos, artigos técnicos ou um poema.
        </p>
      </div>

      {/* FILTER CHIPS */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
        <span style={chipStyle("todos")} onClick={() => setFilter("todos")}>Todos</span>
        <span style={chipStyle("aqui")} onClick={() => setFilter("aqui")}>Aqui no site</span>
        <span style={chipStyle("externos")} onClick={() => setFilter("externos")}>Externos ↗</span>
        <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#5a5a60" }}>
          {countLabel}
        </span>
      </div>

      {/* POST LIST */}
      <div>
        {filtered.map((post) => {
          const href = post.isExternal ? (post.externalUrl ?? "#") : `/blog/${post.slug}`;
          const target = post.isExternal ? "_blank" : "_self";
          const rel = post.isExternal ? "noopener noreferrer" : undefined;
          const cta = post.isExternal ? "Ler artigo ↗" : "Continuar lendo →";

          return (
            <a
              key={post.slug}
              href={href}
              target={target}
              rel={rel}
              style={{ display: "block", padding: "32px 0", borderTop: "1px solid rgba(255,255,255,0.08)", textDecoration: "none" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "13px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase", color: ACCENT, border: "1px solid oklch(0.78 0.14 55 / 0.35)", padding: "4px 9px", borderRadius: "999px" }}>
                  texto
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#76767c" }}>
                  {buildMeta(post)}
                </span>
                {post.isExternal && (
                  <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "5px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#0a0a0b", background: ACCENT, padding: "4px 10px", borderRadius: "999px" }}>
                    ↗ externo
                  </span>
                )}
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "27px", letterSpacing: "-0.02em", color: "#f4f4f3", margin: "0 0 9px", lineHeight: 1.15 }}>
                {post.title}
              </h2>
              <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "15px", lineHeight: 1.65, color: "#9a9aa0", margin: "0 0 14px", maxWidth: "600px" }}>
                {post.excerpt}
              </p>
              <span style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: ACCENT_BRIGHT }}>
                {cta}
              </span>
            </a>
          );
        })}
      </div>

      {/* FOOTER */}
      <div style={{ marginTop: "64px", paddingTop: "38px", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
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

    </div>
  );
}
