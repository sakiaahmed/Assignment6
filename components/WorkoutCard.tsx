import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import type { Workout } from '@/lib/types';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="card bg-base-200 border border-base-300 hover:border-primary/60 transition-all"
    >
      <figure className="aspect-square overflow-hidden bg-base-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-4">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {workout.muscleGroups.slice(0, 2).map((c) => (
            <span key={c} className="badge badge-primary badge-outline badge-sm">
              {c}
            </span>
          ))}
        </div>
        <h3 className="font-display font-bold text-sm uppercase tracking-wide leading-tight">
          {workout.name}
        </h3>
        <p className="text-xs text-base-content/40 mt-1 truncate">
          {workout.equipment}
        </p>
        <div className="flex items-center gap-3 mt-3 text-xs text-base-content/60">
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
    </Link>
  );
}