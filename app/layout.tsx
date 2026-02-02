//app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import MotionWrapper from '../components/MotionWrapper';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

// Navbar with dynamic import (still fine)
const Navbar = dynamic(() => import('../components/Navbar'), {
  loading: () => <div className="h-16 bg-gray-100 dark:bg-gray-800 transition-colors duration-300"></div>,
});

export const metadata: Metadata = {
  title: 'Tilahun Goitom - Portfolio',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} transition-colors duration-300`}>
        <ThemeProvider>
          <div className="relative">
            <Navbar />
            <ThemeToggle />
          </div>
          <MotionWrapper>{children}</MotionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
