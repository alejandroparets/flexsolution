import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lang } from './content';
import { videoContent } from './content';

export function Scene2({ lang = 'es' }: { lang?: Lang }) {
  const [phase, setPhase] = useState(0);
  const t = videoContent.scene2[lang];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1900),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
      initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      exit={{ rotateY: 90, scale: 0.8, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/problem.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: 'grayscale(100%) blur(5px)', scale: 1.1 }}
        animate={{ filter: 'grayscale(40%) blur(2px)', scale: 1 }}
        transition={{ duration: 4.5 }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 w-full px-12 flex flex-col items-center justify-center">
        <motion.h2
          className="text-[4vw] font-display text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {t.title}
        </motion.h2>

        <div className="flex flex-row gap-8">
          {t.challenges.map((challenge, idx) => (
            <motion.div
              key={idx}
              className="bg-[var(--color-bg-muted)] border border-[var(--color-primary)]/40 px-8 py-6 rounded-lg"
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 20 }}
              animate={
                phase >= idx + 1
                  ? { opacity: 1, y: 0, scale: 1, rotateX: 0 }
                  : { opacity: 0, y: 40, scale: 0.9, rotateX: 20 }
              }
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-[2.5vw] font-sans font-bold text-[var(--color-primary)] uppercase tracking-wider">
                {challenge}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
