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
}: LiteModelViewerProps) {
  const modelViewerRef = useRef<ModelViewerElement | null>(null);

  useEffect(() => {
    void ensureModelViewer();
  }, []);

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
    "touch-action": "none",
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
