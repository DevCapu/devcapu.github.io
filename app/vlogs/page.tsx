import type { Metadata } from "next";
import { getAllVlogs } from "@/lib/vlogs";
import { VlogsClient } from "@/components/VlogsClient";

export const metadata: Metadata = { title: "Vlogs" };

export default function VlogsPage() {
  const vlogs = getAllVlogs();
  return <VlogsClient vlogs={vlogs} />;
}
