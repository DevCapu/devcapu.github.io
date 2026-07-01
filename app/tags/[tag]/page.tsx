import Link from "next/link";
import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

interface Props {
  params: { tag: string };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  if (tags.length === 0) {
    return [{ tag: "dummy" }];
  }
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: `#${params.tag}` };
}

export default function TagPage({ params }: Props) {
  const posts = getPostsByTag(params.tag);

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "64px 40px 88px" }}>
      <Link
        href="/blog"
        className="font-mono"
        style={{
          fontSize: "11px",
          color: "#9a9aa0",
          textDecoration: "none",
          marginBottom: "32px",
          display: "inline-block",
        }}
      >
        ← textos
      </Link>

      {/* Header */}
      <div style={{ marginBottom: "34px" }}>
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
          #{params.tag}
        </h1>
        <p
          className="font-mono"
          style={{ fontSize: "12px", color: "#76767c", margin: 0 }}
        >
          {posts.length} post{posts.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
