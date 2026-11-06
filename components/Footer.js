import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-panel">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:px-6 md:flex-row md:text-left">
        <Logo />
        <p className="text-sm text-muted">© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
