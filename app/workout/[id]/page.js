"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, BookmarkCheck, Plus, Check } from "lucide-react";
import { fetchWorkout } from "@/lib/api";
import { useApp, PLAN_CAP } from "@/components/Providers";
import Spinner from "@/components/Spinner";
import NotFound from "@/app/not-found";

export default function WorkoutDetail() {
  const { id } = useParams();
  const [w, setW] = useState(null);
  const [state, setState] = useState("loading"); // loading | ready | missing
  const { addToPlan, saveForLater, inPlan, inSaved, planFull } = useApp();

  useEffect(() => {
    let cancelled = false;
    setState("loading");
    fetchWorkout(id)
      .then((d) => {
        if (cancelled) return;
        if (!d || !d.id || d.error) setState("missing");
        else { setW(d); setState("ready"); }
      })
      .catch(() => !cancelled && setState("missing"));
    return () => { cancelled = true; };
  }, [id]);

  if (state === "loading") return <Spinner label="Loading workout…" />;
  if (state === "missing") return <NotFound />;

  const added = inPlan(w.id);
  const saved = inSaved(w.id);
  const blocked = !added && planFull;

  const specs = [
    ["Equipment", w.equipment],
    ["Difficulty", w.difficulty],
    ["Sets", w.sets],
    ["Reps", w.reps],
    ["Duration", `${w.duration} min`],
    ["Calories", `${w.caloriesBurned} kcal`],
    ["Rating", w.rating],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
        <ArrowLeft size={16} /> Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-line bg-panel2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={w.image} alt={w.name} className="h-full max-h-[640px] w-full object-cover" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-4xl font-bold uppercase leading-tight sm:text-5xl">{w.name}</h1>
            <p className="text-muted">{w.description}</p>
            <div className="flex flex-wrap gap-2">
              {w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-panel">
            <h2 className="border-b border-line px-4 py-3 font-display text-sm uppercase tracking-widest text-accent">Key specs</h2>
            <dl>
              {specs.map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-line px-4 py-2.5 text-sm last:border-b-0">
                  <dt className="font-display uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h2 className="mb-3 font-display text-sm uppercase tracking-widest text-accent">Instructions</h2>
            <ol className="flex flex-col gap-3">
              {w.instructions.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xs font-bold text-black">{i + 1}</span>
                  <span className="pt-0.5 text-[#d6d6d6]">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="btn-primary flex-1" onClick={() => addToPlan(w)} disabled={added || blocked}>
              {added ? <Check size={18} /> : <Plus size={18} />}
              {added ? "In today's plan" : blocked ? `Plan full (${PLAN_CAP}/${PLAN_CAP})` : "Add to today's plan"}
            </button>
            <button className="btn-outline flex-1" onClick={() => saveForLater(w)} disabled={saved}>
              {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
