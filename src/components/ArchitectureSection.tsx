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
        { title: "Enterprise Integrations", desc: "Live backend synchronization", icon: <Building size={24} /> },
        { title: "Cloud Intelligence", desc: "Global distributed compute", icon: <Cloud size={24} /> },
        { title: "Spatial Operating System", desc: "Real-world geometric mapping", icon: <Layers size={24} /> },
        { title: "Edge AI Layer", desc: "On-device neural processing", icon: <ShieldCheck size={24} /> },
        { title: "Hardware Layer", desc: "Precision optical mechanics", icon: <Cpu size={24} /> },
    ];

    const lineScale = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

    return (
        <section ref={containerRef} className="py-48 bg-[#050505] border-t border-b border-white/5 relative overflow-hidden">

            {/* Subtle glowing orb in background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

                {/* Architecture Stack (Redesigned from 3D to 2D polished flow) */}
                <div className="relative flex flex-col gap-6 order-last lg:order-first">
                    {/* Animated Connecting Timeline Line */}
                    <div className="absolute left-8 md:left-12 top-10 bottom-10 w-px bg-white/10 z-0">
                        <motion.div
                            style={{ scaleY: lineScale, transformOrigin: 'bottom' }}
                            className="w-full h-full bg-cyan-400 absolute bottom-0 shadow-[0_0_20px_rgba(0,229,255,0.8)]"
                        />
                    </div>

                    <div className="flex flex-col gap-10">
                        {layers.map((layer, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                                className="relative z-10 flex items-center gap-6 md:gap-8 group"
                            >
                                {/* Icon Node */}
                                <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-2xl glass-panel group-hover:border-cyan-500/50 flex items-center justify-center transition-colors duration-500 relative bg-black/50">
                                    <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 group-hover:drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
                                        {layer.icon}
                                    </div>
                                    {/* Node pulse */}
                                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/50 group-hover:animate-ping opacity-20" />
                                </div>

                                {/* Text Info */}
                                <div className="flex flex-col">
                                    <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-1 group-hover:text-cyan-100 transition-colors duration-300">{layer.title}</h3>
                                    <p className="text-white/50 text-sm md:text-base font-light tracking-wide">{layer.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Info Column */}
                <div className="flex flex-col gap-8 justify-center h-full">
                    <div className="flex items-center gap-4 text-cyan-400 font-medium tracking-wide text-sm bg-cyan-950/30 w-fit px-4 py-2 rounded-full border border-cyan-500/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                        System Architecture
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-tight">
                        Built as a <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-sm">Platform</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light max-w-lg mb-4">
                        Vizhi is a full-stack computational platform. Engineered for deep integration with enterprise infrastructure, localized execution of spatial geometry, and instant cloud synchronicity.
                    </p>
                    <div className="flex items-center gap-6">
                        <button className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
                            Explore Architecture
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
