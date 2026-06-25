import type { PhotoMeta } from "@/lib/photos";

export function PhotoCard({ photo }: { photo: PhotoMeta }) {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
      {photo.photos.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={photo.description}
          className="w-full object-cover"
        />
      ))}
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
  );
}
