"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center start"],
  });

  const blurAmount = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const opacityAmount = useTransform(scrollYProgress, [0, 0.5], [0.1, 1]);
  const scaleAmount = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section
      id="vision"
      ref={containerRef}
      aria-label="Vizhi Vision for the Future"
      className="section bg-[var(--surface-deep)] relative flex flex-col items-center justify-center text-center overflow-hidden scroll-mt-28"
    >
      {/* Atmosphere glow */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle 800px at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: opacityAmount,
          scale: scaleAmount,
        }}
        className="max-w-[var(--max-width-narrow)] px-[var(--page-gutter)] relative z-10 w-full flex flex-col items-center justify-center mt-6 sm:mt-12 gap-[var(--space-sm)] sm:gap-[var(--space-md)] reveal"
      >
        <div className="section-label justify-center">
          <span>The Next Interface</span>
        </div>
        <h2 className="text-[clamp(36px,6vw,72px)] font-[800] tracking-[-0.04em] text-[var(--text-primary)] leading-[1.1]">
          Step Into the <span style={{ color: "var(--accent)" }}>Future</span>
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-3 sm:gap-[var(--space-sm)] mt-[var(--space-sm)] sm:mt-[var(--space-md)]">
          <Link href="/contact" className="btn-primary">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
