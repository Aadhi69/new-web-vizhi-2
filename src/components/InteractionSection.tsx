"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Center,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MotionStyle } from "framer-motion";
import type { PointerEvent } from "react";
import { useEffect, useState } from "react";
import { Hand, MousePointerClick, RotateCw, ZoomIn } from "lucide-react";

function RingModel() {
  const { scene } = useGLTF("/ring.glb");
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <Center>
      <primitive object={model} scale={0.16} rotation={[0.18, 0, 0]} />
    </Center>
  );
}

function RingViewer() {
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    const update = () => setLowPowerMode(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="h-full w-full cursor-grab active:cursor-grabbing">
      <Canvas
        frameloop={lowPowerMode ? "demand" : "always"}
        dpr={lowPowerMode ? [1, 1.25] : [1, 2]}
        performance={{ min: lowPowerMode ? 0.25 : 0.5 }}
        gl={{ antialias: !lowPowerMode, powerPreference: "high-performance" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 8]} fov={32} />
        <ambientLight intensity={lowPowerMode ? 0.6 : 0.7} />
        <directionalLight position={[3, 4, 5]} intensity={lowPowerMode ? 1.35 : 1.7} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <RingModel />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping={!lowPowerMode}
          dampingFactor={0.08}
          minDistance={8}
          maxDistance={8}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.45}
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/ring.glb");

function RingParallaxCard() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [11, -11]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-13, 13]), {
    stiffness: 150,
    damping: 18,
  });
  const sheenX = useSpring(
    useTransform(pointerX, [-0.5, 0.5], ["18%", "82%"]),
    { stiffness: 120, damping: 20 },
  );
  const layerX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), {
    stiffness: 120,
    damping: 20,
  });
  const layerY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-16, 16]), {
    stiffness: 120,
    damping: 20,
  });
  const lightBackground = useTransform(
    sheenX,
    (x) =>
      `radial-gradient(circle at ${x} 10%, rgba(255,255,255,0.18), transparent 38%)`,
  );
  const cardStyle = {
    rotateX,
    rotateY,
    transformStyle: "preserve-3d",
  } as MotionStyle;

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <div
      className="relative aspect-square order-last lg:order-first reveal reveal-delay-2"
      style={{ perspective: "1200px" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        style={cardStyle}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 150, damping: 18 }}
        className="relative h-full w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[linear-gradient(145deg,#1f1f24,#0a0a0c_58%,#020202)] p-[clamp(20px,4vw,48px)] shadow-[var(--shadow-card)]"
      >
        <motion.div
          className="absolute inset-0 opacity-80"
          style={{
            background: lightBackground,
            z: 1,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.12), transparent 30%, transparent 72%, rgba(255,255,255,0.06)), radial-gradient(circle at 50% 52%, rgba(255,255,255,0.08), transparent 42%)",
            transform: "translateZ(2px)",
          }}
        />

        <div
          className="absolute left-[var(--space-md)] top-[var(--space-md)] z-20 flex items-center gap-2"
          style={{ transform: "translateZ(72px)" }}
        >
          <div className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_18px_rgba(255,255,255,0.65)] animate-pulse" />
          <span className="text-xs font-mono text-white/70">RING_CONTROL</span>
        </div>
        <div
          className="absolute right-[var(--space-md)] top-[var(--space-md)] z-20 rounded-[var(--radius-sm)] border border-white/10 bg-black/30 px-3 py-2 text-[11px] font-mono text-white/55 backdrop-blur-md"
          style={{ transform: "translateZ(78px)" }}
        >
          ROTATE_ONLY
        </div>

        <motion.div
          className="relative z-20 mx-auto h-full w-[78%]"
          style={{ x: layerX, y: layerY, z: 88 }}
        >
          <RingViewer />
        </motion.div>

        <div
          className="absolute bottom-[var(--space-sm)] sm:bottom-[var(--space-md)] left-[var(--space-sm)] sm:left-[var(--space-md)] right-[var(--space-sm)] sm:right-[var(--space-md)] z-20 flex items-end justify-between gap-2 sm:gap-4"
          style={{ transform: "translateZ(74px)" }}
        >
          <div>
            <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.16em] text-white/35">
              Interaction Ring
            </p>
            <p className="text-[13px] sm:text-[15px] text-white/82">
              Spatial command input
            </p>
          </div>
          <span className="text-right text-[10px] sm:text-xs font-mono uppercase text-[var(--text-muted)]">
            Drag to rotate
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function InteractionSection() {
  const gestures = [
    { name: "Pinch", desc: "Zoom spatial data", icon: <ZoomIn /> },
    { name: "Swipe", desc: "Switch intelligent panels", icon: <Hand /> },
    { name: "Rotate", desc: "Rotate 3D structures", icon: <RotateCw /> },
    {
      name: "Tap",
      desc: "Select interface elements",
      icon: <MousePointerClick />,
    },
  ];

  return (
    <section
      aria-label="Precision Interaction"
      className="section bg-[var(--surface-deep)] relative"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-lg)] lg:gap-[var(--space-xl)] items-center">
        <RingParallaxCard />

        <div className="flex flex-col gap-[var(--space-sm)] sm:gap-[var(--space-md)] z-10 reveal order-first lg:order-last">
          <div className="section-label justify-start">
            <span>Interaction</span>
          </div>
          <h2 className="text-[clamp(28px,5vw,52px)] font-[700] tracking-[-0.03em] text-[var(--text-primary)]">
            Precision{" "}
            <span style={{ color: "var(--accent)" }}>Interaction</span>
          </h2>
          <p className="text-[14px] sm:text-[16px] md:text-[17px] text-[var(--text-body)] font-[400] max-w-[var(--max-width-text)] leading-[1.65] mb-[var(--space-sm)] sm:mb-[var(--space-sm)]">
            The Vizhi patented interaction ring. Natural control. No heavy
            controllers. No friction.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-sm)] sm:gap-[var(--space-md)]">
            {gestures.map((gesture, i) => (
              <motion.div
                key={i}
                className="bg-[var(--surface-card)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:shadow-[var(--shadow-card)] p-[var(--space-sm)] sm:p-[var(--space-md)] rounded-[var(--radius-md)] flex items-start gap-3 sm:gap-4 transition-all duration-[var(--duration-base)] ease-[var(--ease-default)]"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-[var(--accent)] p-2 bg-[var(--accent-dim)] rounded-[var(--radius-sm)] shrink-0">
                  {gesture.icon}
                </div>
                <div>
                  <h3 className="text-[14px] sm:text-[15px] text-[var(--text-primary)] font-[600] tracking-[-0.01em] mb-[var(--space-2xs)]">
                    {gesture.name}
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[var(--text-body)] leading-[1.65]">
                    {gesture.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
