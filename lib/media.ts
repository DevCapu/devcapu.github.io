const BASE = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "";

export function photoUrl(src: string): string {
  if (/^https?:\/\//.test(src)) return src;
  const key = src.replace(/^\/?(photos\/)?/, "");
  if (!BASE) return `/photos/${key}`;
  return `${BASE}/${key}`;
}

// --- Cloudflare Stream ---------------------------------------------------
// O "customer code" fica no dashboard do Stream (parte do domínio
// customer-<CODE>.cloudflarestream.com). Como é público (vai no embed),
// expomos via NEXT_PUBLIC_ e ele é embutido no bundle em build time.
const STREAM_CODE = process.env.NEXT_PUBLIC_STREAM_CUSTOMER_CODE ?? "";

export function streamConfigured(): boolean {
  return STREAM_CODE.length > 0;
}

function streamBase(uid: string): string {
  return `https://customer-${STREAM_CODE}.cloudflarestream.com/${uid}`;
}

/** Thumbnail gerada automaticamente pelo Stream. */
export function streamThumbnailUrl(uid: string, height = 720): string {
  return `${streamBase(uid)}/thumbnails/thumbnail.jpg?time=1s&height=${height}`;
}

/** URL do player embutido (iframe) do Stream. */
export function streamIframeUrl(uid: string): string {
  return `${streamBase(uid)}/iframe`;
}
