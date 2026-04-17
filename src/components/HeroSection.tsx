"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function useTypewriter(text: string, start: boolean, speed = 36) {
  const [value, setValue] = useState("");
  const [isDone, setIsDone] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!start || startedRef.current) return;

    startedRef.current = true;
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(timer);
        setIsDone(true);
      }
    }, speed);

    return () => {
      window.clearInterval(timer);
    };
  }, [start, speed, text]);

  return { value, isDone };
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scene2Start, setScene2Start] = useState(false);
  const [scene3Start, setScene3Start] = useState(false);
  const [scene4Start, setScene4Start] = useState(false);

  // We map the scroll progress of the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 1: Information is everywhere. (visible by default)
  const scene1Opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.25],
    [1, 1, 1, 0],
  );
  const scene1Y = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

  // Scene 2: But access is broken.
  const scene2Opacity = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45, 0.5],
    [0, 1, 1, 0],
  );
  const scene2Y = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);

  // Scene 3: Introducing VIZHI. (Sunrise effect)
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0.5, 0.6, 0.7, 0.75],
    [0, 1, 1, 0],
  );
  const scene3Y = useTransform(scrollYProgress, [0.5, 0.75], [50, -50]);
  const scene3Scale = useTransform(scrollYProgress, [0.5, 0.75], [0.9, 1.1]);

  // Scene 4: The Next Interface for Human Intelligence.
  const scene4Opacity = useTransform(
    scrollYProgress,
    [0.75, 0.85, 1],
    [0, 1, 1],
  );
  const scene4Y = useTransform(scrollYProgress, [0.75, 1], [100, 0]);
  const glassesOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 0.5]);
  const glassesScale = useTransform(scrollYProgress, [0.85, 1], [1.1, 1]);

  // Background particles effect scale / blur
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);

  // Scroll Prompt: visible in the first 3 frames
  const scrollPromptOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.75],
    [0.4, 0.4, 0],
  );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.22) setScene2Start(true);
    if (latest >= 0.48) setScene3Start(true);
    if (latest >= 0.72) setScene4Start(true);
  });

  const scene1Text = useTypewriter(
    "Technology should adapt to the way humans work.",
    true,
    120,
  );
  const scrollText = useTypewriter("Scroll", true, 180);
  const scene2Text = useTypewriter(
    "Not the other way around.",
    scene2Start,
    130,
  );
  const scene3Text = useTypewriter("Introducing Vizhi.", scene3Start, 140);
  const scene4TitleText = useTypewriter(
    "Spatial\nIntelligence",
    scene4Start,
    125,
  );

  const cursorClass = "inline-block w-[0.55ch] animate-pulse align-baseline";

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      {/* Sticky container to hold the animating elements */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Abstract Particle Background */}
        <motion.div
          style={{ scale: bgScale, opacity: bgOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-vizhi-electric)_0%,_transparent_50%)] opacity-20 blur-[100px]" />
          {/* CSS-based representation of particles/neural net */}
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:40px_40px] opacity-10 mix-blend-overlay"
            animate={{
              backgroundPositionX: ["0px", "40px"],
              backgroundPositionY: ["0px", "40px"],
              opacity: [0.08, 0.14, 0.08],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Scene 1 */}
        <motion.div
          style={{ opacity: scene1Opacity, y: scene1Y }}
          className="absolute z-10 text-center px-4"
        >
          <h2 className="vizhi-section-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white/90 tracking-tight">
            <span className="text-glow text-white font-medium whitespace-pre-line">
              {scene1Text.value}
            </span>
            {!scene1Text.isDone && <span className={cursorClass}>|</span>}
          </h2>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="absolute bottom-10 z-30 flex flex-col items-center justify-center pointer-events-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-white/30 text-xs mb-2 uppercase tracking-widest">
            {scrollText.value}
          </span>
          {!scrollText.isDone && <span className={cursorClass}>|</span>}
          <ChevronDown className="text-white/30" size={24} />
        </motion.div>

        {/* Scene 2 */}
        <motion.div
          style={{ opacity: scene2Opacity, y: scene2Y }}
          className="absolute z-10 text-center px-4"
        >
          <h2 className="vizhi-section-title text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light text-white/90 tracking-tight">
            <span className="italic">{scene2Text.value}</span>
            {!scene2Text.isDone && <span className={cursorClass}>|</span>}
          </h2>
        </motion.div>

        {/* Scene 3 */}
        <motion.div
          style={{ opacity: scene3Opacity, y: scene3Y, scale: scene3Scale }}
          className="absolute z-10 text-center flex flex-col items-center justify-center pointer-events-none"
        >
          <h2 className="vizhi-display-title text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,229,255,0.8)] z-20">
            {scene3Text.value}
            {!scene3Text.isDone && <span className={cursorClass}>|</span>}
          </h2>
        </motion.div>

        {/* Scene 4 - Final Hero Output */}
        <motion.div
          style={{ opacity: scene4Opacity, y: scene4Y }}
          className="absolute z-20 w-full max-w-5xl px-6 mx-auto text-center flex flex-col items-center"
        >
          <motion.div
            style={{ opacity: glassesOpacity, scale: glassesScale }}
            className="absolute -top-32 md:-top-48 opacity-40 z-[-1] pointer-events-none"
          >
            {/* Silhouette of glasses using geometric gradients as placeholder */}
            <div className="w-[300px] md:w-[600px] h-[100px] md:h-[150px] border-t-2 border-white/20 rounded-[100%] blur-[2px] bg-gradient-to-b from-cyan-500/10 to-transparent" />
          </motion.div>

          <h1 className="vizhi-display-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-white mb-4 sm:mb-6 md:mb-8 uppercase whitespace-pre-line">
            {scene4TitleText.value}
            {!scene4TitleText.isDone && <span className={cursorClass}>|</span>}
          </h1>
          <p className="vizhi-section-lead text-base sm:text-lg md:text-xl lg:text-2xl text-white/60 font-light max-w-3xl mb-8 sm:mb-10 md:mb-12">
            At Vizhi, we use Augmented Reality to transform how you interact
            with information, turning the world into your interface.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
