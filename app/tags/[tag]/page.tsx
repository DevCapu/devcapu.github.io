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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="text-sm text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
      >
        ← Blog
      </Link>
      <h1 className="text-2xl font-bold mb-1">#{params.tag}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-600 mb-10">
        {posts.length} post{posts.length !== 1 ? "s" : ""}
      </p>
      <div className="space-y-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
