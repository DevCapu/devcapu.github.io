import fs from "fs";
import path from "path";
import matter from "gray-matter";

const DIR = path.join(process.cwd(), "content/vlogs");

export type VlogType = "vlog" | "short" | "tutorial";

export interface VlogMeta {
  id: string;
  type: VlogType;
  title: string;
  description?: string;
  date: string;
  duration: string;
  streamId?: string;
  bg: string;
}

function bgFromSlug(slug: string): string {
  const h = [...slug].reduce((acc, c) => ((acc * 31) + c.charCodeAt(0)) >>> 0, 0);
  const angle = 130 + (h % 50);
  const r = 0x13 + (h % 6);
  const g = 0x14 + ((h >> 4) % 6);
  const b = 0x16 + ((h >> 8) % 6);
  const c1 = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
  const c2 = `#${(r - 8).toString(16).padStart(2, "0")}${(g - 8).toString(16).padStart(2, "0")}${(b - 8).toString(16).padStart(2, "0")}`;
  return `repeating-linear-gradient(${angle}deg,${c1},${c1} 12px,${c2} 12px,${c2} 24px)`;
}

export function getAllVlogs(): VlogMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const id = filename.replace(/\.md$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(DIR, filename), "utf8")
      );
      if (data.published === false) return null;
      return {
        id,
        type: data.type as VlogType,
        title: data.title as string,
        description: content.trim() || undefined,
        date: data.date as string,
        duration: data.duration as string,
        streamId: (data.streamId as string) || undefined,
        bg: (data.bg as string) || bgFromSlug(id),
      } satisfies VlogMeta;
    })
    .filter(Boolean)
    .sort((a, b) => (a!.date < b!.date ? 1 : -1)) as VlogMeta[];
}
