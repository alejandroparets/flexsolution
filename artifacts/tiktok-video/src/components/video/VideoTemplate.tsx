import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: 3500,
  problem: 4500,
  services: 5500,
  contact: 4500,
  close: 4000,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  hook: Scene1,
  problem: Scene2,
  services: Scene3,
  contact: Scene4,
  close: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-dark)] font-body">
      {/* Persistent Background Layer */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          src={`${import.meta.env.BASE_URL}videos/bg_gold.mp4`}
          autoPlay muted loop playsInline
        />
        <motion.div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full opacity-20 blur-[100px]"
          style={{ background: 'radial-gradient(circle, var(--color-accent), transparent)' }}
          animate={{ x: ['-20%', '50%', '-10%'], y: ['-10%', '60%', '20%'], scale: [1, 1.2, 0.8] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      {/* Persistent Midground Accent */}
      <motion.div
        className="absolute h-[2px] bg-[var(--color-accent)]"
        animate={{
          left: ['0%', '10%', '50%', '20%', '30%'][sceneIndex],
          width: ['100%', '80%', '50%', '60%', '40%'][sceneIndex],
          top: ['10%', '85%', '90%', '15%', '85%'][sceneIndex],
          opacity: sceneIndex === 4 ? 0 : 0.8,
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
