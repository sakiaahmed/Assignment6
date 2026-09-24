'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import type { Workout } from '@/lib/types';

interface FitLogState {
  plan: Workout[];
  saved: Workout[];
  done: number[];
  addToPlan: (w: Workout) => boolean;
  saveForLater: (w: Workout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
  isInPlan: (id: number) => boolean;
  isInSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  hydrated: boolean;
}

const FitLogContext = createContext<FitLogState | undefined>(undefined);

export function FitLogProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [done, setDone] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem('fitlog.plan');
      const s = localStorage.getItem('fitlog.saved');
      const d = localStorage.getItem('fitlog.done');
      if (p) setPlan(JSON.parse(p));
      if (s) setSaved(JSON.parse(s));
      if (d) setDone(JSON.parse(d));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('fitlog.plan', JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem('fitlog.saved', JSON.stringify(saved));
  }, [saved, hydrated]);

  useEffect(() => {
    if (hydrated) localStorage.setItem('fitlog.done', JSON.stringify(done));
  }, [done, hydrated]);

  const addToPlan = (w: Workout): boolean => {
    if (plan.length >= 5) return false;
    if (plan.some((x) => x.id === w.id)) return false;
    setPlan((prev) => [...prev, w]);
    return true;
  };

  const saveForLater = (w: Workout) => {
    if (saved.some((x) => x.id === w.id)) return;
    setSaved((prev) => [...prev, w]);
  };

  const removeFromPlan = (id: number) =>
    setPlan((prev) => prev.filter((x) => x.id !== id));

  const removeFromSaved = (id: number) =>
    setSaved((prev) => prev.filter((x) => x.id !== id));

  const markDone = (id: number) =>
    setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const isInPlan = (id: number) => plan.some((x) => x.id === id);
  const isInSaved = (id: number) => saved.some((x) => x.id === id);
  const isDone = (id: number) => done.includes(id);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        done,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
        isInPlan,
        isInSaved,
        isDone,
        hydrated,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) throw new Error('useFitLog must be used inside FitLogProvider');
  return ctx;
}