import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
      setTimeout(() => setPhase(4), 3800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-12 overflow-hidden"
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Floating Image */}
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/papers.png`}
        className="absolute w-[120%] h-auto opacity-30 object-cover"
        animate={{ y: ['-5%', '5%'], rotate: [-2, 2] }}
        transition={{ duration: 6, repeat: Infinity, yoyo: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 w-full max-w-4xl text-left">
        <motion.h2 
          className="text-[4vw] md:text-[3vw] font-medium text-[var(--color-text-secondary)] mb-4"
          initial={{ opacity: 0, x: -50 }}
          animate={phase >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          Conocemos tus retos
        </motion.h2>

        <div className="flex flex-col gap-6">
          {['Trámites Interminables', 'Burocracia Compleja', 'Barrera del Idioma'].map((text, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-6"
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={phase >= (i + 1) ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.2 }}
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center border border-[var(--color-accent)]/50">
                <div className="w-6 h-6 bg-[var(--color-accent)] rounded-sm rotate-45" />
              </div>
              <span className="text-[5vw] md:text-[4vw] font-bold font-display uppercase tracking-wider">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
