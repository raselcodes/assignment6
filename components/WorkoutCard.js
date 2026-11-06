import Link from "next/link";
import Stats from "./Stats";

export default function WorkoutCard({ w }) {
  return (
    <Link href={`/workout/${w.id}`} className="group flex flex-col overflow-hidden rounded-lg border border-line bg-panel transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
      <div className="aspect-[4/3] overflow-hidden bg-panel2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={w.image} alt={w.name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {w.muscleGroups.map((m) => <span key={m} className="tag">{m}</span>)}
        </div>
        <h3 className="font-display text-xl font-semibold uppercase tracking-wide">{w.name}</h3>
        <p className="text-sm text-muted">{w.equipment}</p>
        <div className="mt-auto border-t border-line pt-3"><Stats w={w} /></div>
      </div>
    </Link>
  );
}
