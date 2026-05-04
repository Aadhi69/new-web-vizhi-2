"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { MotionStyle } from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import { Layers, Cpu, Cloud, Building, ShieldCheck } from "lucide-react";

type ArchitectureLayer = {
  title: string;
  desc: string;
  icon: ReactNode;
  code: string;
};

function ArchitectureLayerCard({
  layer,
  index,
}: {
  layer: ArchitectureLayer;
  index: number;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [10, -10]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 160,
    damping: 18,
  });
  const layerX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 140,
    damping: 20,
  });
  const layerY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-10, 10]), {
    stiffness: 140,
    damping: 20,
  });
  const iconX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });
  const iconY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 18,
  });
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["18%", "82%"]),
    { stiffness: 130, damping: 20 },
  );
  const sheenBackground = useTransform(
    sheenX,
    (x) =>
      `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.22), transparent 38%)`,
  );
  const cardStyle = {
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
    <motion.div
      initial={{ opacity: 0, x: -42, rotateY: -8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative z-10"
      style={{ perspective: "1000px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={cardStyle}
        whileHover={{ y: -7, scale: 1.018 }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="group relative grid min-h-[80px] sm:min-h-[122px] grid-cols-[48px_1fr] sm:grid-cols-[72px_1fr] gap-2.5 sm:gap-5 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[linear-gradient(145deg,rgba(28,28,32,0.95),rgba(8,8,10,0.98)_62%,rgba(0,0,0,1))] p-2.5 sm:p-4 shadow-[0_18px_58px_rgba(0,0,0,0.42)] transition-colors duration-[var(--duration-base)] hover:border-[var(--border-accent)] md:grid-cols-[96px_1fr] md:gap-7 md:p-5"
      >
        <motion.div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-80"
          style={{ background: sheenBackground, z: 1 }}
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.10),transparent_26%,transparent_70%,rgba(255,255,255,0.05))]"
          style={{ transform: "translateZ(2px)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div
          className="absolute right-3 top-3 font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.16em] text-white/28"
          style={{ transform: "translateZ(50px)" }}
        >
          {layer.code}
        </div>

        <motion.div
          className="relative flex h-[48px] w-[48px] sm:h-[72px] sm:w-[72px] items-center justify-center rounded-[var(--radius-sm)] sm:rounded-[var(--radius-md)] border border-white/10 bg-black/45 shadow-[inset_0_0_28px_rgba(255,255,255,0.04),0_18px_44px_rgba(0,0,0,0.35)] md:h-24 md:w-24"
          style={{ x: iconX, y: iconY, z: 64 }}
        >
          <div className="absolute inset-1.5 rounded-[calc(var(--radius-sm)-2px)] border border-white/5 sm:inset-2 sm:rounded-[calc(var(--radius-md)-4px)]" />
          <div className="absolute h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(255,255,255,0.75)]" />
          <div className="relative z-10 text-[var(--accent)] opacity-90 transition-transform duration-300 group-hover:scale-110 scale-[0.8] sm:scale-100">
            {layer.icon}
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 flex min-w-0 flex-col justify-center pr-4 sm:pr-10"
          style={{ x: layerX, y: layerY, z: 46 }}
        >
          <div className="mb-1 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
            <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
            <span className="font-mono text-[8px] sm:text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              Layer {index + 1}
            </span>
          </div>
          <h3 className="mb-0.5 sm:mb-[var(--space-2xs)] text-[14px] sm:text-[18px] md:text-[20px] font-[600] tracking-[-0.01em] text-[var(--text-primary)] transition-colors duration-[var(--duration-base)] group-hover:text-white">
            {layer.title}
          </h3>
          <p className="text-[12px] sm:text-[14px] md:text-[15px] font-[400] leading-tight sm:leading-[1.65] text-[var(--text-body)]">
            {layer.desc}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const layers: ArchitectureLayer[] = [
    {
      title: "Enterprise Integrations",
      desc: "Live backend synchronization",
      icon: <Building size={24} />,
      code: "API_SYNC",
    },
    {
      title: "Cloud Intelligence",
      desc: "Global distributed compute",
      icon: <Cloud size={24} />,
      code: "CLOUD_AI",
    },
    {
      title: "Spatial Operating System",
      desc: "Real-world geometric mapping",
      icon: <Layers size={24} />,
      code: "SPATIAL_OS",
    },
    {
      title: "Edge AI Layer",
      desc: "On-device neural processing",
      icon: <ShieldCheck size={24} />,
      code: "EDGE_NPU",
    },
    {
      title: "Hardware Layer",
      desc: "Precision optical mechanics",
      icon: <Cpu size={24} />,
      code: "OPTICS",
    },
  ];

  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section
      id="platform"
      ref={containerRef}
      aria-label="System ArchitectureStack"
      className="section bg-[var(--surface-deep)] relative overflow-hidden"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-lg)] lg:gap-[var(--space-xl)] items-start lg:items-center relative z-10">
        {/* Architecture Stack */}
        <div className="relative order-last lg:order-first flex flex-col gap-3 sm:gap-5 lg:gap-6">
          {/* Animated Connecting Timeline Line */}
          <div className="absolute bottom-10 left-5 sm:left-9 lg:left-12 top-10 z-0 w-px bg-[var(--border-subtle)]">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "bottom" }}
              className="w-full h-full bg-[var(--accent)] absolute bottom-0 shadow-[var(--shadow-glow)]"
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {layers.map((layer, i) => (
              <ArchitectureLayerCard
                key={layer.title}
                layer={layer}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-[var(--space-sm)] sm:gap-[var(--space-md)] justify-start lg:justify-center h-full reveal">
          <div className="section-label justify-start">
            <span>System Architecture</span>
          </div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-[700] tracking-[-0.03em] text-[var(--text-primary)] leading-[1.1]">
            Built as a <br className="hidden md:block" />
            <span style={{ color: "var(--accent)" }}>Platform</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-[var(--text-body)] font-[400] max-w-[var(--max-width-text)] leading-[1.65]">
            Vizhi is a full-stack computational platform. Engineered for deep
            integration with enterprise infrastructure, localized execution of
            spatial geometry, and instant cloud synchronicity.
          </p>
        </div>
      </div>
    </section>
  );
}
