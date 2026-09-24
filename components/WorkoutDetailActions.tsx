'use client';

import { Plus, Bookmark, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFitLog } from '@/context/FitLogContext';
import type { Workout } from '@/lib/types';

export default function WorkoutDetailActions({
  workout,
}: {
  workout: Workout;
}) {
  const { addToPlan, saveForLater, isInPlan, isInSaved, plan, hydrated } =
    useFitLog();

  const inPlan = isInPlan(workout.id);
  const inSaved = isInSaved(workout.id);
  const planFull = plan.length >= 5;

  if (!hydrated) {
    return (
      <div className="flex items-center gap-3 text-base-content/40 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" /> Loading…
      </div>
    );
  }

  const handleAdd = () => {
    if (inPlan) {
      toast.error('Already in your plan');
      return;
    }
    if (planFull) {
      toast.error('Plan is full (max 5 lifts)');
      return;
    }
    addToPlan(workout);
    toast.success("Added to today's plan");
  };

  const handleSave = () => {
    if (inSaved) {
      toast.error('Already saved');
      return;
    }
    saveForLater(workout);
    toast.success('Saved for later');
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAdd}
        className={`btn flex-1 font-bold uppercase tracking-wide ${
          inPlan
            ? 'btn-outline btn-primary'
            : planFull
            ? 'btn-disabled'
            : 'btn-primary'
        }`}
      >
        {inPlan ? (
          <Check className="w-4 h-4" />
        ) : (
          <Plus className="w-4 h-4" />
        )}
        {inPlan
          ? 'Already in Plan'
          : planFull
          ? 'Plan Full'
          : "Add to Today's Plan"}
      </button>

      <button
        onClick={handleSave}
        className={`btn flex-1 font-bold uppercase tracking-wide ${
          inSaved ? 'btn-outline btn-primary' : 'btn-outline'
        }`}
      >
        {inSaved ? (
          <Check className="w-4 h-4" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
        {inSaved ? 'Already Saved' : 'Save for Later'}
      </button>
    </div>
  );
}