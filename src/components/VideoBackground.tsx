"use client";

import { useEffect, useRef } from "react";

interface VideoBackgroundProps {
  videoSrc: string;
  type: string;
}

export default function VideoBackground({
  videoSrc,
  type,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay may be blocked by browser, user interaction required
      });
    }
  }, [videoSrc]);

  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
        src={videoSrc}
        aria-hidden="true"
      >
        <track kind="captions" />
      </video>
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40 z-0" />
    </div>
  );
}
