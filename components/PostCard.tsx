import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors mb-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-2 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-500 dark:text-gray-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
