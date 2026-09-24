'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Clock,
  Flame,
  Star,
  Eye,
  Check,
  X,
  Loader2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useFitLog } from '@/context/FitLogContext';
import SortDropdown, { type SortKey } from './SortDropdown';
import type { Workout } from '@/lib/types';

type Tab = 'plan' | 'saved';

export default function MyPlanClient() {
  const {
    plan,
    saved,
    removeFromPlan,
    removeFromSaved,
    markDone,
    isDone,
    hydrated,
  } = useFitLog();
  const [tab, setTab] = useState<Tab>('plan');
  const [sort, setSort] = useState<SortKey>('duration');

  if (!hydrated) {
    return (
      <div className="flex flex-col items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-4 text-sm text-base-content/50">Loading workouts…</p>
      </div>
    );
  }

  const list: Workout[] = tab === 'plan' ? plan : saved;
  const sorted = [...list].sort((a, b) => {
    if (sort === 'duration') return a.duration - b.duration;
    if (sort === 'calories') return b.caloriesBurned - a.caloriesBurned;
    return b.rating - a.rating;
  });

  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((s, w) => s + w.duration, 0);
  const totalCalories = plan.reduce((s, w) => s + w.caloriesBurned, 0);

  const handleRemove = (id: number, from: Tab) => {
    if (from === 'plan') removeFromPlan(id);
    else removeFromSaved(id);
    toast.success('Removed');
  };

  const handleDone = (id: number) => {
    if (isDone(id)) {
      toast.error('Already marked done');
      return;
    }
    markDone(id);
    toast.success('Marked as done');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-wide">
          My Plan
        </h1>
        <p className="text-base-content/50 mt-2 text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* DaisyUI stats */}
      <div className="stats stats-vertical sm:stats-horizontal w-full bg-base-200 border border-base-300 mb-8">
        <div className="stat">
          <div className="stat-title text-base-content/50">Exercises</div>
          <div className="stat-value font-display">{totalExercises}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-base-content/50">Minutes</div>
          <div className="stat-value font-display">{totalMinutes}</div>
        </div>
        <div className="stat">
          <div className="stat-title text-base-content/50">Calories</div>
          <div className="stat-value font-display">{totalCalories}</div>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div role="tablist" className="tabs tabs-border">
          <button
            role="tab"
            onClick={() => setTab('plan')}
            className={`tab font-bold uppercase tracking-wide ${
              tab === 'plan' ? 'tab-active text-primary' : ''
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            role="tab"
            onClick={() => setTab('saved')}
            className={`tab font-bold uppercase tracking-wide ${
              tab === 'saved' ? 'tab-active text-primary' : ''
            }`}
          >
            Saved
          </button>
        </div>
        {list.length > 0 && <SortDropdown value={sort} onChange={setSort} />}
      </div>

      {/* List */}
      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-3">
          {sorted.map((w) => (
            <PlanCard
              key={w.id}
              workout={w}
              done={isDone(w.id)}
              onRemove={() => handleRemove(w.id, tab)}
              onDone={() => handleDone(w.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Helper components ---------- */

function PlanCard({
  workout,
  done,
  onRemove,
  onDone,
}: {
  workout: Workout;
  done: boolean;
  onRemove: () => void;
  onDone: () => void;
}) {
  return (
    <div className="card card-side bg-base-200 border border-base-300">
      {/* Image */}
      <figure className="w-24 shrink-0 hidden sm:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Content */}
      <div className="card-body p-4 flex-1">
        {/* TOP ROW: Title on left, action buttons on right */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3
              className={`font-display font-bold uppercase tracking-wide text-sm ${
                done ? 'line-through text-base-content/40' : ''
              }`}
            >
              {workout.name}
            </h3>
            <p className="text-xs text-base-content/40 mt-0.5 truncate">
              {workout.equipment}
            </p>
          </div>

          {/* Action buttons — top right */}
          <div className="flex items-center gap-1 shrink-0">
            <Link
              href={`/workouts/${workout.id}`}
              className="btn btn-ghost btn-xs"
              aria-label="View details"
            >
              <Eye className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={onDone}
              disabled={done}
              className={`btn btn-xs ${
                done ? 'btn-outline btn-primary' : 'btn-ghost'
              }`}
              aria-label={done ? 'Done' : 'Mark as done'}
            >
              <Check className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onRemove}
              className="btn btn-ghost btn-xs text-base-content/50 hover:text-error"
              aria-label="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mt-2 text-xs text-base-content/60">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-primary" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
            {workout.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="hero bg-base-200 border border-dashed border-base-300 rounded-2xl py-16">
      <div className="hero-content text-center flex-col">
        <h3 className="font-display text-2xl uppercase tracking-wide text-base-content/60">
          Nothing here yet
        </h3>
        <p className="text-sm text-base-content/40 max-w-sm">
          Browse the library and add a lift to get today moving.
        </p>
        <Link
          href="/"
          className="btn btn-primary btn-sm mt-4 uppercase tracking-wide"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
}