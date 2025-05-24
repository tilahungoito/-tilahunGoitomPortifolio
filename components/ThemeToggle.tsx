'use client';

import { useTheme } from './ThemeProvider';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 p-3 rounded-full bg-[rgb(var(--color-card))] text-[rgb(var(--color-foreground))] shadow-lg hover:shadow-xl transition-all duration-200 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        marginBottom: '80px',
      }}
    >
      {theme === 'light' ? (
        <FiMoon className="w-6 h-6" />
      ) : (
        <FiSun className="w-6 h-6" />
      )}
    </motion.button>
  );
} 