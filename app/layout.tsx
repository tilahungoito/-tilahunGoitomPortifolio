//app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import MotionWrapper from '../components/MotionWrapper';

const inter = Inter({ subsets: ['latin'] });

// Navbar with dynamic import (still fine)
const Navbar = dynamic(() => import('../components/Navbar'), {
  loading: () => <div className="h-16 bg-gray-100"></div>,
});

export const metadata = {
  title: 'Tilahun Goitom {TGDEV}',
  description: 'Full Stack Developer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <MotionWrapper>{children}</MotionWrapper>
      </body>
    </html>
  );
}
