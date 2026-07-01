import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <article
      style={{
        padding: "32px 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Link href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <h2
          className="font-grotesk"
          style={{
            fontWeight: 600,
            fontSize: "27px",
            letterSpacing: "-0.02em",
            color: "#f4f4f3",
            margin: "0 0 9px",
            lineHeight: 1.15,
          }}
        >
          {post.title}
        </h2>
        <p
          className="font-hanken"
          style={{
            fontSize: "15px",
            lineHeight: 1.65,
            color: "#9a9aa0",
            margin: "0 0 14px",
            maxWidth: "600px",
          }}
        >
          {post.excerpt}
        </p>
        <div
          className="font-mono"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "12px",
            fontSize: "12px",
            color: "#76767c",
          }}
        >
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "10px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--accent)",
                border: "1px solid oklch(0.76 0.20 142 / 0.35)",
                padding: "4px 9px",
                borderRadius: "999px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}
