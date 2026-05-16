import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logoPng from "@assets/logo_no_bg.png";

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-[var(--color-bg-dark)]"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img src={logoPng} alt="FlexSolution" className="w-[30vw] max-w-[400px] h-auto object-contain mb-8" />
      </motion.div>

      <motion.h1
        className="text-[4vw] font-black font-display uppercase tracking-widest text-[var(--color-accent)] mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      >
        Tu solución flexible
      </motion.h1>

      <motion.p
        className="text-[2.5vw] text-white/80"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        Parets del Vallès, Barcelona
      </motion.p>
      
      <motion.p
        className="text-[2vw] text-[var(--color-text-secondary)] mt-8"
        initial={{ opacity: 0 }}
        animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.4 }}
      >
        community-connect-hub-alejandroparets.replit.app
      </motion.p>
    </motion.div>
  );
}
