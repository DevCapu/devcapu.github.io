"use client";

import { useState } from "react";
import type { PhotoMeta } from "@/lib/photos";
import { Lightbox } from "@/components/Lightbox";
import { photoUrl } from "@/lib/media";

export function PhotoCard({ photo }: { photo: PhotoMeta }) {
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);

  return (
    <>
      {selectedSrc && (
        <Lightbox
          src={selectedSrc}
          alt={photo.description}
          onClose={() => setSelectedSrc(null)}
        />
      )}
      <article className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
        <div className={`grid ${photo.photos.length > 1 ? "grid-cols-2 gap-0.5" : "grid-cols-1"}`}>
          {photo.photos.map((src) => (
            <button
              key={src}
              className="w-full h-full block cursor-zoom-in"
              onClick={() => setSelectedSrc(photoUrl(src))}
              aria-label="Ver imagem maior"
              type="button"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl(src)}
                alt={photo.description}
                loading="lazy"
                className="w-full h-full object-cover aspect-square sm:aspect-auto"
              />
            </button>
          ))}
        </div>
        <div className="p-3">
          {photo.title && (
            <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1 text-sm">
              {photo.title}
            </p>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {photo.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-400 dark:text-gray-600">
              {photo.date}
            </span>
            {photo.location && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {photo.location}
              </span>
            )}
          </div>
        </div>
      </article>
    </>
  );
}
