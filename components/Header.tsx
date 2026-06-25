import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/notes", label: "Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/photos", label: "Photos" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
        >
          Felipe Moreno
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
