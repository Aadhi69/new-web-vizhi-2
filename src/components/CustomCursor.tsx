"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
    const [isEnabled, setIsEnabled] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rafRef = useRef<number | null>(null);
    const latestPosition = useRef({ x: 0, y: 0 });

    const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24 });
    const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24 });

    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!canHover || reduceMotion) {
            return;
        }

        setIsEnabled(true);

        const updateMouse = (e: MouseEvent) => {
            latestPosition.current = { x: e.clientX, y: e.clientY };

            if (rafRef.current !== null) {
                return;
            }

            rafRef.current = requestAnimationFrame(() => {
                mouseX.set(latestPosition.current.x);
                mouseY.set(latestPosition.current.y);
                rafRef.current = null;
            });
        };

        window.addEventListener("mousemove", updateMouse, { passive: true });
        return () => {
            window.removeEventListener("mousemove", updateMouse);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [mouseX, mouseY]);

    if (!isEnabled) {
        return null;
    }

    return (
        <motion.div
            style={{
                x: smoothX,
                y: smoothY,
                translateX: "-50%",
                translateY: "-50%",
            }}
            className="fixed pointer-events-none z-50 h-32 w-32 mix-blend-screen will-change-transform"
        >
            <div className="absolute inset-0 rounded-full bg-cyan-400/8 blur-[32px] pointer-events-none" />
        </motion.div>
    );
}
