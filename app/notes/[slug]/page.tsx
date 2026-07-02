import type { Metadata } from "next";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import { BackLink, pageContainerStyle, pageTitleStyle } from "@/components/PageHeader";

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
    <div style={pageContainerStyle}>
      <BackLink href="/notes">← notes</BackLink>

      <article>
        <header style={{ marginBottom: "34px" }}>
          <h1 className="font-grotesk" style={pageTitleStyle}>
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
