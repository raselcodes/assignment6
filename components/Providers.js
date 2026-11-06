"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CheckCircle2, Info } from "lucide-react";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:v1";
const AppContext = createContext(null);

export function useApp() {
  return useContext(AppContext);
}

export default function Providers({ children }) {
  // plan / saved hold full workout objects so My Plan needs no refetch for metrics
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]); // ids marked as done
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlan(data.plan || []);
        setSaved(data.saved || []);
        setDone(data.done || []);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    } catch {}
  }, [plan, saved, done, ready]);

  const toast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  const inPlan = useCallback((id) => plan.some((w) => w.id === id), [plan]);
  const inSaved = useCallback((id) => saved.some((w) => w.id === id), [saved]);
  const isDone = useCallback((id) => done.includes(id), [done]);
  const planFull = plan.length >= PLAN_CAP;

  const addToPlan = useCallback(
    (w) => {
      if (plan.some((x) => x.id === w.id)) return toast(`${w.name} is already in today's plan`, "info");
      if (plan.length >= PLAN_CAP) return toast(`Today's plan is full (${PLAN_CAP} lifts)`, "info");
      setPlan([...plan, w]);
      toast(`${w.name} added to today's plan`);
    },
    [plan, toast]
  );

  const saveForLater = useCallback(
    (w) => {
      if (saved.some((x) => x.id === w.id)) return toast(`${w.name} is already saved`, "info");
      setSaved([...saved, w]);
      toast(`${w.name} saved for later`);
    },
    [saved, toast]
  );

  const removeFromPlan = useCallback(
    (w) => {
      setPlan((p) => p.filter((x) => x.id !== w.id));
      setDone((d) => d.filter((id) => id !== w.id));
      toast(`${w.name} removed from today's plan`);
    },
    [toast]
  );

  const removeFromSaved = useCallback(
    (w) => {
      setSaved((s) => s.filter((x) => x.id !== w.id));
      toast(`${w.name} removed from saved`);
    },
    [toast]
  );

  const markDone = useCallback(
    (w) => {
      if (done.includes(w.id)) return toast(`${w.name} is already done`, "info");
      setDone([...done, w.id]);
      toast(`${w.name} marked as done`);
    },
    [done, toast]
  );

  const value = useMemo(
    () => ({
      plan, saved, ready, planFull,
      inPlan, inSaved, isDone,
      addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone,
    }),
    [plan, saved, ready, planFull, inPlan, inSaved, isDone, addToPlan, saveForLater, removeFromPlan, removeFromSaved, markDone]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2 px-4" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="toast-in pointer-events-auto flex items-center gap-2 rounded-md border border-line bg-panel2 px-4 py-3 text-sm shadow-lg">
            {t.type === "info" ? <Info size={16} className="text-muted" /> : <CheckCircle2 size={16} className="text-accent" />}
            {t.message}
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}
