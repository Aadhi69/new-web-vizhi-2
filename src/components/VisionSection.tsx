"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
        <section ref={containerRef} className="py-64 bg-[#050505] relative flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Ambient Global Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <motion.div
                style={{ filter: `blur(${blurAmount}px)`, opacity: opacityAmount, scale: scaleAmount }}
                className="max-w-4xl px-6 relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-12">
                    A New Computing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-500">Paradigm</span>
                </h2>

                <div className="space-y-6 text-4xl md:text-7xl font-light text-white/90 tracking-tighter leading-tight">
                    <p>Computing should not interrupt reality.</p>
                    <p className="text-white/40 italic">It should integrate with it.</p>
                </div>
            </motion.div>
        </section>
    );
}
