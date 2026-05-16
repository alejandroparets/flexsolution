import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  hook: 3000,
  problem: 4500,
  services: 5000,
  contact: 4000,
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
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-dark)]">

      {/* Persistent Midground / Accent Layer */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full border border-[var(--color-primary)]/20 mix-blend-screen pointer-events-none"
        animate={{
          x: ['-20%', '10%', '-50%', '30%', '-10%'][sceneIndex],
          y: ['-20%', '-50%', '10%', '-30%', '-20%'][sceneIndex],
          scale: [1, 1.2, 0.8, 1.1, 1][sceneIndex],
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <motion.div
        className="absolute w-2 h-full bg-[var(--color-primary)] opacity-80"
        animate={{
          left: ['0%', '100%', '0%', '100%', '50%'][sceneIndex],
          opacity: sceneIndex === 4 ? 0 : 0.8,
          scaleY: [1, 0.5, 1, 0.8, 0][sceneIndex],
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />

      <AnimatePresence mode="popLayout">
        {SceneComponent && <SceneComponent key={currentSceneKey} />}
      </AnimatePresence>
    </div>
  );
}
