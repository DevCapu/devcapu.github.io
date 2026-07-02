import type { Metadata } from "next";
import { getAllNotes } from "@/lib/notes";
import { NoteCard } from "@/components/NoteCard";
import { PageHeader, pageContainerStyle } from "@/components/PageHeader";

export const metadata: Metadata = { title: "Notes" };

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div style={pageContainerStyle}>
      <PageHeader kicker="NOTES" title="Notes" subtitle="Topics I'm actively studying." />

      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <NoteCard key={note.slug} note={note} />
        ))}
      </div>
    </div>
  );
}
