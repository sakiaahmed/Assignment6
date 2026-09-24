export default function Loading({
  label = 'Loading workouts…',
}: {
  label?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="mt-4 text-sm text-base-content/50">{label}</p>
    </div>
  );
}