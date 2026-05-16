import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoPng from "@assets/logo_no_bg.png";

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Logo big reveal
      setTimeout(() => setPhase(2), 1000),  // Tagline
      setTimeout(() => setPhase(3), 1600),  // URL
      setTimeout(() => setPhase(4), 3600),  // Fade out prep
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
    >
      {/* Abstract background burst */}
      <motion.div 
        className="absolute w-[150vw] h-[150vw] bg-[var(--color-accent)] opacity-10 rounded-full blur-[100px]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.img 
          src={logoPng} 
          alt="FlexSolution" 
          className="w-[30vw] max-w-[400px] mb-[4vh] object-contain drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5, rotate: -10 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />

        <motion.h2 
          className="text-[4vw] font-bold text-white mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Tu solución en <span className="text-[var(--color-accent)]">Parets del Vallès</span>
        </motion.h2>

        <motion.div
          className="px-8 py-4 bg-white/5 border border-[var(--color-accent)]/30 rounded-full backdrop-blur-md"
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={phase >= 3 ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 20, filter: 'blur(5px)' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[1.8vw] text-white/80 font-mono tracking-wide">
            community-connect-hub-alejandroparets.replit.app
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}