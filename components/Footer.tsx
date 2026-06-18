export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-gray-400 dark:text-gray-600 text-center">
        © {new Date().getFullYear()} Felipe Moreno Borges. Built with Next.js.
      </div>
    </footer>
  );
}
