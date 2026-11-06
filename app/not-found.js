import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-display text-8xl font-bold text-accent">404</p>
      <h1 className="font-display text-3xl font-bold uppercase">Page not found</h1>
      <p className="text-muted">That page doesn&apos;t exist or the workout has been removed.</p>
      <Link href="/" className="btn-primary mt-2">Go to workouts</Link>
    </section>
  );
}
