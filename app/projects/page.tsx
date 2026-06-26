import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div style={{ padding: "36px 30px 60px", maxWidth: "780px" }}>
      {/* Header */}
      <div style={{ marginBottom: "22px" }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "9px",
            letterSpacing: "0.22em",
            color: "oklch(0.78 0.14 55)",
            marginBottom: "8px",
          }}
        >
          04 — PROJETOS
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
          Projects
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
          Things I&apos;ve built.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
