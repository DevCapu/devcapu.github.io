const BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "";

export function photoUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  const key = src.replace(/^\/?(photos\/)?/, "");
  if (!BASE) return `/photos/${key}`;
  return `${BASE}/${key}`;
}
