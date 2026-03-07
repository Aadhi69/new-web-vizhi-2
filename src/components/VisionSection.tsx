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
        <section ref={containerRef} className="py-64 bg-[#050505] relative flex flex-col items-center justify-center text-center overflow-hidden">
            {/* Ambient Global Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] mix-blend-screen" />
            </div>

            <motion.div
                style={{ filter: `blur(${blurAmount}px)`, opacity: opacityAmount, scale: scaleAmount }}
                className="max-w-4xl px-6 relative z-10 w-full flex flex-col items-center justify-center mt-12 gap-8"
            >
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                    Step Into the Future
                </h2>
                <Link href="/contact" className="px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,229,255,0.3)] text-2xl">
                    Contact Us
                </Link>
            </motion.div>
        </section>
    );
}
