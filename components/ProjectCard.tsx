import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.githubUrl ?? project.demoUrl ?? "#";

  return (
    <article
      style={{
        padding: "38px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
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
        {project.name}
      </h2>
      <a
        href={href}
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
            app
          </span>
        </div>
        <div style={{ flex: 1 }}>
          <div
            className="font-mono"
            style={{
              fontSize: "10px",
              letterSpacing: "0.1em",
              color: "var(--accent)",
              marginBottom: "4px",
            }}
          >
            {project.tech.join(" · ").toUpperCase()}
          </div>
          <div
            className="font-hanken"
            style={{ fontSize: "14px", lineHeight: 1.5, color: "#9a9aa0" }}
          >
            {project.description}
          </div>
        </div>
        <span
          className="font-mono"
          style={{ fontSize: "18px", color: "#76767c" }}
        >
          ↗
        </span>
      </a>
    </article>
  );
}
