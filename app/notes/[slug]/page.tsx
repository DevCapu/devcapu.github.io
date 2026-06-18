import Link from "next/link";
import type { Metadata } from "next";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const note = await getNoteBySlug(params.slug);
  return { title: note.title, description: note.description };
}

export default async function NotePage({ params }: Props) {
  const note = await getNoteBySlug(params.slug);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link
        href="/notes"
        className="text-sm text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-8 inline-block"
      >
        ← Notes
      </Link>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
            {note.title}
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-600">
            Last updated {note.lastUpdated}
          </p>
        </header>

        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </article>
    </div>
  );
}
