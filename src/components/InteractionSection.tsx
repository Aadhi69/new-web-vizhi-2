"use client";

import { motion } from "framer-motion";
import { Hand, MousePointerClick, RotateCw, ZoomIn } from "lucide-react";

export default function InteractionSection() {
    const gestures = [
        { name: "Pinch", desc: "Zoom spatial data", icon: <ZoomIn /> },
        { name: "Swipe", desc: "Switch intelligent panels", icon: <Hand /> },
        { name: "Rotate", desc: "Rotate 3D structures", icon: <RotateCw /> },
        { name: "Tap", desc: "Select interface elements", icon: <MousePointerClick /> },
    ];

    return (
        <section className="py-32 bg-[#050505] relative border-b border-white/5">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Interaction Hand Visualizer */}
                <div className="relative glass-panel rounded-[3rem] aspect-square flex items-center justify-center p-8 overflow-hidden order-last lg:order-first">
                    <div className="absolute inset-0 bg-gradient-to-bl from-cyan-900/10 via-transparent to-black" />

                    {/* Abstract Representation of hand and interface */}
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], rotateX: [0, 5, 0], rotateY: [0, 10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-64 h-64 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-3xl shadow-[inset_0_0_50px_rgba(0,229,255,0.05)]"
                    >

                        {/* Ring Glow Segment */}
                        <div className="absolute w-24 h-24 border-2 border-cyan-400 rounded-full blur-[4px] opacity-60 animate-pulse text-glow" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="w-32 h-32 border-t-2 border-r-2 border-cyan-300 rounded-full"
                        />

                        {/* UI Elements responding */}
                        {gestures.map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ delay: i * 0.5, duration: 3, repeat: Infinity }}
                                className="absolute w-12 h-12 bg-white/5 border border-white/10 rounded-xl"
                                style={{
                                    top: i % 2 === 0 ? '-20%' : 'auto',
                                    bottom: i % 2 !== 0 ? '-20%' : 'auto',
                                    left: i < 2 ? '-20%' : 'auto',
                                    right: i >= 2 ? '-20%' : 'auto',
                                }}
                            />
                        ))}

                    </motion.div>
                </div>

                <div className="flex flex-col gap-6 z-10">
                    <div className="text-cyan-400 font-medium tracking-wide text-sm bg-cyan-950/30 w-fit px-4 py-2 rounded-full border border-cyan-500/20">
                        Interaction Hardware
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
                        Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-500">Interaction</span>
                    </h2>
                    <p className="text-xl text-white/50 font-light max-w-lg mb-8">
                        The Vizhi patented interaction ring. Natural control. No heavy controllers. No friction.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {gestures.map((gesture, i) => (
                            <motion.div
                                key={i}
                                className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-start gap-4"
                                whileHover={{ scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-cyan-400 p-2 bg-cyan-950/50 rounded-lg">
                                    {gesture.icon}
                                </div>
                                <div>
                                    <h3 className="text-white font-medium mb-1">{gesture.name}</h3>
                                    <p className="text-white/40 text-sm leading-relaxed">{gesture.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
