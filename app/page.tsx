import { getAllPosts } from "@/lib/posts";
import { getAllPhotos } from "@/lib/photos";
import { getFeaturedProjects } from "@/content/projects";
import { Timeline } from "@/components/Timeline";

export default function Home() {
  const posts = getAllPosts();
  const photos = getAllPhotos();
  const projects = getFeaturedProjects();

  return <Timeline posts={posts} photos={photos} projects={projects} />;
}
