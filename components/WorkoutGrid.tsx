'use client';

import { useMemo, useState } from 'react';
import SortDropdown, { type SortKey } from './SortDropdown';
import WorkoutCard from './WorkoutCard';
import type { Workout } from '@/lib/types';

export default function WorkoutGrid({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState<SortKey>('duration');

  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => {
      if (sort === 'duration') return a.duration - b.duration;
      if (sort === 'calories') return b.caloriesBurned - a.caloriesBurned;
      return b.rating - a.rating;
    });
    return copy;
  }, [workouts, sort]);

  return (
    <section
      id="library"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide">
            The Library
          </h2>
          <p className="text-base-content/50 mt-1 text-sm">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {sorted.map((w) => (
          <WorkoutCard key={w.id} workout={w} />
        ))}
      </div>
    </section>
  );
}