"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Model({ url, scale = 1 }: { url: string; scale?: number }) {
  const { scene } = useGLTF(url);
  const model = useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  const initialRotation = useMemo(
    () =>
      [
        THREE.MathUtils.degToRad(11.46),
        THREE.MathUtils.degToRad(-51.57),
        THREE.MathUtils.degToRad(-8.02),
      ] as const,
    [],
  );
  const initialPosition = useMemo(() => [-0.26, 0.15, 0] as const, []);
  const initialScale = 0.706;

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.x = initialRotation[0];
    groupRef.current.rotation.y = initialRotation[1];
    groupRef.current.rotation.z = initialRotation[2];
    groupRef.current.position.x = initialPosition[0];
    groupRef.current.position.y = initialPosition[1];
    groupRef.current.position.z = initialPosition[2];
    groupRef.current.scale.setScalar(initialScale);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} scale={1} />
    </group>
  );
}

export default function ModelViewer() {
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(max-width: 768px), (prefers-reduced-motion: reduce)",
    );
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
        gl={{
          antialias: !lowPowerMode,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <PerspectiveCamera
          makeDefault
          position={[0.404, 0.8176, -4.4259]}
          fov={36}
        />
        <ambientLight intensity={lowPowerMode ? 0.8 : 1.0} />
        <directionalLight
          position={[-2.5, 3.8, 6.5]}
          intensity={lowPowerMode ? 1.8 : 2.2}
          color="#ffffff"
        />
        <directionalLight
          position={[3.5, 2.2, 4.5]}
          intensity={lowPowerMode ? 1.3 : 1.6}
          color="#bfe7ff"
        />
        <directionalLight
          position={[-2, 5.5, -3.5]}
          intensity={lowPowerMode ? 1.2 : 1.6}
          color="#ffffff"
        />
        <pointLight
          position={[0.2, 1.1, 2.6]}
          intensity={lowPowerMode ? 1.5 : 1.9}
          color="#ffffff"
        />
        <pointLight
          position={[-2, 1.9, -2.8]}
          intensity={lowPowerMode ? 0.8 : 1.2}
          color="#7ad7ff"
        />
        <Suspense fallback={null}>
          <Environment preset="city" blur={0.35} />
          <Model url="/3dmodel.glb" />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={!lowPowerMode}
          dampingFactor={0.08}
          target={[-0.06, 0.08, 0]}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/3dmodel.glb");
