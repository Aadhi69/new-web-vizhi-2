"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function DeviceSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);

  const deviceScale = useTransform(scrollYProgress, [0.3, 0.6], [0.8, 1]);
  const deviceOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const deviceY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

  const featuresOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  const features = [
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
      ref={containerRef}
      className="relative py-28 sm:py-32 md:py-40 lg:py-48 bg-[#050505] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="text-center mb-14 sm:mb-16 md:mb-20 z-10"
        >
          <h2 className="vizhi-section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-3 sm:mb-4 md:mb-5">
            Designed for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Future of Vision
            </span>
          </h2>
          <p className="vizhi-section-lead text-base sm:text-lg md:text-xl text-white/50 font-light max-w-2xl mx-auto">
            A new standard for physical interaction with digital complexity.
          </p>
        </motion.div>

        {/* Abstract Product Hologram representation */}
        <motion.div
          style={{ opacity: deviceOpacity, scale: deviceScale, y: deviceY }}
          className="relative w-full max-w-4xl aspect-video glass-panel rounded-3xl p-1 mb-16 sm:mb-20 md:mb-24 z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent z-0" />

          {/* Abstract interface layers generating the silhouette */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-3/4 h-2/3 border border-cyan-500/20 rounded-[2rem] glow-box bg-black/60 backdrop-blur-md flex items-center justify-center">
              <div className="w-[80%] h-1 bg-cyan-500/50 rounded-full blur-[2px] absolute top-10" />
              <div className="w-[60%] h-[2px] bg-white/20 rounded-full absolute bottom-10" />
              {/* Simulating geometric shapes assembling */}
              <motion.div
                layout
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                className="w-32 h-32 border border-cyan-500/30 rounded-full dashed-border"
              />
              <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--color-vizhi-electric)_0%,_transparent_50%)] opacity-10 blur-3xl z-[-1]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: featuresOpacity }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full z-10"
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-8 rounded-2xl flex flex-col gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/30">
                <div className="w-2 h-2 rounded-full bg-cyan-400 text-glow" />
              </div>
              <h3 className="vizhi-card-title text-xl font-medium text-white">
                {feature.title}
              </h3>
              <p className="vizhi-card-copy text-sm text-white/50">
                {feature.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
