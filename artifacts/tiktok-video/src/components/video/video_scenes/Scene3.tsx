import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lang } from './content';
import { videoContent } from './content';

export function Scene3({ lang = 'es' }: { lang?: Lang }) {
  const [phase, setPhase] = useState(0);
  const t = videoContent.scene3[lang];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1300),
      setTimeout(() => setPhase(4), 1600),
      setTimeout(() => setPhase(5), 1900),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-end overflow-hidden"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      exit={{ x: '-100%' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/solution.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.3, x: '-10%' }}
        animate={{ scale: 1, x: '0%' }}
        transition={{ duration: 5, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-black via-black/80 to-transparent" />

      <div className="relative z-10 w-1/2 pr-20 flex flex-col items-end text-right">
        <motion.h2
          className="text-[4vw] font-display text-[var(--color-primary)] font-bold mb-8 text-shadow-lg leading-tight"
          initial={{ opacity: 0, x: 50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8 }}
        >
          {t.titlePlain}
        </motion.h2>

        <div className="flex flex-col items-end gap-4 w-full">
          {t.services.map((service, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded border-r-4 border-[var(--color-primary)]"
              initial={{ opacity: 0, x: 50 }}
              animate={phase >= idx + 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <span className="text-[1.8vw] font-sans text-white">{service}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
