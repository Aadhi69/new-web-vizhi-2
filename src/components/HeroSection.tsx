"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    // We map the scroll progress of the hero container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Scene 1: Information is everywhere. (visible by default)
    const scene1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2, 0.25], [1, 1, 1, 0]);
    const scene1Y = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // Scene 2: But access is broken.
    const scene2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.5], [0, 1, 1, 0]);
    const scene2Y = useTransform(scrollYProgress, [0.25, 0.5], [50, -50]);

    // Scene 3: Introducing VIZHI. (Sunrise effect)
    const scene3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const scene3Y = useTransform(scrollYProgress, [0.5, 0.75], [50, -50]);
    const scene3Scale = useTransform(scrollYProgress, [0.5, 0.75], [0.9, 1.1]);

    // Sunrise Glow Effect
    const sunriseOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
    const sunriseY = useTransform(scrollYProgress, [0.5, 0.65], [100, 0]);

    // Scene 4: The Next Interface for Human Intelligence.
    const scene4Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]);
    const scene4Y = useTransform(scrollYProgress, [0.75, 1], [100, 0]);
    const glassesOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 0.5]);
    const glassesScale = useTransform(scrollYProgress, [0.85, 1], [1.1, 1]);

    // Background particles effect scale / blur
    const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
    const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.3, 0.1]);

    // Scroll Prompt: visible in the first 3 frames
    const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.7, 0.75], [0.4, 0.4, 0]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            {/* Sticky container to hold the animating elements */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Abstract Particle Background */}
                <motion.div
                    style={{ scale: bgScale, opacity: bgOpacity }}
                    className="absolute inset-0 z-0 pointer-events-none"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-vizhi-electric)_0%,_transparent_50%)] opacity-20 blur-[100px]" />
                    {/* Abstract representation of particles/neural net */}
                    <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay" />
                </motion.div>

                {/* Scene 1 */}
                <motion.div style={{ opacity: scene1Opacity, y: scene1Y }} className="absolute z-10 text-center px-4">
                    <h2 className="text-4xl md:text-7xl font-light text-white/90 tracking-tight">
                        Technology should adapt to the way <span className="text-glow text-white font-medium">humans work.</span>
                    </h2>
                </motion.div>

                {/* Scroll Prompt */}
                <motion.div
                    style={{ opacity: scrollPromptOpacity }}
                    className="absolute bottom-10 z-30 flex flex-col items-center justify-center pointer-events-none"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                    <span className="text-white/30 text-xs mb-2 uppercase tracking-widest">Scroll</span>
                    <ChevronDown className="text-white/30" size={24} />
                </motion.div>

                {/* Scene 2 */}
                <motion.div style={{ opacity: scene2Opacity, y: scene2Y }} className="absolute z-10 text-center px-4">
                    <h2 className="text-4xl md:text-7xl font-light text-white/90 tracking-tight">
                        Not the <span className="text-white/40 italic">other way around.</span>
                    </h2>
                </motion.div>

                {/* Scene 3 */}
                <motion.div style={{ opacity: scene3Opacity, y: scene3Y, scale: scene3Scale }} className="absolute z-10 text-center flex flex-col items-center justify-center pointer-events-none">
                    <motion.div
                        style={{ opacity: sunriseOpacity, y: sunriseY }}
                        animate={{ scale: [1, 1.05, 1], filter: ["blur(80px)", "blur(100px)", "blur(80px)"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-200%] md:bottom-[-150%] left-1/2 -translate-x-1/2 w-[150vw] md:w-[100vw] h-[50vh] rounded-[100%] bg-gradient-to-t from-cyan-600 via-blue-500 to-transparent blur-[80px] pointer-events-none mix-blend-screen"
                    />
                    <h2 className="text-6xl md:text-9xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_40px_rgba(0,229,255,0.8)] z-20">
                        Introducing Vizhi.
                    </h2>
                </motion.div>

                {/* Scene 4 - Final Hero Output */}
                <motion.div style={{ opacity: scene4Opacity, y: scene4Y }} className="absolute z-20 w-full max-w-5xl px-6 mx-auto text-center flex flex-col items-center">
                    <motion.div style={{ opacity: glassesOpacity, scale: glassesScale }} className="absolute -top-32 md:-top-48 opacity-40 z-[-1] pointer-events-none">
                        {/* Silhouette of glasses using geometric gradients as placeholder */}
                        <div className="w-[300px] md:w-[600px] h-[100px] md:h-[150px] border-t-2 border-white/20 rounded-[100%] blur-[2px] bg-gradient-to-b from-cyan-500/10 to-transparent" />
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter text-white mb-6 uppercase">
                        Spatial <br className="hidden md:block" /> Intelligence
                    </h1>
                    <p className="text-lg md:text-2xl text-white/60 font-light max-w-3xl mb-12">
                        At Vizhi, we use Augmented Reality to transform how you interact with information, turning the world into your interface.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
