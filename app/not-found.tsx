import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="hero min-h-[70vh]">
      <div className="hero-content text-center flex-col">
        <p className="font-display text-8xl sm:text-9xl font-bold text-primary">
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide mt-4">
          Page not found
        </h1>
        <p className="text-base-content/50 mt-2 max-w-md text-sm">
          The page you&apos;re looking for doesn&apos;t exist. Maybe it skipped
          leg day.
        </p>
        <Link href="/" className="btn btn-primary mt-6 uppercase tracking-wide">
          Back to Workouts
        </Link>
      </div>
    </div>
  );
}