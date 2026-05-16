import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      initial={{ scale: 1.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.5, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Image */}
      <motion.img 
        src={`${import.meta.env.BASE_URL}images/contact.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: 'blur(0px)' }}
        animate={{ filter: 'blur(8px)' }}
        transition={{ duration: 2, delay: 1 }}
      />
      
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        
        <motion.h2 
          className="text-[5vw] font-display text-white mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8 }}
        >
          Estamos cerca de ti
        </motion.h2>

        <motion.div 
          className="grid grid-cols-3 gap-8 w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
        >
          {/* WhatsApp / Bizum */}
          <div className="flex flex-col items-center bg-[var(--color-bg-dark)]/80 p-8 rounded-2xl border border-[var(--color-primary)]/50">
            <span className="text-[var(--color-primary)] font-bold tracking-widest text-[1.2vw] mb-4">WHATSAPP / BIZUM</span>
            <span className="text-white font-sans text-[2.5vw] font-light">+34 628 852 296</span>
          </div>

          {/* Instagram */}
          <div className="flex flex-col items-center bg-[var(--color-bg-dark)]/80 p-8 rounded-2xl border border-[var(--color-primary)]/50">
            <span className="text-[var(--color-primary)] font-bold tracking-widest text-[1.2vw] mb-4">INSTAGRAM</span>
            <span className="text-white font-sans text-[2.5vw] font-light">@dac_2025parets</span>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center bg-[var(--color-bg-dark)]/80 p-8 rounded-2xl border border-[var(--color-primary)]/50">
            <span className="text-[var(--color-primary)] font-bold tracking-widest text-[1.2vw] mb-4">EMAIL</span>
            <span className="text-white font-sans text-[2vw] font-light break-all text-center">alejandroparets<br/>@gmail.com</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
