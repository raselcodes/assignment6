"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X, Search } from "lucide-react";
import { useApp, PLAN_CAP } from "@/components/Providers";
import Stats from "@/components/Stats";
import Spinner from "@/components/Spinner";

export default function MyPlan() {
  const { plan, saved, ready, isDone, removeFromPlan, removeFromSaved, markDone, addToPlan, planFull } = useApp();
  const [tab, setTab] = useState("plan");
  const [query, setQuery] = useState("");

  const minutes = plan.reduce((s, w) => s + w.duration, 0);
  const calories = plan.reduce((s, w) => s + w.caloriesBurned, 0);

  const source = tab === "plan" ? plan : saved;
  const q = query.trim().toLowerCase();
  const items = source.filter((w) => !q || w.name.toLowerCase().includes(q) || w.muscleGroups.some((m) => m.toLowerCase().includes(q)));

  const metrics = [
    ["Exercises", plan.length],
    ["Minutes", minutes],
    ["Calories", calories],
  ];

  const tabCls = (active) =>
    `flex-1 rounded-md px-4 py-2.5 font-display text-sm font-semibold uppercase tracking-wider transition sm:flex-none ${
      active ? "bg-accent text-black" : "text-muted hover:text-white"
    }`;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-5xl font-bold uppercase">My Plan</h1>
      <p className="mt-2 text-muted">Cap of five lifts for today. Finish them, then load more.</p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-panel p-4 text-center">
            <p className="font-display text-3xl font-bold text-accent sm:text-4xl">{value}</p>
            <p className="mt-1 font-display text-xs uppercase tracking-widest text-muted">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-1 rounded-lg border border-line bg-panel p-1" role="tablist">
          <button role="tab" aria-selected={tab === "plan"} className={tabCls(tab === "plan")} onClick={() => setTab("plan")}>
            Today&apos;s Plan ({plan.length}/{PLAN_CAP})
          </button>
          <button role="tab" aria-selected={tab === "saved"} className={tabCls(tab === "saved")} onClick={() => setTab("saved")}>
            Saved ({saved.length})
          </button>
        </div>
        <label className="relative">
          <span className="sr-only">Search my workouts</span>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or tag"
            className="w-full rounded-md border border-line bg-panel py-2.5 pl-9 pr-3 text-sm outline-none focus:border-accent sm:w-56"
          />
        </label>
      </div>

      <div className="mt-6">
        {!ready ? (
          <Spinner />
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-line px-4 py-16 text-center">
            <h2 className="font-display text-3xl font-bold uppercase">Nothing here yet</h2>
            <p className="text-muted">Browse the library and add a lift to get today moving.</p>
            <Link href="/" className="btn-primary mt-2">Go to workouts</Link>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {items.map((w) => {
              const finished = tab === "plan" && isDone(w.id);
              return (
                <li key={w.id} className={`flex flex-col gap-4 rounded-lg border border-line bg-panel p-4 sm:flex-row sm:items-center ${finished ? "opacity-70" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.image} alt={w.name} className="h-40 w-full rounded-md object-cover sm:h-24 sm:w-32" />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <h3 className={`font-display text-xl font-semibold uppercase ${finished ? "line-through" : ""}`}>{w.name}</h3>
                    <p className="text-sm text-muted">{w.equipment}</p>
                    <Stats w={w} />
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/workout/${w.id}`} className="btn-outline !px-3 !py-2 !text-xs">View Details</Link>
                    {tab === "plan" ? (
                      <button className="btn-primary !px-3 !py-2 !text-xs" onClick={() => markDone(w)} disabled={finished}>
                        <Check size={14} /> {finished ? "Done" : "Mark as Done"}
                      </button>
                    ) : (
                      <button className="btn-primary !px-3 !py-2 !text-xs" onClick={() => addToPlan(w)} disabled={planFull}>
                        Add to plan
                      </button>
                    )}
                    <button
                      aria-label={`Remove ${w.name}`}
                      className="rounded-md border border-line p-2 text-muted transition hover:border-red-500 hover:text-red-500"
                      onClick={() => (tab === "plan" ? removeFromPlan(w) : removeFromSaved(w))}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
