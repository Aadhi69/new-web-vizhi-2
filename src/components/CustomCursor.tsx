"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isClient, setIsClient] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the movement using spring physics for high-end cinematic feel
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

    useEffect(() => {
        setIsClient(true);
        const updateMouse = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMouse);
        return () => window.removeEventListener("mousemove", updateMouse);
    }, [mouseX, mouseY]);

    if (!isClient) return null;

    return (
        <motion.div
            style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            className="fixed pointer-events-none z-50 w-64 h-64 mix-blend-screen"
        >
            <div className="absolute inset-0 bg-cyan-400/10 blur-[50px] rounded-full pointer-events-none" />
        </motion.div>
    );
}
