export default function Spinner({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24" role="status">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-accent" />
      <p className="font-display text-sm uppercase tracking-widest text-muted">{label}</p>
    </div>
  );
}
