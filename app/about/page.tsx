import type { Metadata } from "next";

export const metadata: Metadata = { title: "About" };

const skills = [
  "Android",
  "Kotlin",
  "Jetpack Compose",
  "Views",
  "MVVM",
  "Firebase",
  "Room",
  "JUnit",
  "Mockk",
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">About</h1>

      <div className="prose prose-gray dark:prose-invert max-w-none mb-12">
        <p>
          Hi! I&apos;m <strong>Felipe Moreno Borges</strong>, an Android
          Software Engineer based in São Paulo, Brazil.
        </p>
        <p>
          I work as an Android Engineer at{" "}
          <a
            href="https://www.zup.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zup Innovation
          </a>
          , building mobile experiences with Kotlin and Jetpack Compose.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-4">
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-600 mb-4">
          Get in Touch
        </h2>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:felipe.b2014@gmail.com"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-fit"
          >
            felipe.b2014@gmail.com
          </a>
          <a
            href="https://github.com/devcapu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-fit"
          >
            github.com/devcapu
          </a>
          <a
            href="https://linkedin.com/in/devcapu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-fit"
          >
            linkedin.com/in/devcapu
          </a>
        </div>
      </section>
    </div>
  );
}
