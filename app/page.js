"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Search } from "lucide-react";
import { fetchWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import Spinner from "@/components/Spinner";

const SORTS = {
  Duration: (a, b) => a.duration - b.duration,
  Calories: (a, b) => b.caloriesBurned - a.caloriesBurned,
  Rating: (a, b) => b.rating - a.rating,
};

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("Duration");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetchWorkouts()
      .then((d) => !cancelled && setWorkouts(d))
      .catch(() => !cancelled && setError("Couldn't load workouts. Check your connection and reload."))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workouts
      .filter((w) => !q || w.name.toLowerCase().includes(q) || w.muscleGroups.some((m) => m.toLowerCase().includes(q)))
      .sort(SORTS[sortBy]);
  }, [workouts, sortBy, query]);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
        <div className="flex flex-col items-start gap-6">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-accent">Workout Library</p>
          <h1 className="font-display text-5xl font-bold uppercase leading-[1.05] sm:text-6xl lg:text-7xl">
            Train with intent. Log every set.
          </h1>
          <p className="max-w-lg text-lg text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a href="#library" className="btn-primary">Browse workouts <ArrowRight size={18} /></a>
        </div>
        <div className="overflow-hidden rounded-xl border border-line bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/hero.jpg" alt="Anatomical figure working a seated curl machine" className="mx-auto aspect-square w-full max-w-xl object-cover" />
        </div>
      </section>

      {/* Library */}
      <section id="library" className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl font-bold uppercase">The Library</h2>
            <p className="mt-1 text-muted">Twelve lifts covering every major muscle group.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Search workouts</span>
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or muscle"
                className="w-full rounded-md border border-line bg-panel py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent sm:w-64"
              />
            </label>
            <label className="relative flex items-center">
              <span className="sr-only">Sort by</span>
              <span className="pointer-events-none absolute left-3 font-display text-xs uppercase tracking-wider text-muted">Sort by</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none rounded-md border border-line bg-panel py-2.5 pl-20 pr-9 text-sm outline-none focus:border-accent"
              >
                {Object.keys(SORTS).map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3 text-muted" />
            </label>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="py-20 text-center text-muted">{error}</p>
        ) : list.length === 0 ? (
          <p className="py-20 text-center text-muted">No workouts match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => <WorkoutCard key={w.id} w={w} />)}
          </div>
        )}
      </section>
    </>
  );
}
