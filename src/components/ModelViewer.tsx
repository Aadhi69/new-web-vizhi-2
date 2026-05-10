"use client";

import LiteModelViewer from "./LiteModelViewer";

export default function ModelViewer() {
  return (
    <div className="grid h-full w-full place-items-center overflow-visible cursor-grab active:cursor-grabbing">
      <LiteModelViewer
        src="/3dmodel.glb"
        alt="Vizhi wearable 3D model"
        cameraOrbit="227.59deg 97.91deg 5.3m"
        cameraTarget="-0.06m 0.08m 0m"
        fieldOfView="36deg"
        minCameraOrbit="auto 45deg 5.3m"
        maxCameraOrbit="auto 120deg 5.3m"
        modelScale="0.72 0.72 0.72"
        logCameraOnInteraction
        style={{
          margin: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
    </div>
  );
}
