import { features } from "@/lib/features";

export const navLinks = [
  { href: "/", label: "Início", index: "00" },
  { href: "/photos", label: "Galeria", index: "01" },
  { href: "/vlogs", label: "Vlogs", index: "02" },
  { href: "/blog", label: "Textos", index: "03" },
  { href: "/projects", label: "Projetos", index: "04" },
  { href: "/about", label: "Sobre", index: "05" },
].filter((link) => link.href !== "/vlogs" || features.vlogs);
