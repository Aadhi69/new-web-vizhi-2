"use client";

import { motion } from "framer-motion";
import { Hand, MousePointerClick, RotateCw, ZoomIn } from "lucide-react";

export default function InteractionSection() {
  const gestures = [
    {
      name: "Pinch",
      desc: "Zoom spatial data",
      icon: <ZoomIn size={18} />,
      id: "01",
    },
    {
      name: "Swipe",
      desc: "Switch intelligent panels",
      icon: <Hand size={18} />,
      id: "02",
    },
    {
      name: "Rotate",
      desc: "Rotate 3D structures",
      icon: <RotateCw size={18} />,
      id: "03",
    },
    {
      name: "Tap",
      desc: "Select interface elements",
      icon: <MousePointerClick size={18} />,
      id: "04",
    },
  ];

  return (
    <section className="py-28 sm:py-32 md:py-40 lg:py-48 bg-[#050505] relative border-b border-white/5">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        <div className="relative h-176 rounded-[2.25rem] border border-white/20 bg-white/3 p-8 sm:p-10 overflow-hidden order-last lg:order-first flex items-center justify-center">
          <div className="absolute inset-0 bg-linear-to-bl from-white/8 via-transparent to-black" />
          <div className="absolute inset-6 rounded-[1.8rem] border border-white/10" />

          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              rotateX: [0, 4, 0],
              rotateY: [0, 8, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-72 h-72 border border-white/25 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[inset_0_0_80px_rgba(255,255,255,0.06)]"
          >
            <div className="absolute w-24 h-24 border-2 border-white/60 rounded-full blur-[2px] opacity-70 animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-36 h-36 border-t-2 border-r-2 border-white/70 rounded-full"
            />

            {gestures.map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], opacity: [0.45, 1, 0.45] }}
                transition={{ delay: i * 0.45, duration: 3, repeat: Infinity }}
                className="absolute w-12 h-12 bg-white/5 border border-white/20 rounded-xl"
                style={{
                  top: i % 2 === 0 ? "-16%" : "auto",
                  bottom: i % 2 !== 0 ? "-16%" : "auto",
                  left: i < 2 ? "-16%" : "auto",
                  right: i >= 2 ? "-16%" : "auto",
                }}
              />
            ))}
          </motion.div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-white/45 whitespace-nowrap">
            Ring Signal: Stable
          </div>
        </div>

        <div className="relative h-176 rounded-[2.25rem] p-8 sm:p-10 flex flex-col">
          <div className="vizhi-kicker text-white/85 font-medium tracking-wide text-sm bg-white/5 w-fit px-4 py-2 rounded-full border border-white/20">
            Interaction Hardware
          </div>
          <h2 className="vizhi-section-title text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-white mt-4">
            Precision <span className="text-white/55 italic">Interaction</span>
          </h2>
          <p className="vizhi-section-lead text-base sm:text-lg text-white/50 font-light mt-4 mb-8 max-w-xl">
            The Vizhi patented interaction ring. Natural control. No heavy
            controllers. No friction.
          </p>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-5 flex-1">
            {gestures.map((gesture, i) => (
              <motion.div
                key={i}
                className="group h-full p-5 sm:p-6 rounded-2xl border border-white/15 bg-white/3 hover:bg-white/6 hover:border-white/30 transition-all duration-300 flex flex-col"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-white p-2.5 bg-white/10 rounded-lg border border-white/20">
                    {gesture.icon}
                  </div>
                  <span className="font-mono text-[11px] tracking-[0.15em] text-white/35">
                    {gesture.id}
                  </span>
                </div>

                <div className="mt-auto">
                  <h3 className="vizhi-card-title text-white font-semibold mb-1.5">
                    {gesture.name}
                  </h3>
                  <p className="vizhi-card-copy text-white/55 text-sm leading-relaxed">
                    {gesture.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
