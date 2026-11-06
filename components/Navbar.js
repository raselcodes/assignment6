"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useApp } from "./Providers";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useApp();
  const workoutActive = pathname === "/" || pathname.startsWith("/workout");
  const planActive = pathname.startsWith("/my-plan");

  const linkCls = (active) =>
    `rounded-md px-3 py-2 font-display text-sm font-medium uppercase tracking-wider transition ${
      active ? "bg-accent/15 text-accent" : "text-muted hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="FitLog home"><Logo /></Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/" className={linkCls(workoutActive)} aria-current={workoutActive ? "page" : undefined}>Workout</Link>
          <Link href="/my-plan" className={linkCls(planActive)} aria-current={planActive ? "page" : undefined}>My Plan</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/my-plan" className="rounded-full bg-accent px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-black" aria-label={`Plan, ${plan.length} items`}>
            Plan <span className="ml-1">{plan.length}</span>
          </Link>
          <Link href="/my-plan" className="rounded-full border border-line px-3 py-1 font-display text-xs font-semibold uppercase tracking-wider text-white hover:border-accent" aria-label={`Saved, ${saved.length} items`}>
            Saved <span className="ml-1">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
