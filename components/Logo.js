import { Dumbbell } from "lucide-react";

export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-black">
        <Dumbbell size={18} strokeWidth={2.5} />
      </span>
      <span className="font-display text-xl font-bold uppercase tracking-wider">FitLog</span>
    </span>
  );
}
