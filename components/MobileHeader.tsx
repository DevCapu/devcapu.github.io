"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/nav";

export function MobileHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const close = () => setMenuOpen(false);

  const bar = (rotate: number, translate: string): React.CSSProperties => ({
    height: "2px",
    background: "#e4e4e6",
    borderRadius: "2px",
    transition: "transform 0.2s, opacity 0.2s",
    transform: menuOpen ? `rotate(${rotate}deg) translate(${translate})` : "none",
    opacity: menuOpen && rotate === 0 ? 0 : 1,
    transformOrigin: "center",
  });

  return (
    <div className="lg:hidden sticky top-0 z-20">
      <header
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 18px",
          background: "rgba(10,10,11,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Link
          href="/"
          onClick={close}
          style={{ display: "flex", alignItems: "baseline", gap: "8px", textDecoration: "none" }}
        >
          <span
            className="font-grotesk"
            style={{ fontWeight: 700, fontSize: "20px", letterSpacing: "-0.03em", color: "#f4f4f3" }}
          >
            devcapu
          </span>
          <span className="font-mono" style={{ fontSize: "10px", color: "#76767c" }}>
            / felipe
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="menu"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "9px",
            width: "42px",
            height: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "18px", display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={bar(45, "0, 6px")} />
            <div style={bar(0, "0, 0")} />
            <div style={bar(-45, "0, -6px")} />
          </div>
        </button>
      </header>

      {menuOpen && (
        <>
          <div
            onClick={close}
            style={{ position: "fixed", inset: 0, zIndex: 0, background: "rgba(0,0,0,0.55)" }}
          />
          <nav
            className="font-grotesk"
            style={{
              position: "relative",
              zIndex: 10,
              background: "#0e0e10",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              padding: "8px 18px 18px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            {navLinks.map(({ href, label, index }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "13px 4px",
                    color: active ? "#f4f4f3" : "#9a9aa0",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    fontSize: "16px",
                  }}
                >
                  {label}
                  <span
                    className="font-mono"
                    style={{ fontSize: "11px", color: active ? "var(--accent)" : "#5a5a60" }}
                  >
                    {index}
                  </span>
                </Link>
              );
            })}

            <div
              className="font-mono"
              style={{
                marginTop: "10px",
                paddingTop: "14px",
                display: "flex",
                gap: "16px",
                fontSize: "11px",
                color: "#9a9aa0",
              }}
            >
              <a
                href="https://instagram.com/devcapu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#9a9aa0", textDecoration: "none" }}
              >
                ↗ instagram
              </a>
              <a
                href="https://youtube.com/@devcapu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#9a9aa0", textDecoration: "none" }}
              >
                ↗ youtube
              </a>
              <a
                href="https://github.com/devcapu"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#9a9aa0", textDecoration: "none" }}
              >
                ↗ github
              </a>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}
