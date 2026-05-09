'use client';

import { motion } from 'framer-motion';
import { FaBrain, FaPaperPlane } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

export default function OrbitDock() {
  // signal AIChatBot to hide its own launcher orb
  if (typeof window !== 'undefined') {
    (window as unknown as { __ORBIT_DOCK__?: boolean }).__ORBIT_DOCK__ = true;
  }

  const radius = 36;
  const orbitPoints = [
    { x: 60, y: 60 - radius }, // top
    { x: 60, y: 60 + radius }, // bottom
  ];

  const launchAI = () => window.dispatchEvent(new Event('orbitdock:open-ai'));
  const launchContact = () => window.dispatchEvent(new Event('orbitdock:open-contact'));
  const openBlogSettings = () => window.dispatchEvent(new Event('orbitdock:open-blog-settings'));

  return (
    <div
      className="fixed left-1/2 -translate-x-1/2 z-[120] pointer-events-none"
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <motion.div
        className="relative w-[120px] h-[120px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      >
        {/* orbit ring + subtle glow */}
        <div className="absolute inset-0 rounded-full border border-[rgb(var(--color-border))] bg-[rgb(var(--color-card))]/35 backdrop-blur-md shadow-xl pointer-events-none" />
        <div className="absolute inset-2 rounded-full border border-[rgb(var(--color-primary))]/20 pointer-events-none" />

        {/* connection lines */}
        <svg className="absolute inset-0 pointer-events-none opacity-60" viewBox="0 0 120 120">
          {orbitPoints.map((point, idx) => (
            <line
              key={idx}
              x1="60"
              y1="60"
              x2={point.x}
              y2={point.y}
              stroke="rgba(59,130,246,0.32)"
              strokeWidth="0.8"
            />
          ))}
        </svg>

        {/* center planet */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[rgb(var(--color-card))] border border-[rgb(var(--color-border))] shadow-lg pointer-events-auto">
          <button
            type="button"
            onClick={openBlogSettings}
            className="w-full h-full rounded-full grid place-items-center text-[rgb(var(--color-primary))]"
            aria-label="Open blog settings"
          >
            <FiSettings size={18} />
          </button>
        </div>

        {/* planets (don’t rotate with ring: counter-rotate to stay upright) */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        >
          {/* AI */}
          <div
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{ transform: `translate(-50%, -50%) translate(0px, -${radius}px)` }}
          >
            <button
              type="button"
              onClick={launchAI}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/90 to-purple-600/90 text-white shadow-lg border border-white/20 grid place-items-center hover:scale-105 active:scale-95 transition"
              aria-label="Open AI assistant"
            >
              <FaBrain size={18} />
            </button>
          </div>

          {/* Message */}
          <div
            className="absolute left-1/2 top-1/2 pointer-events-auto"
            style={{ transform: `translate(-50%, -50%) translate(0px, ${radius}px)` }}
          >
            <button
              type="button"
              onClick={launchContact}
              className="w-10 h-10 rounded-full bg-[rgb(var(--color-card))] text-[rgb(var(--color-primary))] shadow-lg border border-[rgb(var(--color-border))] grid place-items-center hover:scale-105 active:scale-95 transition"
              aria-label="Open contact"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
}

