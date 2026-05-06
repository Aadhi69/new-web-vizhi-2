"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LightRays from "./ui/LightRays";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const lowMotion = Boolean(reduceMotion);
  // We map the scroll progress of the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scene 3: Introducing VIZHI. (Sunrise effect)
  const scene3Opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  const scene3Y = useTransform(scrollYProgress, [0, 0.5], [50, -50]);
  const scene3Scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1.1]);

  // Sunrise Glow Effect
  const sunriseOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  const sunriseY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);

  // Scene 4: The Next Interface for Human Intelligence.
  const scene4Opacity = useTransform(scrollYProgress, [0.5, 0.7, 1], [0, 1, 1]);
  const scene4Y = useTransform(scrollYProgress, [0.5, 1], [100, 0]);

  // Background particles effect scale / blur
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Vizhi Hero Section"
      className={`relative ${lowMotion ? "h-screen" : "h-[180vh] sm:h-[180vh] md:h-[200vh]"} bg-[var(--surface-deep)]`}
    >
      {/* Sticky container to hold the animating elements */}
      <div className="sticky top-0 h-[100dvh] sm:h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Scene 3 */}
        <motion.div
          style={lowMotion ? { opacity: 0 } : { opacity: scene3Opacity, y: scene3Y, scale: scene3Scale }}
          className="absolute z-10 text-center flex flex-col items-center justify-center pointer-events-none w-full h-full"
        >
          {/* Desktop/Tablet: Sunrise Glow */}
          <motion.div
            style={{ opacity: sunriseOpacity, y: sunriseY }}
            animate={
              lowMotion
                ? { scale: 1.08, filter: "blur(90px)" }
                : {
                    scale: [1.08, 1.18, 1.08],
                    filter: ["blur(90px)", "blur(125px)", "blur(90px)"],
                  }
            }
            transition={lowMotion ? { duration: 0.2 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="hidden sm:block absolute bottom-[-200%] sm:bottom-[-180%] md:bottom-[-150%] left-1/2 -translate-x-1/2 w-[280vw] sm:w-[220vw] md:w-[185vw] lg:w-[130vw] h-[60vh] sm:h-[65vh] md:h-[68vh] rounded-[100%] bg-gradient-to-t from-white/55 via-neutral-400/45 to-transparent blur-[90px] pointer-events-none mix-blend-screen"
          />

          {/* Desktop/Tablet: Light Rays */}
          <div className="hidden md:block absolute inset-0 z-0 pointer-events-none">
            {!lowMotion ? (
            <LightRays
              raysOrigin="bottom-center"
              raysColor="#ffffff"
              raysSpeed={1.85}
              lightSpread={1.95}
              rayLength={2}
              followMouse={false}
              mouseInfluence={0}
              noiseAmount={0.06}
              distortion={0.04}
              intensity={2.25}
              opacity={1}
              className="custom-rays"
            />
            ) : null}
          </div>

          {/* Mobile only: light rays + five separated background components */}
          <div className="md:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {lowMotion ? (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.16),transparent_58%)]" />
            ) : null}

            {!lowMotion ? (
            <div className="absolute inset-0 z-0 pointer-events-none opacity-95">
              <LightRays
                raysOrigin="bottom-center"
                raysColor="#ffffff"
                raysSpeed={1.45}
                lightSpread={2.35}
                rayLength={2.1}
                followMouse={false}
                mouseInfluence={0}
                noiseAmount={0.015}
                distortion={0.02}
                intensity={2.85}
                opacity={1}
                className="custom-rays"
              />
            </div>
            ) : null}

            {/* Component 1: Top-left floating orb */}
            <motion.div
              animate={{
                x: [0, 8, -6, 0],
                y: [0, -10, 6, 0],
              }}
              transition={lowMotion ? { duration: 0.2 } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[7%] left-[4%] z-10 w-8 h-8 rounded-full bg-gradient-to-br from-white/12 to-transparent blur-lg"
            />

            {/* Component 2: Top-right floating orb */}
            <motion.div
              animate={{
                x: [0, -8, 6, 0],
                y: [0, 9, -7, 0],
              }}
              transition={{
                duration: lowMotion ? 0.2 : 7,
                repeat: lowMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-[16%] right-[4%] z-10 w-9 h-9 rounded-full bg-gradient-to-tl from-[var(--accent)]/10 to-transparent blur-lg"
            />

            {/* Component 3: Mid-left glow */}
            <motion.div
              animate={{
                x: [0, -7, 5, 0],
                y: [0, 8, -6, 0],
              }}
              transition={{
                duration: lowMotion ? 0.2 : 8.5,
                repeat: lowMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-[52%] right-[10%] z-10 w-6 h-6 rounded-full bg-gradient-to-tr from-white/10 to-transparent blur-md"
            />

            {/* Component 4: Bottom-left orb */}
            <motion.div
              animate={{
                x: [0, 8, -6, 0],
                y: [0, -8, 7, 0],
              }}
              transition={{
                duration: lowMotion ? 0.2 : 9.5,
                repeat: lowMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-[24%] left-[6%] z-10 w-8 h-8 rounded-full bg-gradient-to-bl from-white/10 to-transparent blur-lg"
            />

            {/* Component 5: Bottom-right ribbon glow */}
            <motion.div
              animate={{
                x: [0, -7, 6, 0],
                y: [0, 7, -6, 0],
              }}
              transition={{
                duration: lowMotion ? 0.2 : 10,
                repeat: lowMotion ? 0 : Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-[10%] right-[8%] z-10 w-10 h-6 rounded-full bg-gradient-to-l from-white/10 to-transparent blur-lg"
            />
          </div>

          <h2 className="text-[clamp(24px,8vw,48px)] sm:text-[clamp(56px,11vw,144px)] font-[900] leading-tight sm:leading-none tracking-[-0.05em] text-[var(--text-primary)] z-20 px-6">
            Introducing Vizhi
          </h2>
        </motion.div>

        {/* Scene 4 - Final Hero Output */}
        <motion.div
          style={lowMotion ? { opacity: 1, y: 0 } : { opacity: scene4Opacity, y: scene4Y }}
          className="absolute z-20 w-full max-w-5xl px-6 sm:px-8 mx-auto text-center flex flex-col items-center"
        >
          <h1 className="text-[clamp(28px,7vw,72px)] sm:text-[clamp(32px,7vw,88px)] font-[800] leading-tight sm:leading-none tracking-[-0.04em] text-[var(--text-primary)] mb-4 sm:mb-6 uppercase">
            <span style={{ color: "var(--accent)" }}>Spatial</span>{" "}
            <br className="hidden md:block" /> Intelligence
          </h1>
          <p className="text-[16px] sm:text-[17px] md:text-[18px] font-[400] leading-[1.65] text-[var(--text-body)] max-w-[var(--max-width-text)] mx-auto mb-[var(--space-sm)] sm:mb-[var(--space-md)]">
            At Vizhi, we use Augmented Reality to transform how you interact
            with information, turning the world into your interface.
          </p>

          <motion.div
            initial={lowMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={lowMotion ? { duration: 0.2 } : { delay: 0.82, duration: 0.5, ease: "easeOut" }}
            className="flex flex-row flex-wrap justify-center gap-3 sm:gap-[var(--space-sm)]"
          >
            <a href="/contact" className="btn-primary">
              Reserve Now
            </a>
            <a href="#applications" className="btn-ghost">
              Experience XR
            </a>
            <a href="#video" className="btn-ghost opacity-70 hover:opacity-100">
              Watch Keynote
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
