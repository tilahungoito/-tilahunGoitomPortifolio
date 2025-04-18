'use client';
//app/components/MotionWrapper.tsx
import { motion } from 'framer-motion';

export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      {children}
    </motion.main>
  );
}
