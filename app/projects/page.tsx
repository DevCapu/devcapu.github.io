import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = { title: "Projetos" };

export default function ProjectsPage() {
  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "64px 40px 88px" }}>
      {/* Header */}
      <div style={{ marginBottom: "34px" }}>
        <div
          className="font-mono"
          style={{
            fontSize: "11px",
            letterSpacing: "0.18em",
            color: "var(--accent)",
            marginBottom: "12px",
          }}
        >
          04 — PROJETOS
        </div>
        <h1
          className="font-grotesk"
          style={{
            fontWeight: 600,
            fontSize: "42px",
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#f4f4f3",
            margin: "0 0 10px",
          }}
        >
          Projetos
        </h1>
        <p
          className="font-hanken"
          style={{
            fontSize: "16px",
            lineHeight: 1.6,
            color: "#9a9aa0",
            margin: 0,
          }}
        >
          Coisas que construí.
        </p>
      </div>

      <div>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
