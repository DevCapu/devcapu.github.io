import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";

export function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <Link href={`/notes/${note.slug}`} style={{ textDecoration: "none" }}>
      <article
        style={{
          height: "100%",
          padding: "18px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "14px",
          background: "#111113",
        }}
      >
        <h3
          className="font-grotesk"
          style={{
            fontWeight: 600,
            fontSize: "18px",
            letterSpacing: "-0.02em",
            color: "#f4f4f3",
            margin: "0 0 6px",
          }}
        >
          {note.title}
        </h3>
        <p
          className="font-hanken"
          style={{
            fontSize: "14px",
            lineHeight: 1.5,
            color: "#9a9aa0",
            margin: "0 0 14px",
          }}
        >
          {note.description}
        </p>
        <p
          className="font-mono"
          style={{ fontSize: "12px", color: "#76767c", margin: 0 }}
        >
          Updated {note.lastUpdated}
        </p>
      </article>
    </Link>
  );
}
