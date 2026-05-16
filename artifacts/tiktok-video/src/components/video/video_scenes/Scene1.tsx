import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logoPng from '@assets/logo_no_bg.png';
import type { Lang } from './content';
import { videoContent } from './content';

export function Scene1({ lang = 'es' }: { lang?: Lang }) {
  const [phase, setPhase] = useState(0);
  const t = videoContent.scene1[lang];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(0% at 50% 50%)' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}images/hook.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 4, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />

      <div className="relative z-10 w-full px-12 flex flex-col items-start max-w-7xl mx-auto">
        <motion.div
          className="mb-8 flex items-center gap-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={logoPng} alt="FlexSolution Logo" className="h-24 object-contain" />
          <span className="text-white font-display font-bold text-[3.5vw] leading-none tracking-tight drop-shadow-lg">
            Flex<span className="text-[var(--color-primary)]">Solution</span>
          </span>
        </motion.div>

        <div className="overflow-hidden mb-4">
          <motion.h1
            className="text-[6vw] font-display font-bold text-white leading-[1.1] text-shadow-lg"
            initial={{ y: '100%', rotate: 5 }}
            animate={phase >= 1 ? { y: '0%', rotate: 0 } : { y: '100%', rotate: 5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.line1}
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="text-[6vw] font-display font-bold text-[var(--color-primary)] leading-[1.1] text-shadow-lg"
            initial={{ y: '100%', rotate: 5 }}
            animate={phase >= 2 ? { y: '0%', rotate: 0 } : { y: '100%', rotate: 5 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.line2}
          </motion.h1>
        </div>
      </div>
    </motion.div>
  );
}
