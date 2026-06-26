import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

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
          03 — TEXTOS
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
          Blog
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
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
