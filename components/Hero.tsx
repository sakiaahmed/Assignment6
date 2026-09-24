import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: text */}
        <div>
          <p className="text-primary text-xs font-bold tracking-[0.3em] uppercase">
            Workout Library
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-[0.95] mt-4">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-6 text-base-content/60 text-base sm:text-lg max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <Link
            href="#library"
            className="btn btn-primary gap-2 mt-8 font-bold uppercase tracking-wide"
          >
            Browse Workouts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: image */}
        <div className="relative">
          <div className="aspect-square rounded-2xl overflow-hidden border border-base-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero.png"
              alt="Athlete training"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 bg-primary text-primary-content px-4 py-2 rounded-lg font-display font-bold text-sm uppercase tracking-wide">
            Every set counts
          </div>
        </div>
      </div>
    </section>
  );
}