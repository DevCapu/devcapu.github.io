import type { Metadata } from "next";
import { PageHeader, pageContainerStyle } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Sobre" };

const skills = [
  "Android",
  "Kotlin",
  "Jetpack Compose",
  "Views",
  "MVVM",
  "Firebase",
  "Room",
  "JUnit",
  "Mockk",
];

const sectionLabelStyle: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#5a5a60",
  marginBottom: "16px",
};

const bodyTextStyle: React.CSSProperties = {
  fontSize: "16px",
  lineHeight: 1.7,
  color: "#b4b4b9",
  margin: "0 0 16px",
};

const accentLinkStyle: React.CSSProperties = {
  color: "var(--accent-bright)",
  fontWeight: 600,
  textDecoration: "none",
};

export default function AboutPage() {
  return (
    <div style={pageContainerStyle}>
      <PageHeader
        kicker="05 — SOBRE"
        title="Sobre"
        subtitle="Android Software Engineer based in São Paulo, Brazil."
      />

      <div className="font-hanken" style={{ marginBottom: "48px" }}>
        <p style={bodyTextStyle}>
          Hi! I&apos;m{" "}
          <strong style={{ color: "#f4f4f3" }}>Felipe Moreno Borges</strong>,
          an Android Software Engineer based in São Paulo, Brazil.
        </p>
        <p style={{ ...bodyTextStyle, marginBottom: 0 }}>
          I work as an Android Engineer at{" "}
          <a
            href="https://www.zup.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={accentLinkStyle}
          >
            Zup Innovation
          </a>
          , building mobile experiences with Kotlin and Jetpack Compose.
        </p>
      </div>

      <section style={{ marginBottom: "48px" }}>
        <h2 className="font-mono" style={sectionLabelStyle}>
          Technologies
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "9px" }}>
          {skills.map((skill) => (
            <span
              key={skill}
              className="font-mono"
              style={{
                fontSize: "12px",
                padding: "7px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#9a9aa0",
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-mono" style={sectionLabelStyle}>
          Get in Touch
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <a
            href="mailto:felipe.b2014@gmail.com"
            className="font-mono"
            style={{ fontSize: "12px", color: "#9a9aa0", textDecoration: "none", width: "fit-content" }}
          >
            ↗ felipe.b2014@gmail.com
          </a>
          <a
            href="https://github.com/devcapu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{ fontSize: "12px", color: "#9a9aa0", textDecoration: "none", width: "fit-content" }}
          >
            ↗ github.com/devcapu
          </a>
          <a
            href="https://linkedin.com/in/devcapu"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono"
            style={{ fontSize: "12px", color: "#9a9aa0", textDecoration: "none", width: "fit-content" }}
          >
            ↗ linkedin.com/in/devcapu
          </a>
        </div>
      </section>
    </div>
  );
}
