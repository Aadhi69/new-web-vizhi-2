"use client";

import { motion } from "framer-motion";
import { Activity, Cog, Briefcase, GraduationCap, Map, ArrowRight, HeartPulse, ShieldCheck, Database, Focus, Navigation } from "lucide-react";

export default function ApplicationsSection() {
    const industries = [
        {
            title: "Healthcare",
            desc: "Real-time patient intelligence delivered directly into a clinician’s field of view.",
            icon: <Activity />,
            color: "from-blue-500 to-cyan-500",
            hud: (
                <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
                    <div className="flex justify-between w-full text-[10px] sm:text-xs">
                        <span>14:00</span>
                        <span>100% 🔋</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center py-4">
                        <HeartPulse size={36} className="text-[#00ff44]" />
                        <div className="text-3xl font-bold tracking-tight">85 BPM</div>
                        <div className="text-xs">O2: 98% | BP: 120/80</div>
                    </div>
                    <div className="text-[10px] text-center mt-auto uppercase">Vitals Stable</div>
                </div>
            )
        },
        {
            title: "Manufacturing",
            desc: "Contextual instructions and diagnostics delivered directly to workers.",
            icon: <Cog />,
            color: "from-orange-500 to-red-500",
            hud: (
                <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
                    <div className="flex justify-between w-full text-[10px] sm:text-xs">
                        <span>14:45</span>
                        <span>100% 🔋</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center py-4">
                        <ShieldCheck size={36} className="text-[#00ff44]" />
                        <div className="text-3xl font-bold tracking-tight">45 Nm</div>
                        <div className="text-xs">TORQUE DELIVERED</div>
                    </div>
                    <div className="text-[10px] text-center mt-auto uppercase">Temp: 85°C | Optimal</div>
                </div>
            )
        },
        {
            title: "Enterprise Operations",
            desc: "Live operational data integrated with physical facilities.",
            icon: <Briefcase />,
            color: "from-purple-500 to-pink-500",
            hud: (
                <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
                    <div className="flex justify-between w-full text-[10px] sm:text-xs">
                        <span>09:15</span>
                        <span>100% 🔋</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center py-4">
                        <Database size={36} className="text-[#00ff44]" />
                        <div className="text-3xl font-bold tracking-tight">94%</div>
                        <div className="text-xs">EFFICIENCY RATING</div>
                    </div>
                    <div className="text-[10px] text-center mt-auto uppercase">Supply Chain: Nominal</div>
                </div>
            )
        },
        {
            title: "Education",
            desc: "Holographic interaction with complex academic subjects.",
            icon: <GraduationCap />,
            color: "from-green-500 to-emerald-500",
            hud: (
                <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
                    <div className="flex justify-between w-full text-[10px] sm:text-xs">
                        <span>11:30</span>
                        <span>100% 🔋</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center py-4">
                        <Focus size={36} className="text-[#00ff44]" />
                        <div className="text-3xl font-bold tracking-tight">2.5X</div>
                        <div className="text-xs">ZOOM MULTIPLIER</div>
                    </div>
                    <div className="text-[10px] text-center mt-auto uppercase">Module: Cortex Anatomy</div>
                </div>
            )
        },
        {
            title: "Field Services",
            desc: "On-site schematic overlays for remote engineering.",
            icon: <Map />,
            color: "from-yellow-500 to-amber-500",
            hud: (
                <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
                    <div className="flex justify-between w-full text-[10px] sm:text-xs">
                        <span>16:00</span>
                        <span>100% 🔋</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center py-4">
                        <div className="flex items-center gap-4">
                            <ArrowRight size={48} className="text-[#00ff44]" />
                            <div className="text-4xl font-bold tracking-tight">200m</div>
                        </div>
                        <div className="text-sm mt-2">Enter Yu Road</div>
                    </div>
                    <div className="text-[10px] text-center mt-auto uppercase flex justify-between w-full">
                        <span>16:45 ARRIVED</span>
                        <span>5 KM/H</span>
                        <span>1.5 KM</span>
                    </div>
                </div>
            )
        },
        {
            title: "Defence",
            desc: "Tactical overlays and situational awareness on the battlefield.",
            icon: <ShieldCheck />,
            color: "from-gray-500 to-slate-500",
            hud: (
                <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
                    <div className="flex justify-between w-full text-[10px] sm:text-xs">
                        <span>14:45</span>
                        <span>100% 🔋</span>
                    </div>
                    <div className="flex flex-col gap-1 items-center justify-center py-4">
                        <ShieldCheck size={36} className="text-[#00ff44]" />
                        <div className="text-3xl font-bold tracking-tight">ACTIVE</div>
                        <div className="text-xs">DEFENCE SHIELD</div>
                    </div>
                    <div className="text-[10px] text-center mt-auto uppercase">Status: Secure</div>
                </div>
            )
        },
    ];

    return (
        <section className="py-32 bg-[#050505] relative overflow-hidden">
            {/* Background radial gradient */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 z-10 relative text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white mb-6">
                    Where Intelligence Meets <span className="text-white/40 italic">Reality</span>
                </h2>
                <p className="text-xl text-white/50 font-light max-w-2xl mx-auto">
                    Built for industries that demand perfection.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 overflow-hidden pb-12">
                <div
                    className="flex gap-6 w-max animate-infinite-scroll will-change-transform"
                >
                    {[...industries, ...industries].map((ind, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }}
                            className="snap-center relative w-[300px] h-[400px] sm:w-[350px] sm:h-[450px] glass-panel group rounded-[2rem] p-8 flex flex-col justify-end overflow-hidden cursor-pointer shrink-0"
                        >
                            {/* Overlay AR interface animation */}
                            <div className="absolute inset-0 bg-black opacity-80 z-0 transition-opacity duration-500 group-hover:opacity-90" />

                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${ind.color} opacity-5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity duration-700`} />

                            {/* Animated Inner Bright Green UI Overlay (Visible on Hover / subtle by default) */}
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-95 group-hover:scale-100 ease-out pointer-events-none">
                                {/* Subtle glowing lens effect behind the UI */}
                                <div className="absolute inset-4 rounded-[2rem] border border-[#00ff44]/10 bg-[#00ff44]/5 flex items-center justify-center">
                                    {ind.hud}
                                </div>
                            </div>

                            {/* Standard Card Info (Fades out when hovered) */}
                            <div className="z-20 relative group-hover:opacity-0 transition-opacity duration-300">
                                <div className="bg-white/10 w-12 h-12 flex items-center justify-center rounded-xl mb-6 text-white transition-transform duration-500">
                                    {ind.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">{ind.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed font-light">{ind.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
