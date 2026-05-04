"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionStyle } from "framer-motion";
import type { PointerEvent } from "react";
import { useRef } from "react";
import { Battery, BatteryCharging, Gauge, Zap } from "lucide-react";

export default function BatterySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0.0, 0.15], [0, 1]);
  const slideProgress = useTransform(scrollYProgress, [0.15, 0.3], [0, 100]);
  const newSlideProgress = useTransform(scrollYProgress, [0.25, 0.4], [100, 0]);
  const depletedOpacity = useTransform(scrollYProgress, [0.15, 0.3], [1, 0]);
  const chargedOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const cardFloatY = useTransform(scrollYProgress, [0, 0.5, 1], [36, -12, 24]);
  const cardGlow = useTransform(scrollYProgress, [0.2, 0.55], [0.14, 0.34]);

  const levelProgress = useTransform(
    scrollYProgress,
    [0.05, 0.15],
    ["100%", "5%"],
  );
  const newLevelProgress = useTransform(
    scrollYProgress,
    [0.35, 0.55],
    ["5%", "100%"],
  );

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 18,
  });
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["20%", "80%"]),
    { stiffness: 120, damping: 20 },
  );
  const layerX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-18, 18]), {
    stiffness: 120,
    damping: 20,
  });
  const layerY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-18, 18]), {
    stiffness: 120,
    damping: 20,
  });
  const bayX = useTransform(layerX, (value) => value * 0.3);
  const bayY = useTransform(layerY, (value) => value * 0.3);
  const sheenBackground = useTransform(
    sheenX,
    (x) =>
      `radial-gradient(circle at ${x} 12%, rgba(255,255,255,0.18), transparent 34%)`,
  );
  const cardStyle = {
    rotateX,
    rotateY,
    y: cardFloatY,
    transformStyle: "preserve-3d",
    "--card-glow": cardGlow,
  } as MotionStyle & Record<"--card-glow", typeof cardGlow>;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={containerRef}
      aria-label="Power and Efficiency"
      className="relative section bg-[var(--surface-deep)] overflow-hidden"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-lg)] lg:gap-[var(--space-xl)] items-center">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="flex flex-col gap-[var(--space-sm)] sm:gap-[var(--space-md)] z-10 reveal order-last lg:order-first"
        >
          <div className="btn-utility w-fit pointer-events-none">
            <Zap size={16} color="var(--accent)" />
            <span>Patented Power System</span>
          </div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-[700] tracking-[-0.03em] text-[var(--text-primary)]">
            Zero Downtime <span style={{ color: "var(--accent)" }}>Power</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-[var(--text-body)] font-[400] max-w-[var(--max-width-text)] leading-[1.65]">
            Vizhi's patented hot-swappable battery system. Continuous operation
            for the real-world professional without ever losing power or unsaved
            context.
          </p>

          <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full text-glow shrink-0" />
              <p className="text-[14px] sm:text-[15px] text-[var(--text-primary)] font-[400]">
                Work without interruption.
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full text-glow shrink-0" />
              <p className="text-[14px] sm:text-[15px] text-[var(--text-primary)] font-[400]">
                Swap power instantly.
              </p>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full text-glow shrink-0" />
              <p className="text-[14px] sm:text-[15px] text-[var(--text-primary)] font-[400]">
                Built for continuous intelligence.
              </p>
            </div>
          </div>
        </motion.div>

        <div
          className="relative aspect-square order-first lg:order-last reveal reveal-delay-2"
          style={{ perspective: "1200px" }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <motion.div
            style={cardStyle}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            className="relative h-full w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[linear-gradient(145deg,#1f1f24,#0b0b0d_58%,#020202)] p-[clamp(24px,5vw,64px)] shadow-[var(--shadow-card)]"
          >
            <motion.div
              className="absolute inset-0 opacity-70"
              style={{
                background: sheenBackground,
                z: 1,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.12), transparent 28%, transparent 72%, rgba(255,255,255,0.07)), radial-gradient(circle at 50% 58%, rgba(34,197,94,var(--card-glow)), transparent 42%)",
                transform: "translateZ(2px)",
              }}
            />

            <div
              className="absolute top-[var(--space-md)] left-[var(--space-md)] flex items-center gap-2"
              style={{ transform: "translateZ(70px)" }}
            >
              <div className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_18px_rgba(74,222,128,0.85)] animate-pulse" />
              <span className="text-green-300 text-xs font-mono">
                SYS_RUNNING
              </span>
            </div>

            <div
              className="absolute top-[var(--space-md)] right-[var(--space-md)] flex items-center gap-2 rounded-[var(--radius-sm)] border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-md"
              style={{ transform: "translateZ(78px)" }}
            >
              <Gauge size={15} className="text-white/70" />
              <span className="text-[11px] font-mono text-white/60">
                LIVE_SWAP
              </span>
            </div>

            <div
              className="relative z-10 flex h-full items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute h-[74%] w-[46%] rounded-[28px] border border-white/10 bg-black/45 shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_28px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
                style={{ x: bayX, y: bayY, z: 42 }}
              />

              <motion.div
                className="relative h-[68%] w-[36%] min-w-28 rounded-[26px] border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] p-2 shadow-[0_22px_80px_rgba(0,0,0,0.62)]"
                style={{ x: layerX, y: layerY, z: 96 }}
              >
                <div className="absolute left-1/2 top-[-14px] h-4 w-14 -translate-x-1/2 rounded-t-lg border border-b-0 border-white/15 bg-white/10" />
                <div className="relative flex h-full flex-col items-center overflow-hidden rounded-[20px] border border-white/10 bg-black/80 p-2">
                  <motion.div
                    style={{ y: slideProgress, opacity: depletedOpacity }}
                    className="relative flex h-full w-full flex-col items-center justify-end rounded-2xl border border-white/5 bg-white/5 p-2"
                  >
                    <Battery
                      size={24}
                      className="absolute top-4 text-white/35"
                    />
                    <motion.div
                      className="w-full rounded-xl bg-red-500/85 shadow-[0_0_28px_rgba(239,68,68,0.38)]"
                      style={{ height: levelProgress }}
                    />
                  </motion.div>

                  <motion.div
                    style={{ y: newSlideProgress, opacity: chargedOpacity }}
                    className="absolute inset-2 flex flex-col items-center justify-end rounded-2xl border border-green-400/30 bg-white/10 p-2"
                  >
                    <BatteryCharging
                      size={24}
                      className="absolute left-1/2 top-4 -translate-x-1/2 text-green-300 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]"
                    />
                    <motion.div
                      className="w-full rounded-xl bg-green-400/90 shadow-[0_0_32px_rgba(74,222,128,0.46)]"
                      style={{ height: newLevelProgress }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <div
              className="absolute bottom-[var(--space-sm)] sm:bottom-[var(--space-md)] left-[var(--space-sm)] sm:left-[var(--space-md)] right-[var(--space-sm)] sm:right-[var(--space-md)] flex items-end justify-between gap-2 sm:gap-4"
              style={{ transform: "translateZ(74px)" }}
            >
              <div>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-white/35">
                  Battery Card
                </p>
                <p className="text-[13px] sm:text-[15px] text-white/82">
                  Hot-swap reserve online
                </p>
              </div>
              <span className="text-right text-[10px] sm:text-xs font-mono uppercase text-[var(--text-muted)]">
                Internal backup active
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
