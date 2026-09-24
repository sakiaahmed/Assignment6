'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dumbbell, Bookmark } from 'lucide-react';
import { useFitLog } from '@/context/FitLogContext';

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved, hydrated } = useFitLog();

  const links = [
    { href: '/', label: 'Workout' },
    { href: '/my-plan', label: 'My Plan' },
  ];

  const planCount = hydrated ? plan.length : 0;
  const savedCount = hydrated ? saved.length : 0;

  return (
    <header className="sticky top-0 z-50 bg-base-100/80 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-16">
        {/* Left */}
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
              <Dumbbell
                className="w-5 h-5 text-primary-content"
                strokeWidth={2.5}
              />
            </div>
            <span className="font-display font-bold tracking-wider text-lg">
              FIT<span className="text-primary">LOG</span>
            </span>
          </Link>
        </div>

        {/* Center: links */}
        <div className="navbar-center hidden md:flex">
          {links.map((l) => {
            const active =
              l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`btn btn-ghost btn-sm font-medium uppercase tracking-wide ${
                  active ? 'text-primary' : 'text-base-content/70'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right: badges */}
        <div className="navbar-end gap-2">
          <Link
            href="/my-plan"
            className="badge badge-primary gap-1 py-3 px-3 font-bold"
          >
            Plan
            <span className="badge badge-sm bg-base-100/20 border-0 text-primary-content">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="badge badge-outline gap-1 py-3 px-3 font-bold"
          >
            <Bookmark className="w-3 h-3" />
            Saved
            <span className="badge badge-sm badge-ghost">{savedCount}</span>
          </Link>
        </div>
      </div>

      {/* Mobile links */}
      <div className="md:hidden border-t border-base-300 bg-base-100">
        <div className="flex justify-center gap-4 py-2">
          {links.map((l) => {
            const active =
              l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs font-semibold uppercase tracking-widest ${
                  active ? 'text-primary' : 'text-base-content/60'
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}