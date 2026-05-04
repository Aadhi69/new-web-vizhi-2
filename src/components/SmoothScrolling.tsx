"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useReveal } from "@/hooks/useReveal";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  useReveal();
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)",
    ).matches;
    const smallViewport = window.matchMedia("(max-width: 768px)").matches;

    setShowCursor(!reduceMotion && !coarsePointer && !smallViewport);

    // Native scrolling is smoother and more battery-efficient on touch/smaller devices.
    if (reduceMotion || coarsePointer || smallViewport) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      autoRaf: true,
      smoothWheel: true,
      wheelMultiplier: 1.1,
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
      {showCursor ? <CustomCursor /> : null}
      {children}
    </>
  );
}
