import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 1600),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-12"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, filter: 'blur(20px)' }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full max-w-4xl bg-white/5 p-12 rounded-[3rem] border border-[var(--color-accent)]/30 backdrop-blur-md relative overflow-hidden">
        
        <motion.div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)] opacity-20 blur-[80px]" />
        
        <motion.h2
          className="text-[5vw] font-black font-display mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        >
          Comunícate<br/><span className="text-[var(--color-accent)]">hoy mismo</span>
        </motion.h2>

        <div className="space-y-8">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          >
            <span className="text-[var(--color-text-secondary)] text-[2vw]">WhatsApp / Bizum</span>
            <span className="text-[4vw] font-bold font-display">+34 628 852 296</span>
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-[var(--color-text-secondary)] text-[2vw]">Instagram</span>
            <span className="text-[4vw] font-bold font-display">@dac_2025parets</span>
          </motion.div>
          
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[var(--color-text-secondary)] text-[2vw]">Email</span>
            <span className="text-[3vw] font-bold">alejandroparets@gmail.com</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
