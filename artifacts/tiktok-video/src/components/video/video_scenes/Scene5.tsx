import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logoPng from '@assets/logo_no_bg.png';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[var(--color-bg-dark)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Abstract bg glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--color-primary)]/10 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="mb-8 flex flex-col items-center gap-4"
        >
          <img src={logoPng} alt="FlexSolution Logo" className="h-48 object-contain" />
          <span className="text-white font-display font-bold text-[4vw] leading-none tracking-tight drop-shadow-lg">
            Flex<span className="text-[var(--color-primary)]">Solution</span>
          </span>
        </motion.div>

        <motion.h2
          className="text-white font-sans text-[3vw] mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { y: '0%', rotate: 0 } : { y: '100%', rotate: 20 }}
          transition={{ duration: 0.8 }}
        >
          Tu solución en Parets del Vallès
        </motion.h2>

        <motion.div
          className="px-8 py-4 border-2 border-[var(--color-primary)] rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <span className="text-[var(--color-primary)] font-mono text-[1.5vw] tracking-wider">
            www.flesolution.es
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
}
