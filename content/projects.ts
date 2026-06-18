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
    name: "Personal Website",
    description:
      "This website — a blog, notes, and portfolio built with Next.js and deployed to GitHub Pages.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/devcapu/devcapu",
    featured: true,
  },
  // Add your Android projects here
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured).slice(0, 3);
}
