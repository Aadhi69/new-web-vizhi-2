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
import { useRef, useState, useEffect } from "react";
import { Cpu, Feather, Orbit, ShieldCheck } from "lucide-react";
import ModelViewer from "./ModelViewer";

type HardwareFeature = {
  title: string;
  desc: string;
};

function featureIcon(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("lightweight")) return Feather;
  if (normalizedTitle.includes("spatial")) return Orbit;
  if (normalizedTitle.includes("edge ai")) return Cpu;
  return ShieldCheck;
}

function HardwareFeatureCard({
  feature,
  index,
}: {
  feature: HardwareFeature;
  index: number;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [9, -9]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-11, 11]), {
    stiffness: 160,
    damping: 18,
  });
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["18%", "82%"]),
    { stiffness: 130, damping: 20 },
  );
  const layerX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 130,
    damping: 20,
  });
  const layerY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 130,
    damping: 20,
  });
  const sheenBackground = useTransform(
    sheenX,
    (x) =>
      `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.2), transparent 38%)`,
  );
  const cardStyle = {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
  } as MotionStyle;
  const revealDelay = [
    "reveal-delay-1",
    "reveal-delay-2",
    "reveal-delay-3",
    "reveal-delay-4",
  ][index % 4];
  const Icon = featureIcon(feature.title);

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
    <div
      className={`relative min-h-[140px] sm:min-h-[160px] reveal ${revealDelay}`}
      style={{ perspective: "900px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={cardStyle}
        whileHover={{ y: -6, scale: 1.025 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="relative h-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[linear-gradient(145deg,var(--surface-card),#09090b)] p-[var(--space-sm)] md:p-[var(--space-md)] shadow-[var(--shadow-card)] transition-colors duration-[var(--duration-base)] sm:p-[var(--space-sm)] pointer-events-none sm:pointer-events-auto"
      >
        <motion.div
          className="absolute inset-0 opacity-75 sm:opacity-0"
          style={{
            background: sheenBackground,
            z: 1,
          }}
        />
        <div
          className="absolute inset-0 sm:opacity-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10), transparent 34%, transparent 74%, rgba(255,255,255,0.05))",
            transform: "translateZ(2px)",
          }}
        />
        <motion.div
          className="relative z-10 flex h-full flex-col"
          style={{ x: layerX, y: layerY, z: 48 }}
        >
          <div className="mb-[var(--space-md)] flex h-12 w-12 items-center justify-center rounded-[var(--radius-sm)] border border-white/10 bg-[var(--accent-dim)] shadow-[inset_0_0_20px_rgba(255,255,255,0.04)]">
            <Icon size={18} className="text-[var(--accent)]" strokeWidth={2} />
          </div>
          <h3 className="mb-[var(--space-xs)] text-[18px] font-[600] tracking-[-0.01em] text-[var(--text-primary)]">
            {feature.title}
          </h3>
          <p className="text-[15px] font-[400] leading-[1.65] text-[var(--text-body)]">
            {feature.desc}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function DeviceParallaxCard({
  opacity,
  y,
}: {
  opacity?: MotionStyle["opacity"];
  y?: MotionStyle["y"];
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 18,
  });
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["18%", "82%"]),
    { stiffness: 120, damping: 20 },
  );
  const layerX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 20,
  });
  const layerY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 20,
  });
  const sheenBackground = useTransform(
    sheenX,
    (x) =>
      `radial-gradient(circle at ${x} 8%, rgba(255,255,255,0.18), transparent 38%)`,
  );
  const cardStyle = {
    opacity: opacity !== undefined ? opacity : undefined,
    y: y !== undefined ? y : undefined,
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
  } as MotionStyle;

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
    <div
      className="relative mx-auto mb-[var(--space-2xl)] w-full max-w-4xl reveal reveal-delay-1"
      style={{ perspective: "1200px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={cardStyle}
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        className="relative h-[240px] sm:h-[320px] md:h-[500px] w-full overflow-hidden rounded-[var(--radius-md)] border border-white/20 bg-[linear-gradient(145deg,#2a2a30,#111115_60%,#050505)] p-1 shadow-[var(--shadow-glow)] pointer-events-none sm:pointer-events-auto"
      >
        <motion.div
          className="absolute inset-0 opacity-75 sm:opacity-0"
          style={{
            background: sheenBackground,
            z: 1,
          }}
        />
        <div
          className="absolute inset-0 sm:opacity-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2), transparent 34%, transparent 70%, rgba(255,255,255,0.1)), radial-gradient(circle at 50% 55%, rgba(255,255,255,0.14), transparent 48%)",
            transform: "translateZ(2px)",
          }}
        />
        <div
          className="absolute left-[var(--space-md)] top-[var(--space-md)] z-20 flex items-center gap-2"
          style={{ transform: "translateZ(76px)" }}
        >
          <div className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(255,255,255,0.65)] animate-pulse" />
          <span className="text-xs font-mono text-white/70">GLASS_MODEL</span>
        </div>
        <div
          className="absolute right-[var(--space-md)] top-[var(--space-md)] z-20 rounded-[var(--radius-sm)] border border-white/10 bg-black/30 px-3 py-2 text-[11px] font-mono text-white/55 backdrop-blur-md"
          style={{ transform: "translateZ(82px)" }}
        >
          DRAG_ROTATE
        </div>
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center"
          style={{ x: layerX, y: layerY, z: 92 }}
        >
          <ModelViewer />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function DeviceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 640px)");
    const onChange = () => setIsMobile(mql.matches);
    setIsMobile(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  const deviceOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const deviceY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

  const featuresOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const features: HardwareFeature[] = [
    {
      title: "Lightweight Design",
      desc: "Crafted for comfort. Built for performance.",
    },
    {
      title: "Spatial Computing",
      desc: "Real-world intelligence fused with spatial data.",
    },
    {
      title: "Edge AI Processing",
      desc: "Complex neural networks running instantly, locally.",
    },
    {
      title: "All-Day Usability",
      desc: "Seamless wearability for the 24/7 professional.",
    },
  ];

  return (
    <section
      id="technology"
      ref={containerRef}
      aria-label="Vizhi Hardware Technology"
      className="relative section bg-[var(--surface-deep)] overflow-hidden scroll-mt-28"
    >
      <div className="container flex flex-col items-center md:items-start">
        <motion.div
          style={!isMobile ? { opacity: titleOpacity, y: titleY } : {}}
          className="text-center md:text-left mb-[var(--space-lg)] sm:mb-[var(--space-xl)] z-10 w-full reveal"
        >
          <div className="section-label justify-center md:justify-start">
            <span>Hardware</span>
          </div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-[700] tracking-[-0.03em] text-[var(--text-primary)] mb-[var(--space-xs)] sm:mb-[var(--space-sm)]">
            Designed for the{" "}
            <span style={{ color: "var(--accent)" }}>Future of Vision</span>
          </h2>
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[var(--text-body)] max-w-[var(--max-width-text)] mx-auto md:mx-0 font-[400]">
            A new standard for physical interaction with digital complexity.
          </p>
        </motion.div>

        <DeviceParallaxCard
          opacity={isMobile ? 1 : deviceOpacity}
          y={isMobile ? 0 : deviceY}
        />

        <motion.div
          style={!isMobile ? { opacity: featuresOpacity } : {}}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--space-sm)] sm:gap-[var(--space-md)] w-full z-10 reveal"
        >
          {features.map((feature, idx) => (
            <HardwareFeatureCard
              key={feature.title}
              feature={feature}
              index={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
