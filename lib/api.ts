import type { Workout } from './types';

const API_BASE = 'https://api.abcz.workers.dev/api/fitlog';

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch workouts');
  return (await res.json()) as Workout[];
}

export async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as Workout;
  } catch {
    return null;
  }
}