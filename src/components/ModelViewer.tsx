"use client";

import { useState, useEffect } from "react";
import LiteModelViewer from "./LiteModelViewer";

export default function ModelViewer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give the model a moment to start loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative grid h-full w-full place-items-center overflow-visible cursor-grab active:cursor-grabbing">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[var(--surface-deep)]/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-white border-r-white animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-white/50 animate-spin-reverse" />
            </div>
            <p className="text-sm text-white/60">Loading model...</p>
          </div>
        </div>
      )}
      <LiteModelViewer
        src="/3dmodel.glb"
        alt="Vizhi wearable 3D model"
        cameraOrbit="227.59deg 97.91deg 5.3m"
        cameraTarget="-0.06m 0.08m 0m"
        fieldOfView="36deg"
        minCameraOrbit="auto 45deg 5.3m"
        maxCameraOrbit="auto 120deg 5.3m"
        modelScale="0.72 0.72 0.72"
        style={{
          margin: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
}
