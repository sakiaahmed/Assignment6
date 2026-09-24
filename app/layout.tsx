import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FitLogProvider } from '@/context/FitLogContext';
import { Toaster } from 'react-hot-toast';

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FitLog — Workout Library',
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="fitlog"
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body className="bg-base-100 text-base-content antialiased">
        <FitLogProvider>
          <Navbar />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#141414',
                color: '#fff',
                border: '1px solid #262626',
              },
              success: {
                iconTheme: { primary: '#ccff00', secondary: '#0a0a0a' },
              },
            }}
          />
        </FitLogProvider>
      </body>
    </html>
  );
}