import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getFeaturedProjects } from "@/content/projects";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);
  const featuredProjects = getFeaturedProjects();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <section className="mb-20">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Hi, I&apos;m{" "}
          <span className="text-blue-600 dark:text-blue-400">Felipe</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
          Android Software Engineer. I build android apps and write about what
          I learn along the way.
        </p>
        <div className="flex gap-5 text-sm">
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read my blog →
          </Link>
          <Link
            href="/about"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            About me
          </Link>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
              Recent Posts
            </h2>
            <Link
              href="/blog"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              All posts →
            </Link>
          </div>
          <div className="space-y-8">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {featuredProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600">
              Projects
            </h2>
            <Link
              href="/projects"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              All projects →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
