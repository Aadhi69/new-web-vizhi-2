"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage, PerspectiveCamera } from "@react-three/drei";

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => scene.clone(true), [scene]);

  return <primitive object={model} scale={scale} />;
}

export default function ModelViewer() {
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    const update = () => setLowPowerMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        frameloop={lowPowerMode ? "demand" : "always"}
        dpr={lowPowerMode ? [1, 1.25] : [1, 2]}
        performance={{ min: lowPowerMode ? 0.25 : 0.5 }}
        gl={{ antialias: !lowPowerMode, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.8]} fov={45} />
        <ambientLight intensity={lowPowerMode ? 1.2 : 1.5} />
        <pointLight position={[10, 10, 10]} intensity={lowPowerMode ? 1.5 : 2} />
        <pointLight
          position={[-10, 5, -10]}
          intensity={lowPowerMode ? 1.15 : 1.5}
          color="#ffffff"
        />
        <Suspense fallback={null}>
          <Stage intensity={lowPowerMode ? 1.8 : 2.5} environment="studio" adjustCamera={false}>
            <Model url="/3dmodel.glb" scale={0.72} />
          </Stage>
        </Suspense>
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          enableDamping={!lowPowerMode}
          dampingFactor={0.08}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}
