"use client";

import { motion } from "framer-motion";

export default function Footer() {
    const links = ["Technology", "Applications", "Vision", "Contact"];

    return (
        <footer className="bg-[#050505] border-t border-white/10 pt-32 pb-16 relative overflow-hidden">

            {/* Subtle bottom glow */}
            <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-cyan-950/20 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">

                {/* Brand */}
                <div className="space-y-6 lg:col-span-2">
                    <h2 className="text-3xl font-bold tracking-tighter text-white uppercase">Vizhi</h2>
                    <p className="text-white/40 text-sm max-w-xs font-light tracking-wide">
                        The next interface for human intelligence. Integrating digital computing seamlessly with reality.
                    </p>
                    <div className="flex gap-4">
                        {/* Social Links Placeholders */}
                        {["X", "IN", "GH"].map((social, i) => (
                            <div key={i} className="w-10 h-10 border border-white/20 hover:border-cyan-400 rounded-full flex items-center justify-center text-white/60 hover:text-cyan-400 transition-colors cursor-pointer glass-panel-hover text-sm">
                                {social}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="space-y-6">
                    <h3 className="text-white font-medium uppercase text-sm tracking-widest">Platform</h3>
                    <ul className="space-y-4">
                        {links.slice(0, 3).map((link, i) => (
                            <li key={i}>
                                <a href="#" className="text-white/50 hover:text-white transition-colors text-sm underline-offset-4 hover:underline">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-6">
                    <h3 className="text-white font-medium uppercase text-sm tracking-widest">Company</h3>
                    <ul className="space-y-4">
                        {links.slice(3).map((link, i) => (
                            <li key={i}>
                                <a href="#" className="text-white/50 hover:text-white transition-colors text-sm underline-offset-4 hover:underline">
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-32 text-center relative z-10 flex flex-col items-center border-t border-white/5 pt-12"
            >
                <p className="text-white/30 text-xs font-mono tracking-widest uppercase mb-4">
                    © {new Date().getFullYear()} Vizhixr. All rights reserved.
                </p>
                <span className="text-white/60 text-sm font-medium tracking-wide">
                    Engineered in Tamil Nadu
                </span>
            </motion.div>
        </footer>
    );
}
