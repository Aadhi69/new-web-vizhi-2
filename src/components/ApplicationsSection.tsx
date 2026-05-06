"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import { useRef } from "react";
import type { PointerEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";

function IndustryParallaxCard({
  industry,
  index,
}: {
  industry: (typeof INDUSTRIES)[0];
  index: number;
}) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), {
    stiffness: 160,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 160,
    damping: 18,
  });
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["18%", "82%"]),
    { stiffness: 130, damping: 20 },
  );
  const layerX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 130,
    damping: 20,
  });
  const layerY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-12, 12]), {
    stiffness: 130,
    damping: 20,
  });
  const hudX = useTransform(layerX, (value) => value * 0.5);
  const hudY = useTransform(layerY, (value) => value * 0.5);
  const sheenBackground = useTransform(
    sheenX,
    (x) =>
      `radial-gradient(circle at ${x} 0%, rgba(255,255,255,0.18), transparent 38%)`,
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

  const router = useRouter();

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      router.push(`/try-on/${industry.title.toLowerCase()}`);
    }
  }

  return (
    <div
      className="snap-center relative h-[460px] w-[300px] shrink-0 sm:h-[510px] sm:w-[350px]"
      style={{ perspective: "1000px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={cardStyle}
        initial="rest"
        whileHover="hover"
        whileFocus="hover"
        onKeyDown={handleKeyDown}
        onClick={() => router.push(`/try-on/${industry.title.toLowerCase()}`)}
        role="button"
        aria-label={`Open ${industry.title} try-on`}
        tabIndex={0}
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -6, scale: 1.025 },
        }}
        transition={{ type: "spring", stiffness: 160, damping: 18 }}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[var(--radius-md)] border border-white/10 bg-black p-[var(--space-sm)] sm:p-[var(--space-md)] shadow-[0_20px_70px_rgba(0,0,0,0.78)] transition-colors duration-[var(--duration-base)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-glow)] focus-visible:border-[var(--border-hover)] focus-visible:shadow-[var(--shadow-glow)]"
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-75 group-focus-visible:opacity-75 transition-opacity duration-300"
          style={{ background: sheenBackground, transform: "translateZ(1px)" }}
        />
        <div
          className="absolute inset-0 bg-black opacity-100 group-hover:opacity-80 group-focus-visible:opacity-80 transition-opacity duration-300"
          style={{ transform: "translateZ(2px)" }}
        />
        <div
          className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${industry.color} opacity-0 group-hover:opacity-20 group-focus-visible:opacity-20 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 transition-opacity duration-300`}
        />

        <motion.div
          variants={{
            rest: { opacity: 0, y: 0 },
            hover: { opacity: 0, y: -10 },
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 z-30 flex items-center justify-center p-8 text-center pointer-events-none"
          style={{ transform: "translateZ(90px)" }}
        />

        <motion.div
          variants={{
            rest: { opacity: 1, y: 0 },
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 flex h-[200px] flex-col items-center justify-start p-4 pt-6 pointer-events-none sm:h-[230px] sm:p-6 sm:pt-8"
          style={{ x: hudX, y: hudY, transform: "translateZ(46px)" }}
        >
          <div className="relative h-full w-full rounded-[2rem] border border-[#00ff44]/10 bg-[#00ff44]/5 flex items-center justify-center pb-6">
            {industry.hud}
          </div>
        </motion.div>

        <motion.div
          className="relative z-20 mt-[var(--space-sm)] flex-1 pointer-events-none sm:mt-[var(--space-md)]"
          style={{ x: layerX, y: layerY, transform: "translateZ(78px)" }}
        >
          <motion.div
            variants={{
              rest: { opacity: 1, y: 0 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex h-full min-h-[170px] flex-col rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--surface-raised)] p-[var(--space-sm)] pb-6 sm:p-[var(--space-md)] shadow-2xl backdrop-blur-xl"
          >
            <div className="mb-[var(--space-2xs)] flex items-center gap-[var(--space-sm)]">
              <div className="bg-[var(--accent-dim)] w-10 h-10 shrink-0 flex items-center justify-center rounded-[var(--radius-sm)] text-[var(--accent)]">
                {industry.icon}
              </div>
              <h3 className="text-[16px] font-[600] text-[var(--text-primary)] leading-tight">
                {industry.title}
              </h3>
            </div>
            <p className="mb-4 flex-1 text-[13px] sm:text-[14px] text-[var(--text-body)] leading-[1.65] font-[400] text-left">
              {industry.desc}
            </p>
            <div className="flex justify-end pointer-events-auto pt-1">
              <Link
                href={`/try-on/${industry.title.toLowerCase()}`}
                className="btn-ghost text-sm"
              >
                Try On
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function ApplicationsSection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(direction: "left" | "right") {
    carouselRef.current?.scrollBy({
      left: direction === "left" ? -380 : 380,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="applications"
      aria-label="Where Intelligence Meets Reality"
      className="section bg-black relative overflow-hidden scroll-mt-28"
    >
      <div className="container z-10 relative text-center mb-[var(--space-lg)] sm:mb-[var(--space-2xl)] flex flex-col items-center reveal">
        <div className="section-label justify-center">
          <span>Use Cases</span>
        </div>
        <h2 className="text-[clamp(28px,5vw,52px)] font-[700] tracking-[-0.03em] text-[var(--text-primary)] mb-[var(--space-2xs)] sm:mb-[var(--space-xs)]">
          Where Intelligence Meets{" "}
          <span style={{ color: "var(--accent)" }} className="italic">
            Reality
          </span>
        </h2>
        <p className="text-[14px] sm:text-[16px] md:text-[17px] text-[var(--text-body)] font-[400] max-w-[var(--max-width-text)] mx-auto mb-[var(--space-md)] sm:mb-[var(--space-lg)] leading-[1.65]">
          Built for industries that demand perfection.
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <button
          type="button"
          aria-label="Previous use cases"
          onClick={() => scrollCarousel("left")}
          className="absolute left-0 sm:left-2 top-1/2 z-20 flex h-9 sm:h-11 w-9 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-black/55 text-[var(--text-primary)] shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-[var(--border-hover)]"
        >
          <ChevronLeft size={20} className="sm:w-[22px]" />
        </button>
        <button
          type="button"
          aria-label="Next use cases"
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 sm:right-2 top-1/2 z-20 flex h-9 sm:h-11 w-9 sm:w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-black/55 text-[var(--text-primary)] shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-[var(--border-hover)]"
        >
          <ChevronRight size={20} className="sm:w-[22px]" />
        </button>

        <div
          ref={carouselRef}
          className="overflow-x-auto overflow-y-hidden applications-carousel no-scrollbar"
        >
          <div className="flex gap-6 w-max py-2">
            {INDUSTRIES.map((ind, i) => (
              <IndustryParallaxCard
                key={`${ind.title}-${i}`}
                industry={ind}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
