import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 1900),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const challenges = [
    { text: "Trámites", p: 1 },
    { text: "Burocracia", p: 2 },
    { text: "Idioma", p: 3 },
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
      initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
      animate={{ rotateY: 0, scale: 1, opacity: 1 }}
      exit={{ rotateY: 90, scale: 0.8, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200 }}
    >
      {/* Background Image */}
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/problem.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: 'grayscale(100%) blur(5px)', scale: 1.1 }}
        animate={{ filter: 'grayscale(40%) blur(2px)', scale: 1 }}
        transition={{ duration: 4.5 }}
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full px-12 flex flex-col items-center justify-center">
        
        <motion.h2 
          className="text-[4vw] font-display text-white mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Conocemos los retos...
        </motion.h2>

        <div className="flex flex-row gap-8">
          {challenges.map((challenge, idx) => (
            <motion.div 
              key={idx}
              className="bg-[var(--color-bg-muted)] border border-[var(--color-primary)]/40 px-8 py-6 rounded-lg"
              initial={{ opacity: 0, y: 40, scale: 0.9, rotateX: 20 }}
              animate={phase >= challenge.p ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : { opacity: 0, y: 40, scale: 0.9, rotateX: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <span className="text-[2.5vw] font-sans font-bold text-[var(--color-primary)] uppercase tracking-wider">
                {challenge.text}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
