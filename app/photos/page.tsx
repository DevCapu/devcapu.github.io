import type { Metadata } from "next";
import { getPhotosByMonth, getAllPhotos } from "@/lib/photos";
import { PhotoCard } from "@/components/PhotoCard";

export const metadata: Metadata = { title: "Photos" };

export default function PhotosPage() {
  const groups = getPhotosByMonth();
  const total = getAllPhotos().length;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-1">Photos</h1>
      <p className="text-sm text-gray-400 dark:text-gray-600 mb-10">
        {total} entr{total !== 1 ? "ies" : "y"}
      </p>

      <div className="space-y-12">
        {groups.map((group) => (
          <section key={group.label}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-3">
              {group.label}
            </h2>
            <hr className="border-gray-200 dark:border-gray-800 mb-6" />
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
              {group.entries.map((photo) => (
                <PhotoCard key={photo.slug} photo={photo} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
