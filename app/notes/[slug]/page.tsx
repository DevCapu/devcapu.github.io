import Link from "next/link";
import type { Metadata } from "next";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  if (notes.length === 0) {
    return [{ slug: "dummy" }];
  }
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNoteBySlug(params.slug);
  return { title: note.title, description: note.description };
}

export default async function NotePage({ params }: Props) {
  const note = await getNoteBySlug(params.slug);

  return (
    <div style={{ maxWidth: "820px", margin: "0 auto", padding: "64px 40px 88px" }}>
      <Link
        href="/notes"
        className="font-mono"
        style={{
          fontSize: "11px",
          color: "#9a9aa0",
          textDecoration: "none",
          marginBottom: "32px",
          display: "inline-block",
        }}
      >
        ← notes
      </Link>

      <article>
        <header style={{ marginBottom: "34px" }}>
          <h1
            className="font-grotesk"
            style={{
              fontWeight: 600,
              fontSize: "36px",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#f4f4f3",
              margin: "0 0 14px",
            }}
          >
            {note.title}
          </h1>
          <p
            className="font-mono"
            style={{ fontSize: "12px", color: "#76767c", margin: 0 }}
          >
            Last updated {note.lastUpdated}
          </p>
        </header>

        <div
          className="prose prose-invert max-w-none font-hanken"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </article>
    </div>
  );
}
