import type { Metadata } from "next";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { BackLink, pageContainerStyle, pageTitleStyle } from "@/components/PageHeader";

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
    <div style={pageContainerStyle}>
      <BackLink href="/blog">← textos</BackLink>

      {/* Header */}
      <div style={{ marginBottom: "34px" }}>
        <h1 className="font-grotesk" style={pageTitleStyle}>
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
