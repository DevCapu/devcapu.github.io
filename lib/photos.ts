import fs from "fs";
import path from "path";
import matter from "gray-matter";

const photosDirectory = path.join(process.cwd(), "content/photos");

export interface PhotoMeta {
  slug: string;
  title?: string;
  date: string;
  description: string;
  photos: string[];
  location?: string;
  tag?: string;
  published: boolean;
}

export interface PhotoGroup {
  label: string;
  entries: PhotoMeta[];
}

export function getAllPhotos(): PhotoMeta[] {
  const fileNames = fs.readdirSync(photosDirectory);
  return fileNames
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(photosDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title as string | undefined,
        date: data.date as string,
        description: data.description as string,
        photos: (data.photos as string[]) ?? [],
        location: data.location as string | undefined,
        tag: data.tag as string | undefined,
        published: data.published !== false,
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPhotosByMonth(): PhotoGroup[] {
  const photos = getAllPhotos();
  const groups: PhotoGroup[] = [];

  for (const photo of photos) {
    const d = new Date(photo.date + "T12:00:00Z");
    const label = d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
    const existing = groups.find((g) => g.label === label);
    if (existing) {
      existing.entries.push(photo);
    } else {
      groups.push({ label, entries: [photo] });
    }
  }

  return groups;
}
