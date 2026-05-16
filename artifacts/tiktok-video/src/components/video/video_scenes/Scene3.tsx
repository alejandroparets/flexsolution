import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const services = [
  "Gestión de trámites",
  "Impresión de documentos",
  "Fotografías oficiales",
  "Envío de paquetes",
  "Orientación"
];

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 800),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-12"
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: '100vh' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Real people being helped — multicultural */}
      <motion.img
        src={`${import.meta.env.BASE_URL}images/multicultural_service.jpg`}
        className="absolute bottom-0 right-0 w-[55%] h-[70%] object-cover opacity-35 rounded-tl-[4rem]"
        style={{ maskImage: 'linear-gradient(to left, black 40%, transparent 100%)' }}
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 w-full max-w-5xl">
        <motion.h2
          className="text-[7vw] font-black font-display text-[var(--color-accent)] uppercase mb-12 text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
        >
          Todo en un solo lugar
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={phase >= 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.15 }}
            >
              <h3 className="text-[3vw] md:text-[2vw] font-bold">{service}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
