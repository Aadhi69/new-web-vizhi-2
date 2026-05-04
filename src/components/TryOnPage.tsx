"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import OverlayHUD from "./OverlayHUD";

interface TryOnPageProps {
  type: string;
  title: string;
  imageSrc: string;
  hudContent: ReactNode;
}

export default function TryOnPage({
  type,
  title,
  imageSrc,
  hudContent,
}: TryOnPageProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling and body overflow
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleExit = () => {
    router.push("/#applications");
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black w-full h-full overflow-hidden"
    >
      {/* Layer 0: Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={`Futuristic ${title} Interface Background`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Subtle overlay to improve HUD legibility */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Layer 2: HUD Overlay */}
      <OverlayHUD
        type={type}
        title={title}
        hudContent={hudContent}
        onExit={handleExit}
      />
      {/* Tailwind CSS for glow effect - scoped to this component */}
      <style jsx>{`
        :global(.glow-green) {
          text-shadow:
            0 0 10px #00ff66,
            0 0 20px rgba(0, 255, 102, 0.5);
        }
      `}</style>
    </div>
  );
}
