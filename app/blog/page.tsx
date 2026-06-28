import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { TextosClient } from "@/components/TextosClient";

export const metadata: Metadata = { title: "Textos" };

export default function BlogPage() {
  const posts = getAllPosts();
  return <TextosClient posts={posts} />;
}
