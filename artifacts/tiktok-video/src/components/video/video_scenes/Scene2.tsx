import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),   // First pain point
      setTimeout(() => setPhase(2), 800),   // Second
      setTimeout(() => setPhase(3), 1400),  // Third
      setTimeout(() => setPhase(4), 2200),  // Subline
      setTimeout(() => setPhase(5), 3800),  // Exit prep
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const problems = ["Trámites.", "Burocracia.", "Idioma."];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-start px-[10vw] bg-black overflow-hidden"
      initial={{ clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' }}
      animate={{ clipPath: 'polygon(0% 0, 100% 0, 100% 100%, 0% 100%)' }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ x: '10%' }}
        animate={{ x: '0%' }}
        transition={{ duration: 5, ease: 'easeOut' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/problem.jpg`} 
          alt="Confused immigrant with paperwork" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        {/* Subtle gradient to ensure text readability on the left */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent w-2/3" />
      </motion.div>

      <div className="relative z-10 flex flex-col justify-center h-full max-w-2xl">
        <div className="space-y-4">
          {problems.map((prob, idx) => (
            <motion.h2 
              key={idx}
              className="text-[5vw] font-black tracking-tight text-white leading-none uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
              initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
              animate={phase >= idx + 1 ? { opacity: 1, x: 0, filter: 'blur(0px)' } : { opacity: 0, x: -50, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {prob}
            </motion.h2>
          ))}
        </div>
        
        <motion.p 
          className="mt-8 text-[2vw] text-[var(--color-accent)] font-semibold uppercase tracking-widest border-l-4 border-[var(--color-accent)] pl-6"
          initial={{ opacity: 0, height: 0, overflow: 'hidden' }}
          animate={phase >= 4 ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          No tienes que hacerlo solo
        </motion.p>
      </div>
    </motion.div>
  );
}