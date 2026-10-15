import Link from "next/link";

export const metadata = {
  title: "Asharaf | Portfolio",
  description: "Asharaf - Frontend Developer Portfolio",
};

export default function AsharafPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-4">
        <h1 className="text-5xl font-bold">Hi, I’m Asharaf</h1>

        <p className="text-lg opacity-70">
          Frontend Developer • React • Next.js • Three.js
        </p>

        <p className="text-base opacity-60">
          I build modern, fast and responsive web apps with clean UI and smooth
          animations.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Link
            href="/#projects"
            className="px-6 py-3 rounded-xl bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
          >
            View Projects
          </Link>

          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-[var(--border-color)] hover:bg-[var(--card-bg)]"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
