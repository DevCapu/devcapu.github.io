import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readingTime: string;
  published: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const stats = readingTime(content);
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        tags: (data.tags as string[]) ?? [],
        excerpt: data.excerpt as string,
        readingTime: stats.text,
        published: data.published !== false,
      };
    })
    .filter((post) => post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return {
      slug,
      title: "Placeholder",
      date: "",
      tags: [],
      excerpt: "",
      readingTime: "",
      published: false,
      content: "",
    };
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    tags: (data.tags as string[]) ?? [],
    excerpt: data.excerpt as string,
    readingTime: stats.text,
    published: data.published !== false,
    content: processed.toString(),
  };
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}
