import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import logoPng from "@assets/logo_no_bg.png";

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2800), // Exit drift
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background: diverse immigrants community */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/diverse_immigrants.jpg`}
        className="absolute inset-0 w-full h-full object-cover opacity-15"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-8"
      >
        <img src={logoPng} alt="FlexSolution" className="w-[30vw] max-w-[300px] h-auto object-contain drop-shadow-2xl" />
      </motion.div>

      <motion.h1 
        className="text-[6vw] leading-[1.1] font-black font-display tracking-tight uppercase"
        initial={{ opacity: 0, rotateX: 90, y: 40 }}
        animate={phase >= 2 ? { opacity: 1, rotateX: 0, y: 0 } : { opacity: 0, rotateX: 90, y: 40 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        ¿Eres <span className="text-[var(--color-accent)]">inmigrante</span><br/>en España?
      </motion.h1>
    </motion.div>
  );
}
