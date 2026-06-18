import type { Metadata } from "next";
import { getAllNotes } from "@/lib/notes";
import { NoteCard } from "@/components/NoteCard";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-2">Notes</h1>
      <p className="text-sm text-gray-400 dark:text-gray-600 mb-8">
        Topics I&apos;m actively studying.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  );
}
