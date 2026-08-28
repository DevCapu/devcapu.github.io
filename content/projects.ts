import projectsData from "./projects.json";

export interface Project {
  name: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export const projects: Project[] = projectsData as Project[];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}
