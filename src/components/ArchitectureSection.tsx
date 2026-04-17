"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Layers, Cpu, Cloud, Building, ShieldCheck } from "lucide-react";

export default function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const layers = [
    {
      title: "Enterprise Integrations",
      desc: "Live backend synchronization",
      icon: <Building size={24} />,
    },
    {
      title: "Cloud Intelligence",
      desc: "Global distributed compute",
      icon: <Cloud size={24} />,
    },
    {
      title: "Spatial Operating System",
      desc: "Real-world geometric mapping",
      icon: <Layers size={24} />,
    },
    {
      title: "Edge AI Layer",
      desc: "On-device neural processing",
      icon: <ShieldCheck size={24} />,
    },
    {
      title: "Hardware Layer",
      desc: "Precision optical mechanics",
      icon: <Cpu size={24} />,
    },
  ];

  const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-28 sm:py-32 md:py-40 lg:py-48 bg-[#050505] border-t border-b border-white/5 relative overflow-hidden"
    >
      {/* Subtle glowing orb in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 sm:gap-16 lg:gap-20 items-center relative z-10">
        {/* Architecture Stack (Redesigned from 3D to 2D polished flow) */}
        <div className="relative flex flex-col gap-6 order-last lg:order-first">
          {/* Animated Connecting Timeline Line */}
          <div className="absolute left-8 md:left-12 top-10 bottom-10 w-px bg-white/10 z-0">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "bottom" }}
              className="w-full h-full bg-cyan-400 absolute bottom-0 shadow-[0_0_20px_rgba(0,229,255,0.8)]"
            />
          </div>

          <div className="flex flex-col gap-10">
            {layers.map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="relative z-10 flex items-center gap-6 md:gap-8"
              >
                {/* Icon Node */}
                <motion.div
                  className="w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-2xl glass-panel flex items-center justify-center relative bg-black/50"
                  initial={{
                    borderColor: "rgba(255,255,255,0.1)",
                    boxShadow: "0 0 0 rgba(255,255,255,0)",
                  }}
                  whileInView={{
                    borderColor: [
                      "rgba(255,255,255,0.1)",
                      "rgba(255,255,255,0.5)",
                      "rgba(255,255,255,0.2)",
                    ],
                    boxShadow: [
                      "0 0 0 rgba(255,255,255,0)",
                      "0 0 20px rgba(255,255,255,0.35)",
                      "0 0 8px rgba(255,255,255,0.16)",
                    ],
                  }}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <motion.div
                    className="text-white/80"
                    initial={{ scale: 1, opacity: 0.8 }}
                    whileInView={{
                      scale: [1, 1.08, 1],
                      opacity: [0.8, 1, 0.88],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  >
                    {layer.icon}
                  </motion.div>
                  {/* Node pulse */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-white/0"
                    initial={{ opacity: 0 }}
                    whileInView={{
                      opacity: [0, 0.35, 0],
                      scale: [1, 1.06, 1.1],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>

                {/* Text Info */}
                <div className="flex flex-col">
                  <motion.h3
                    className="vizhi-card-title text-white text-xl md:text-2xl font-bold tracking-tight mb-1"
                    initial={{
                      color: "rgba(255,255,255,0.9)",
                      textShadow: "0 0 0 rgba(255,255,255,0)",
                    }}
                    whileInView={{
                      color: [
                        "rgba(255,255,255,0.9)",
                        "rgba(255,255,255,1)",
                        "rgba(255,255,255,0.95)",
                      ],
                      textShadow: [
                        "0 0 0 rgba(255,255,255,0)",
                        "0 0 12px rgba(255,255,255,0.35)",
                        "0 0 4px rgba(255,255,255,0.1)",
                      ],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    {layer.title}
                  </motion.h3>
                  <p className="vizhi-card-copy text-white/50 text-sm md:text-base font-light tracking-wide">
                    {layer.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="flex flex-col gap-6 sm:gap-7 md:gap-8 justify-center h-full">
          <div className="vizhi-kicker flex items-center gap-4 text-cyan-400 font-medium tracking-wide text-sm bg-cyan-950/30 w-fit px-4 py-2 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
            System Architecture
          </div>
          <h2 className="vizhi-section-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white leading-tight mt-1">
            Built as a <br className="hidden md:block" />
            <span className="nitro-text nitro-text-soft drop-shadow-sm">
              Platform
            </span>
          </h2>
          <p className="vizhi-section-lead text-base sm:text-lg md:text-xl text-white/50 font-light max-w-lg mb-2 sm:mb-3 md:mb-4">
            Vizhi is a full-stack computational platform. Engineered for deep
            integration with enterprise infrastructure, localized execution of
            spatial geometry, and instant cloud synchronicity.
          </p>
        </div>
      </div>
    </section>
  );
}
