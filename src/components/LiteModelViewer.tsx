"use client";

import React, { memo, useEffect, useRef } from "react";
import type { CSSProperties } from "react";

let modelViewerImport: Promise<unknown> | null = null;

function ensureModelViewer() {
  if (!modelViewerImport) {
    modelViewerImport = import("@google/model-viewer");
  }

  return modelViewerImport;
}

type LiteModelViewerProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  autoRotate?: boolean;
  cameraControls?: boolean;
  cameraOrbit?: string;
  cameraTarget?: string;
  fieldOfView?: string;
  minCameraOrbit?: string;
  maxCameraOrbit?: string;
  modelScale?: string;
  rotationPerSecond?: string;
  logCameraOnInteraction?: boolean;
};

type ModelViewerElement = HTMLElement & {
  getCameraOrbit?: () => {
    theta: number;
    phi: number;
    radius: number;
  };
  getCameraTarget?: () => {
    x: number;
    y: number;
    z: number;
  };
};

function LiteModelViewer({
  src,
  alt,
  className,
  style,
  autoRotate = false,
  cameraControls = true,
  cameraOrbit,
  cameraTarget,
  fieldOfView,
  minCameraOrbit,
  maxCameraOrbit,
  modelScale,
  rotationPerSecond = "22deg",
  logCameraOnInteraction = false,
}: LiteModelViewerProps) {
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    void ensureModelViewer();
  }, []);

  useEffect(() => {
    if (!modelViewerRef.current || !logCameraOnInteraction) return;

    const currentModelViewer: ModelViewerElement = modelViewerRef.current;

    const toDeg = (radians: number) => Number((radians * 180 / Math.PI).toFixed(2));
    const toFixed = (value: number) => Number(value.toFixed(4));

    function handleCameraChange(event: Event) {
      const detail = (event as CustomEvent<{ source?: string }>).detail;
      if (detail?.source && detail.source !== "user-interaction") return;

      const orbit = currentModelViewer.getCameraOrbit?.();
      const target = currentModelViewer.getCameraTarget?.();

      console.log("[model-viewer camera]", {
        cameraOrbitDeg: orbit
          ? {
              theta: toDeg(orbit.theta),
              phi: toDeg(orbit.phi),
              radius: toFixed(orbit.radius),
            }
          : null,
        cameraTarget: target
          ? {
              x: toFixed(target.x),
              y: toFixed(target.y),
              z: toFixed(target.z),
            }
          : null,
      });
    }

    currentModelViewer.addEventListener("camera-change", handleCameraChange);

    return () => {
      currentModelViewer.removeEventListener("camera-change", handleCameraChange);
    };
  }, [logCameraOnInteraction]);

  return React.createElement("model-viewer", {
    ref: modelViewerRef,
    src,
    alt,
    className,
    "auto-rotate": autoRotate || undefined,
    "camera-controls": cameraControls || undefined,
    "disable-zoom": true,
    loading: "lazy",
    reveal: "auto",
    "shadow-intensity": "0",
    exposure: "1",
    "interaction-prompt": "none",
    "auto-rotate-delay": "0",
    "rotation-per-second": rotationPerSecond,
    "camera-orbit": cameraOrbit,
    "camera-target": cameraTarget,
    "field-of-view": fieldOfView,
    "min-camera-orbit": minCameraOrbit,
    "max-camera-orbit": maxCameraOrbit,
    scale: modelScale,
    "environment-image": "neutral",
    "tone-mapping": "neutral",
    "touch-action": "pan-y",
    suppressHydrationWarning: true,
    style: {
      width: "100%",
      height: "100%",
      display: "block",
      background: "transparent",
      contain: "layout paint size",
      ...style,
    },
  });
}

export default memo(LiteModelViewer);
