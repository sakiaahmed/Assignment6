#FitLog — Workout Library (DaisyUI Edition)

A companion built with Next.js, TypeScript, and DaisyUI. Browse workouts from a live API, add them to today's plan, save them for later, and log your sessions — all managed locally.

#Technologies Used

- Next.js (App Router)
- TypeScript
- Tailwind CSS v4
- DaisyUI v5 (custom dark theme)
- React Hot Toast** for notifications
- Lucide Icons
- localStorage for persistence

#Key Features

1. **DaisyUI Custom Theme** — bespoke dark "fitlog" theme with lime accents, defined once in globals.css via @plugin "daisyui/theme".
2. **Workout Library** — 12 workouts from a live API in a responsive grid, each with muscle-group tags, duration, calories, and rating.
3. **Add to Plan & Save** — DaisyUI buttons with duplicate prevention, a 5-lift cap, and toast feedback for every action.
4. **My Plan Dashboard** — DaisyUI stats for live metrics, tabs for Today's Plan / Saved, plus inline icon actions to view, mark done, or remove.
5. **Persistent & Responsive** — plan and saved data survive page reloads via localStorage. Fully responsive with custom 404 and loading states.