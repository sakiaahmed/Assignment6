import { Dumbbell } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-base-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
            <Dumbbell
              className="w-4 h-4 text-primary-content"
              strokeWidth={2.5}
            />
          </div>
          <span className="font-display font-bold tracking-wider">
            FIT<span className="text-primary">LOG</span>
          </span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-base-content/50 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}