"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Battery, BatteryCharging, Zap } from "lucide-react";

export default function BatterySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const sectionOpacity = useTransform(scrollYProgress, [0.0, 0.15], [0, 1]);
    const slideProgress = useTransform(scrollYProgress, [0.15, 0.30], [0, 100]);
    const newSlideProgress = useTransform(scrollYProgress, [0.25, 0.40], [100, 0]);

    // Deplete as we scroll into the section
    const levelProgress = useTransform(scrollYProgress, [0.05, 0.15], ["100%", "5%"]);
    // Swap battery to filling state
    const newLevelProgress = useTransform(scrollYProgress, [0.35, 0.55], ["5%", "100%"]);

    return (
        <section ref={containerRef} className="relative py-48 bg-[#0a0a0a] overflow-hidden border-t border-white/5 border-b">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Text Details */}
                <motion.div style={{ opacity: sectionOpacity }} className="flex flex-col gap-6 z-10">
                    <div className="flex items-center gap-4 text-cyan-400 font-medium tracking-wide text-sm bg-cyan-950/30 w-fit px-4 py-2 rounded-full border border-cyan-500/20">
                        <Zap size={16} />
                        <span>Patented Power System</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                        Zero Downtime <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-green-500">Power</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light max-w-lg">
                        Vizhi’s patented hot-swappable battery system. Continuous operation for the real-world professional without ever losing power or unsaved context.
                    </p>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full text-glow" />
                            <p className="text-white/80 font-medium">Work without interruption.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full text-glow" />
                            <p className="text-white/80 font-medium">Swap power instantly.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full text-glow" />
                            <p className="text-white/80 font-medium">Built for continuous intelligence.</p>
                        </div>
                    </div>
                </motion.div>

                {/* Animation Display */}
                <div className="relative glass-panel rounded-[2rem] p-12 aspect-square flex items-center justify-center overflow-hidden">
                    {/* HUD overlay indicating continuous run state */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse text-glow" />
                        <span className="text-cyan-400 text-xs font-mono">SYS_RUNNING</span>
                    </div>

                    {/* Battery Bay */}
                    <div className="w-32 h-64 border border-white/10 rounded-2xl relative overflow-hidden bg-black flex flex-col items-center p-2 shadow-inner">

                        {/* Battery Depleting */}
                        <motion.div
                            style={{
                                y: slideProgress,
                                opacity: useTransform(scrollYProgress, [0.15, 0.30], [1, 0])
                            }}
                            className="w-full flex-grow bg-white/5 rounded-xl flex flex-col justify-end p-2 border border-white/5 relative items-center"
                        >
                            <Battery size={24} className="text-white/30 absolute top-4" />
                            <motion.div
                                className="w-full bg-red-500/80 rounded-lg transition-colors"
                                style={{ height: levelProgress }}
                            />
                        </motion.div>

                        {/* Battery Entering */}
                        <motion.div
                            style={{
                                y: newSlideProgress,
                                opacity: useTransform(scrollYProgress, [0.25, 0.40], [0, 1])
                            }}
                            className="absolute top-2 w-[calc(100%-16px)] h-[calc(100%-16px)] bg-white/10 rounded-xl flex flex-col justify-end p-2 border border-green-500/30"
                        >
                            <BatteryCharging size={24} className="text-green-400 absolute top-4 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
                            <motion.div
                                className="w-full bg-green-500/80 rounded-lg transition-colors"
                                style={{ height: newLevelProgress }}
                            />
                        </motion.div>

                    </div>

                    <div className="absolute bottom-6 right-6 flex items-center gap-2">
                        <span className="text-white/40 text-xs font-mono uppercase">Internal backup active</span>
                    </div>
                </div>

            </div>
        </section>
    );
}
