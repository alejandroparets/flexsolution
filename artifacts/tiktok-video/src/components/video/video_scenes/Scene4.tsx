import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lang } from './content';
import { videoContent } from './content';

const contacts = [
  { label: 'WHATSAPP / BIZUM', value: '+34 628 852 296', icon: '📱' },
  { label: 'INSTAGRAM', value: '@dac_2025parets', icon: '📸' },
  { label: 'EMAIL', value: 'alejandroparets@gmail.com', icon: '✉️' },
];

export function Scene4({ lang = 'es' }: { lang?: Lang }) {
  const [phase, setPhase] = useState(0);
  const t = videoContent.scene4[lang];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 900),
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
      <motion.img
        src={`${import.meta.env.BASE_URL}images/contact.jpg`}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ filter: 'blur(0px)' }}
        animate={{ filter: 'blur(8px)' }}
        transition={{ duration: 2, delay: 1 }}
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 w-full px-16 flex flex-col items-center gap-10">
        <motion.h2
          className="text-[4.5vw] font-display font-bold text-white text-center leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
        >
          {t.title}
        </motion.h2>

        <div className="grid grid-cols-3 gap-6 w-full">
          {contacts.map((c, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-3 bg-black/80 border border-[var(--color-primary)]/60 rounded-2xl p-6 min-w-0"
              initial={{ opacity: 0, y: 30 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <span className="text-3xl leading-none">{c.icon}</span>
              <span className="text-[var(--color-primary)] font-bold tracking-widest text-[1vw] uppercase text-center">
                {c.label}
              </span>
              <span className="text-white font-sans text-[1.6vw] font-semibold text-center break-words w-full leading-snug">
                {c.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
