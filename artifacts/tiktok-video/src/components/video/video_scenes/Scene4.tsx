import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),   // Contact Box pops
      setTimeout(() => setPhase(2), 800),   // WhatsApp
      setTimeout(() => setPhase(3), 1200),  // Insta
      setTimeout(() => setPhase(4), 1600),  // Bizum
      setTimeout(() => setPhase(5), 3800),  // Exit
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ filter: 'blur(10px)', scale: 1.1, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Image Layer */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, y: '5%' }}
        animate={{ scale: 1, y: '0%' }}
        transition={{ duration: 6, ease: 'easeOut' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/contact_bg.jpg`} 
          alt="Warm office interior" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      <motion.div 
        className="relative z-10 bg-[var(--color-bg-dark)]/80 backdrop-blur-xl border border-[var(--color-accent)]/30 rounded-3xl p-[4vw] shadow-2xl flex flex-col items-center text-center max-w-4xl w-[80vw]"
        initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
        animate={phase >= 1 ? { scale: 1, opacity: 1, rotateY: 0 } : { scale: 0.8, opacity: 0, rotateY: 90 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 
          className="text-[4vw] font-bold text-white mb-10"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Estamos para ayudarte
        </h2>

        <div className="flex flex-col space-y-6 w-full px-10">
          <ContactRow 
            label="WhatsApp" 
            value="+34 628 852 296" 
            visible={phase >= 2} 
          />
          <ContactRow 
            label="Instagram" 
            value="@dac_2025parets" 
            visible={phase >= 3} 
          />
          <ContactRow 
            label="Bizum" 
            value="628 852 296" 
            visible={phase >= 4} 
            highlight
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ContactRow({ label, value, visible, highlight = false }: { label: string, value: string, visible: boolean, highlight?: boolean }) {
  return (
    <motion.div 
      className="flex justify-between items-center w-full border-b border-white/10 pb-4"
      initial={{ opacity: 0, x: -30 }}
      animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <span className="text-[2vw] text-white/60 tracking-wider uppercase font-semibold">{label}</span>
      <span className={`text-[2.5vw] font-bold ${highlight ? 'text-[var(--color-accent)]' : 'text-white'}`}>
        {value}
      </span>
    </motion.div>
  );
}