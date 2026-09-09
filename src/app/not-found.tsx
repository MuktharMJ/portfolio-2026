import Link from "next/link";

export default function NotFound() {
  return (
    <main id="content" className="shell flex min-h-svh flex-col justify-center py-24">
      <p className="mono-label text-signal">404 &mdash; SIGNAL LOST</p>
      <h1 className="mt-6 font-display text-display-l font-medium text-ink">
        This room doesn&apos;t exist.
        <br />
        <span className="text-ink-35">Yet.</span>
      </h1>
      <Link
        href="/"
        className="mono-label mt-10 inline-flex w-fit border border-line px-6 py-3 transition-colors hover:border-signal hover:text-signal"
      >
        BACK TO THE BENCH
      </Link>
    </main>
  );
}
