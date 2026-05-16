import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logoPng from "@assets/logo_no_bg.png";

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 100),   // Image slowly scaling
      setTimeout(() => setPhase(2), 600),   // Overlay gradient fades in slightly
      setTimeout(() => setPhase(3), 1000),  // Logo + Question text
      setTimeout(() => setPhase(4), 3400),  // Exit drift
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ filter: 'blur(10px)', opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.2 }}
        animate={{ scale: phase >= 1 ? 1 : 1.2 }}
        transition={{ duration: 6, ease: 'easeOut' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/hook.jpg`} 
          alt="Relieved immigrant in office" 
          className="w-full h-full object-cover opacity-60"
        />
      </motion.div>

      {/* Dark overlay for contrast */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 0.8 : 0 }}
        transition={{ duration: 1 }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-8 w-full max-w-4xl mt-[10vh]">
        <motion.img 
          src={logoPng} 
          alt="FlexSolution" 
          className="w-48 mb-8 object-contain"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        />

        <motion.h1 
          className="text-[4.5vw] leading-[1.1] font-black tracking-tight text-white drop-shadow-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {'¿Necesitas ayuda'.split(' ').map((word, i) => (
            <motion.span 
              key={`w1-${i}`} 
              className="inline-block mr-4"
              initial={{ opacity: 0, y: 40, rotateX: 45 }}
              animate={phase >= 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 45 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: phase >= 3 ? 0.2 + (i * 0.1) : 0 }}
            >
              {word}
            </motion.span>
          ))}
          <br />
          {'con tus trámites?'.split(' ').map((word, i) => (
            <motion.span 
              key={`w2-${i}`} 
              className="inline-block mr-4 text-[var(--color-accent)]"
              initial={{ opacity: 0, y: 40, rotateX: 45 }}
              animate={phase >= 3 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 40, rotateX: 45 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: phase >= 3 ? 0.5 + (i * 0.1) : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>
    </motion.div>
  );
}