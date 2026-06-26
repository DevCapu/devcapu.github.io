export interface Project {
  name: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    name: "Rangão",
    description:
      "Um site de gerenciamento de dieta, baseado nos alimentos que a pessoa tem em casa",
    tech: ["PHP", "Laravel"],
    githubUrl: "https://github.com/devcapu/rangao",
    featured: true,
  },
  // Add your Android projects here
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}
