"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function ParallaxShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
  scrollYProgress,
  yRange = [-100, 100],
  xRange = [0, 0],
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
  scrollYProgress: MotionValue<number>;
  yRange?: [number, number];
  xRange?: [number, number];
}) {
  const yParallax = useTransform(scrollYProgress, [0, 1], yRange);
  const xParallax = useTransform(scrollYProgress, [0, 1], xRange);

  return (
    <motion.div
      style={{ y: yParallax, x: xParallax }}
      className={cn("absolute", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
        animate={{ opacity: 0.8, y: 0, rotate: rotate }}
        transition={{
          duration: 2.4,
          delay,
          ease: [0.23, 0.86, 0.39, 0.96],
          opacity: { duration: 1.2 },
        }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{
            duration: 12,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ width, height }}
          className="relative"
        >
          <div
            className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-r to-transparent",
              gradient,
              "backdrop-blur-[2px] border border-white/[0.05]",
              "after:absolute after:inset-0 after:rounded-full",
              "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]",
            )}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function HeroParallax({
  title1 = "Technology should adapt to",
  title2 = "the way humans work.",
  title3 = "Not the other",
  title4 = "way around",
}: {
  title1?: string;
  title2?: string;
  title3?: string;
  title4?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const lowMotion = Boolean(reduceMotion);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // We map the scroll progress from 0 to 1 over the 200vh container.
  // Text 1 fades out between 0% and 40% scroll
  const text1Opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const text1Y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const text1Scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  // Text 2 fades in between 40% and 80% scroll
  const text2Opacity = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.9, 1],
    [0, 1, 1, 0],
  );
  const text2Y = useTransform(scrollYProgress, [0.4, 0.6], [50, 0]);
  const text2Scale = useTransform(scrollYProgress, [0.4, 1], [1.05, 1]);

  return (
    <div
      ref={containerRef}
      className={`relative ${lowMotion ? "h-screen" : "h-[150vh] sm:h-[180vh] md:h-[200vh]"} w-full bg-[var(--surface-deep)]`}
      style={{ position: "relative" }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-white/[0.02] blur-3xl pointer-events-none" />

        <div className="absolute inset-0 overflow-hidden">
          {!lowMotion ? (
            <>
          {/* 1. INDIGO - Top Right Bleed (Subtle atmosphere) */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[-50, -100]}
            xRange={[0, 50]}
            delay={0.3}
            width={500}
            height={140}
            rotate={35}
            gradient="from-white/[0.05]"
            className="right-[-10%] top-[-5%]"
          />

          {/* 2. ROSE - Left Center Main Focus (Fully visible, anchors the left) */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[-30, 80]}
            xRange={[-30, 30]}
            delay={0.5}
            width={350}
            height={100}
            rotate={-20}
            gradient="from-white/[0.05]"
            className="left-[12%] top-[25%]"
          />

          {/* 3. VIOLET - Bottom Left Edge (Sinks off screen slowly) */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[0, 100]}
            xRange={[0, -50]}
            delay={0.4}
            width={250}
            height={80}
            rotate={15}
            gradient="from-white/[0.05]"
            className="left-[-5%] bottom-[10%]"
          />

          {/* 4. AMBER - Right Center Main Focus (Fully visible, anchors the right text block) */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[-50, -150]}
            xRange={[20, -20]}
            delay={0.6}
            width={400}
            height={100}
            rotate={-50}
            gradient="from-white/[0.05]"
            className="right-[15%] top-[55%]"
          />

          {/* 5. CYAN - Far Bottom Right Accent (Bleeds off) */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[50, -50]}
            xRange={[-20, 80]}
            delay={0.7}
            width={200}
            height={60}
            rotate={60}
            gradient="from-white/[0.05]"
            className="right-[5%] bottom-[-5%]"
          />

          {/* 6. EMERALD - Upper Left Ambient Edge */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[-20, 40]}
            xRange={[-40, 0]}
            delay={0.35}
            width={220}
            height={70}
            rotate={-15}
            gradient="from-white/[0.05]"
            className="left-[-2%] top-[15%]"
          />

          {/* 7. FUCHSIA - Mid Right Background Float */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[-60, 20]}
            xRange={[30, 80]}
            delay={0.55}
            width={280}
            height={85}
            rotate={45}
            gradient="from-white/[0.05]"
            className="right-[-2%] top-[35%]"
          />

          {/* 8. SKY - Lower Left Sweeping Arc */}
          <ParallaxShape
            scrollYProgress={scrollYProgress}
            yRange={[30, 120]}
            xRange={[-50, 20]}
            delay={0.65}
            width={320}
            height={95}
            rotate={-65}
            gradient="from-white/[0.05]"
            className="left-[5%] bottom-[25%]"
          />
            </>
          ) : null}
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex flex-col justify-center items-center pointer-events-none">
          <div className="max-w-4xl mx-auto text-center absolute inset-0 flex items-center justify-center">
            {/* FIRST TEXT BLOCK */}
            <motion.div
              style={lowMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: text1Opacity, y: text1Y, scale: text1Scale }}
              className="absolute w-full px-4 flex items-center justify-center"
            >
              <h1 className="text-[clamp(24px,8.5vw,34px)] sm:text-[clamp(32px,10vw,82px)] font-bold mb-4 sm:mb-6 tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] max-w-none leading-[1.05] flex flex-col items-center">
                <span className="whitespace-normal sm:whitespace-nowrap">{title1}</span>
                <span className="whitespace-normal sm:whitespace-nowrap">{title2}</span>
              </h1>
            </motion.div>

            {/* SECOND TEXT BLOCK */}
            <motion.div
              style={lowMotion ? { opacity: 0 } : { opacity: text2Opacity, y: text2Y, scale: text2Scale }}
              className="absolute w-full px-4 flex items-center justify-center"
            >
              <h1 className="text-[clamp(24px,8.5vw,34px)] sm:text-[clamp(32px,10vw,82px)] font-bold mb-4 sm:mb-6 tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] max-w-none leading-[1.05] flex flex-col items-center">
                <span className="whitespace-normal sm:whitespace-nowrap">{title3}</span>
                <span className="whitespace-normal sm:whitespace-nowrap">{title4}</span>
              </h1>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-deep)] via-transparent to-[var(--surface-deep)] pointer-events-none" />

        {/* Scroll Indicator */}
        <motion.div
          style={lowMotion ? { opacity: 0 } : { opacity: text1Opacity }}
          className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-[pulse_2s_ease-in-out_infinite]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest">
            SCROLL
          </span>
        </motion.div>
      </div>
    </div>
  );
}

export { HeroParallax };
