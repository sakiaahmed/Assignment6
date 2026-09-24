import Loading from '@/components/Loading';

export default function WorkoutLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <Loading label="Loading workout…" />
    </div>
  );
}