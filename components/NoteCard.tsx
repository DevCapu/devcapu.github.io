import Link from "next/link";
import type { NoteMeta } from "@/lib/notes";

export function NoteCard({ note }: { note: NoteMeta }) {
  return (
    <Link href={`/notes/${note.slug}`} className="group block">
      <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-5 h-full hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors">
          {note.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-500 mb-3 leading-relaxed">
          {note.description}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Updated {note.lastUpdated}
        </p>
      </article>
    </Link>
  );
}
