import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { BackLink, pageContainerStyle, pageTitleStyle } from "@/components/PageHeader";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return [{ slug: "dummy" }];
  }
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return (
    <div style={pageContainerStyle}>
      <BackLink href="/blog">← textos</BackLink>

      <article>
        <header style={{ marginBottom: "34px" }}>
          <h1 className="font-grotesk" style={pageTitleStyle}>
            {post.title}
          </h1>
          <div
            className="font-mono"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "12px",
              color: "#76767c",
              marginBottom: post.tags.length > 0 ? "16px" : 0,
            }}
          >
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          {post.tags.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    border: "1px solid oklch(0.76 0.20 142 / 0.35)",
                    padding: "4px 9px",
                    borderRadius: "999px",
                    textDecoration: "none",
                  }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose prose-invert max-w-none font-hanken"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
