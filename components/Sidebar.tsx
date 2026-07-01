"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { features } from "@/lib/features";

const navLinks = [
  { href: "/", label: "Início", index: "00" },
  { href: "/photos", label: "Galeria", index: "01" },
  { href: "/vlogs", label: "Vlogs", index: "02" },
  { href: "/blog", label: "Textos", index: "03" },
  { href: "/projects", label: "Projetos", index: "04" },
  { href: "/about", label: "Sobre", index: "05" },
].filter((link) => link.href !== "/vlogs" || features.vlogs);

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      style={{
        width: "360px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
        padding: "48px 40px",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            className="font-grotesk"
            style={{
              fontWeight: 700,
              fontSize: "26px",
              letterSpacing: "-0.03em",
              color: "#f4f4f3",
            }}
          >
            devcapu
          </span>
        </Link>
        <span
          className="font-mono"
          style={{ fontSize: "12px", color: "#76767c" }}
        >
          / felipe moreno
        </span>
      </div>

      <div
        style={{
          marginTop: "14px",
          width: "100%",
          height: "1px",
          background: "linear-gradient(90deg, var(--accent), transparent)",
        }}
      />

      <p
        className="font-hanken"
        style={{
          fontSize: "15px",
          lineHeight: 1.65,
          color: "#9a9aa0",
          margin: "34px 0 0",
        }}
      >
        São registros do que gosto e do quero compartilhar com quem gosto.
        O que você encontra aqui é uma mistura de filosofia, pessoas, lugares e tecnologia.
        <br/><br/>
        Continue construindo pontes.
      </p>

      <nav
        style={{ marginTop: "42px", display: "flex", flexDirection: "column" }}
        className="font-grotesk"
      >
        {navLinks.map(({ href, label, index }) => {
          const active = isActive(href);
          return (
            <Link
              key={`${href}-${label}`}
              href={href}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "11px 0",
                color: active ? "#f4f4f3" : "#9a9aa0",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                fontSize: "17px",
              }}
            >
              {label}
              <span
                className="font-mono"
                style={{
                  fontSize: "11px",
                  color: active ? "var(--accent)" : "#5a5a60",
                }}
              >
                {index}
              </span>
            </Link>
          );
        })}
      </nav>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        className="font-mono"
      >
        <a
          href="https://instagram.com/devcapu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#9a9aa0", textDecoration: "none", fontSize: "12px" }}
        >
          ↗ instagram
        </a>
        <a
          href="https://youtube.com/@devcapu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#9a9aa0", textDecoration: "none", fontSize: "12px" }}
        >
          ↗ youtube
        </a>
        <a
          href="https://github.com/devcapu"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#9a9aa0", textDecoration: "none", fontSize: "12px" }}
        >
          ↗ github
        </a>
        <span
          style={{ color: "#76767c", marginTop: "4px", fontSize: "12px" }}
        >
          felipe@devcapu.com
        </span>
      </div>
    </aside>
  );
}
