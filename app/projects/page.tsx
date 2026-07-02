import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHeader, pageContainerStyle } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Projetos" };

export default function ProjectsPage() {
  return (
    <div style={pageContainerStyle}>
      <PageHeader kicker="04 — PROJETOS" title="Projetos" subtitle="Coisas que construí." />

      <div>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
