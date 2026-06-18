import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const notesDirectory = path.join(process.cwd(), "content/notes");

export interface NoteMeta {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
}

export interface Note extends NoteMeta {
  content: string;
}

export function getAllNotes(): NoteMeta[] {
  const fileNames = fs.readdirSync(notesDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(notesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        lastUpdated: data.lastUpdated as string,
      };
    })
    .sort((a, b) => (a.lastUpdated < b.lastUpdated ? 1 : -1));
}

export async function getNoteBySlug(slug: string): Promise<Note> {
  const fullPath = path.join(notesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    lastUpdated: data.lastUpdated as string,
    content: processed.toString(),
  };
}
