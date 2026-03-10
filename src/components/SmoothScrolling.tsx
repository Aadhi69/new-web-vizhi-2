"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import Lenis from "lenis";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
    ssr: false,
});

export default function SmoothScrolling({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            autoRaf: true,
            smoothWheel: true,
        });

        // The autoRaf: true option automatically handles the requestAnimationFrame loop,
        // so we don't need to manually call lenis.raf(time) here.
        // If autoRaf is false, we would uncomment the loop below.
        /*
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        */

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <CustomCursor />
            {children}
        </>
    );
}
