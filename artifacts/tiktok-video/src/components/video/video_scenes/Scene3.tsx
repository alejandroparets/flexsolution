import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),   // BG zoom
      setTimeout(() => setPhase(2), 600),   // Service 1
      setTimeout(() => setPhase(3), 1000),  // Service 2
      setTimeout(() => setPhase(4), 1400),  // Service 3
      setTimeout(() => setPhase(5), 1800),  // Service 4
      setTimeout(() => setPhase(6), 2200),  // Service 5
      setTimeout(() => setPhase(7), 4800),  // Exit prep
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const services = [
    "Gestión de trámites",
    "Impresión",
    "Fotografías",
    "Envío de paquetes",
    "Orientación para inmigrantes"
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-end px-[10vw] bg-[var(--color-bg-dark)] overflow-hidden"
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.1, filter: 'blur(5px)' }}
        animate={{ scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img 
          src={`${import.meta.env.BASE_URL}images/solution.jpg`} 
          alt="Professional helping client" 
          className="w-full h-full object-cover opacity-50"
        />
        {/* Gradient shifting to the right for text readability */}
        <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent w-full" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-end text-right h-full justify-center max-w-3xl">
        <motion.h2 
          className="text-[3vw] text-[var(--color-accent)] font-bold mb-8 uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-display)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Nuestros Servicios
        </motion.h2>

        <div className="space-y-6 w-full flex flex-col items-end">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              className="bg-white/10 backdrop-blur-md border border-white/10 py-4 px-8 rounded-l-2xl shadow-xl w-[120%]"
              initial={{ opacity: 0, x: 100 }}
              animate={phase >= idx + 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <h3 className="text-[2.2vw] font-semibold text-white tracking-wide">
                {service}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}