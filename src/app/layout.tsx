import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Warrior King Nutrition OS',
  description: 'Elite food management — scan, grade, preserve, and track like a champion.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Navbar />
        {/* Desktop: offset for sidebar */}
        <main className="lg:ml-64 min-h-screen pb-20 lg:pb-0">
          <div className="max-w-3xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
