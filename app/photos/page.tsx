import type { Metadata } from "next";
import { getAllPhotos } from "@/lib/photos";
import { GaleriaClient } from "@/components/GaleriaClient";

export const metadata: Metadata = { title: "Galeria" };

export default function PhotosPage() {
  const photos = getAllPhotos();
  return <GaleriaClient photos={photos} />;
}
