"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
// Scripts are loaded dynamically below because MediaPipe lacks ES Modules for Turbopack
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  X,
  ScanLine,
  Crosshair,
  Wifi,
  BatteryCharging,
  AlertTriangle,
  Settings2,
} from "lucide-react";
import { motion } from "framer-motion";

const isBrowser = typeof window !== "undefined";

// --- MATH UTILS ---
const smoothClamp = (val: number, min: number, max: number) => {
  if (val <= min) return min;
  if (val >= max) return max;
  const t = (val - min) / (max - min);
  const smoothT = t * t * (3 - 2 * t);
  return min + smoothT * (max - min);
};

// --- DECOUPLED TRACKING BUFFER ---
const TrackingBuffer = {
  landmarks: null as any,
  isValid: false,
  fpsHistory: [] as number[],
  recentDrops: 0,
};

// --- Main Spatial Math & FaceTracker Engine ---
const FaceTracker = ({
  debugMode,
  isReverseAR,
}: {
  debugMode: boolean;
  isReverseAR?: boolean;
}) => {
  const masterGroupRef = useRef<THREE.Group>(null);
  const pivotCorrectionGroupRef = useRef<THREE.Group>(null);
  const occluderRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Diagnostics explicitly isolated from Master state
  const [debugEyePos, setDebugEyePos] = useState([0, 0, 0]);
  const [debugNoseLowerPos, setDebugNoseLowerPos] = useState([0, 0, 0]);

  const state = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      rot: new THREE.Quaternion(),
      scale: 1,
      computedScale: 1,
      smoothedTemple: viewport.width * 0.5,
      smoothedIPD: viewport.width * 0.1, // Added IPD damping to prevent mathematical scale pulsation natively!
      offsetY: 0,
      offsetZ: 0,
      gazePos: new THREE.Vector3(),
    }),
    [viewport],
  );

  useFrame((_, delta) => {
    if (
      !TrackingBuffer.landmarks ||
      !TrackingBuffer.isValid ||
      TrackingBuffer.landmarks.length === 0
    ) {
      if (masterGroupRef.current) masterGroupRef.current.visible = false;
      return;
    }

    if (masterGroupRef.current && pivotCorrectionGroupRef.current) {
      masterGroupRef.current.visible = true;
      const lms = TrackingBuffer.landmarks;

      const leftEye = lms[33];
      const rightEye = lms[263];
      const noseUpper = lms[168];
      const leftTemple = lms[454];
      const rightTemple = lms[234];
      const chin = lms[152];
      const topForehead = lms[10];

      // 1. ISOTROPIC 3D MAPPING
      // We map MediaPipe's normalized coordinates directly into ThreeJS world space.
      // X and Y are mapped relative to the viewport.
      // Z must be scaled by viewport.width to maintain a 1:1 isometric cube ratio.
      // MediaPipe's Z is negative towards the camera, but ThreeJS is positive towards camera. We invert it.
      const mpToThree = (lm: any) =>
        new THREE.Vector3(
          (lm.x - 0.5) * viewport.width,
          -(lm.y - 0.5) * viewport.height,
          -lm.z * viewport.width,
        );

      const tLeftEye = mpToThree(leftEye);
      const tRightEye = mpToThree(rightEye);
      const tLeftTemple = mpToThree(leftTemple);
      const tRightTemple = mpToThree(rightTemple);
      const tChin = mpToThree(chin);
      const tForehead = mpToThree(topForehead);

      // 2. NOSE BRIDGE ANCHORING OR CENTER FIX
      // Landmark 168 is the point between the eyes on the bridge of the nose.
      const tBridge = mpToThree(lms[168]);

      // If in Reverse AR (wearing mode), we fix the position to the center of the screen
      // but keep the rotation tracked to the head movement.
      const targetPos = isReverseAR ? new THREE.Vector3(0, 0.2, 38) : tBridge;

      // 3. ORTHONORMAL ROTATION SOLVER (True 3D Head Pose)
      const vRight = new THREE.Vector3()
        .subVectors(tLeftTemple, tRightTemple)
        .normalize();
      const vUp = new THREE.Vector3().subVectors(tForehead, tChin).normalize();
      const vForward = new THREE.Vector3()
        .crossVectors(vRight, vUp)
        .normalize();
      const vUpFixed = new THREE.Vector3()
        .crossVectors(vForward, vRight)
        .normalize();

      const visualForward = isReverseAR
        ? vForward.clone().multiplyScalar(-1)
        : vForward;
      const visualRight = isReverseAR
        ? vRight.clone().multiplyScalar(-1)
        : vRight;

      const rotMatrix = new THREE.Matrix4().makeBasis(
        visualRight,
        vUpFixed,
        visualForward,
      );
      const targetQuat = new THREE.Quaternion().setFromRotationMatrix(
        rotMatrix,
      );

      // 4. EYE TRACKING (IRIS GAZE)
      const leftIris = lms[468];
      const rightIris = lms[473];
      let gazeOffset = new THREE.Vector3(0, 0, 0);
      if (leftIris && rightIris) {
        const gazeX =
          ((leftIris.x + rightIris.x) / 2 - (leftEye.x + rightEye.x) / 2) * 5;
        const gazeY =
          -((leftIris.y + rightIris.y) / 2 - (leftEye.y + rightEye.y) / 2) * 5;
        gazeOffset.set(gazeX, gazeY, 0);
      }

      // 5. MATHEMATICAL SCALE STABILIZATION
      const rawTempleWidth = tLeftTemple.distanceTo(tRightTemple);
      state.smoothedTemple = THREE.MathUtils.lerp(
        state.smoothedTemple,
        rawTempleWidth,
        0.15,
      );

      const globalCorrect =
        (window as any).AR_GLOBAL_CORRECT || (isReverseAR ? 2.5 : 0.85);
      const ultimateVisualTargetScale = isReverseAR
        ? globalCorrect
        : state.smoothedTemple * globalCorrect;

      // 6. PRECISE STRUCTURAL Y-DROP & DEPTH
      const verticalDropCalibrationSlider =
        (window as any).AR_Y || (isReverseAR ? 0.0 : 0.15);
      const lockedTargetOffsetY =
        state.smoothedTemple * verticalDropCalibrationSlider;
      const targetOffsetZ = isReverseAR ? 0 : state.smoothedTemple * 0.15;

      // 6. CONTINUOUS VELOCITY DAMPING (Enhanced for "Locked" feel)
      const smoothingPos = 0.25;
      const smoothingRot = 0.2;

      state.pos.lerp(targetPos, smoothingPos);
      state.rot.slerp(targetQuat, smoothingRot);
      state.scale = THREE.MathUtils.lerp(
        state.scale,
        ultimateVisualTargetScale,
        0.2,
      );
      state.offsetY = THREE.MathUtils.lerp(
        state.offsetY,
        lockedTargetOffsetY,
        0.15,
      );
      state.offsetZ = THREE.MathUtils.lerp(state.offsetZ, targetOffsetZ, 0.15);

      // Apply gaze nudge (very subtle)
      state.gazePos.lerp(gazeOffset, 0.1);

      // 6. ABSOLUTE MATRIX TARGET HIERARCHY MAPPING
      masterGroupRef.current.position.copy(state.pos);
      masterGroupRef.current.quaternion.copy(state.rot);
      masterGroupRef.current.scale.set(state.scale, state.scale, state.scale);

      // Local displacement matrix isolated physically inside rotation
      const finalGaze = state.gazePos;
      pivotCorrectionGroupRef.current.position.set(
        finalGaze.x,
        -state.offsetY + finalGaze.y,
        state.offsetZ,
      );

      // Hybrid Occluder Updates
      if (occluderRef.current) {
        // Wait, tForehead and tChin exist in the scope.
        // We use mpToThree variables defined above directly.
        const faceRatioY = tForehead.distanceTo(tChin) / state.smoothedTemple;
        occluderRef.current.scale.set(1.4, faceRatioY * 1.6, 1.8);
        occluderRef.current.position.set(0, -0.2, -0.6);
      }

      // HUD Diagnostics Out
      if (debugMode) {
        setDebugEyePos([targetPos.x, targetPos.y, 0.1]);

        const win = window as any;
        win.AR_DEBUG_IPD = rawTempleWidth; // We reuse this field to show temple width

        win.AR_DEBUG_S_T_WIDTH = state.smoothedTemple;
        win.AR_DEBUG_FINAL_SCALE = ultimateVisualTargetScale;
        win.AR_DEBUG_OFFSET_Y = state.offsetY;
        win.AR_DEBUG_OFFSET_Z = state.offsetZ;
      }
    }
  });

  return (
    <>
      <group ref={masterGroupRef} visible={false}>
        {/* The Invisible Anatomical Occluder */}
        <mesh ref={occluderRef}>
          <sphereGeometry args={[1, 32, 24]} />
          {debugMode ? (
            <meshBasicMaterial color="#ff0000" wireframe />
          ) : (
            <meshBasicMaterial colorWrite={false} depthWrite={true} />
          )}
        </mesh>

        {/* PIVOT DISPLACEMENT SUBSYSTEM */}
        <group ref={pivotCorrectionGroupRef}></group>
      </group>

      {/* GLOBAL SPAWNED DOTS (Decoupled from hierarchy rotational transforms purely for raw verification) */}
      {debugMode && (
        <group>
          {/* BLUE = Ocular Center Base (The Single Unbreakable Target Matrix) */}
          <mesh position={debugEyePos as any}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </group>
      )}
    </>
  );
};

export default function ARTryOnOverlay({
  onClose,
  hud,
  isReverseAR,
}: {
  onClose: () => void;
  hud?: React.ReactNode;
  isReverseAR?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [nativeAspect, setNativeAspect] = useState(4 / 3);
  const [isLowTier, setIsLowTier] = useState(false);
  const [globalScaleCorrect, setGlobalScaleCorrect] = useState(0.85);
  const [calibrationY, setCalibrationY] = useState(0.0);
  const [fovOverride, setFovOverride] = useState(50);
  const [debugMode, setDebugMode] = useState(false);

  useEffect(() => {
    (window as any).AR_GLOBAL_CORRECT = globalScaleCorrect;
    (window as any).AR_Y = calibrationY;
    (window as any).AR_FOV = fovOverride;
  }, [globalScaleCorrect, calibrationY, fovOverride]);

  useEffect(() => {
    if (!isBrowser || !videoRef.current) return;

    let camera: any = null;
    let faceMesh: any = null;
    let lastTime = Date.now();

    const initAR = () => {
      if (!(window as any).FaceMesh || !(window as any).Camera) {
        setTimeout(initAR, 100);
        return;
      }

      const FaceMeshCtor = (window as any).FaceMesh;
      const CameraCtor = (window as any).Camera;

      faceMesh = new FaceMeshCtor({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results: any) => {
        const now = Date.now();
        const fps = 1000 / (now - lastTime);
        lastTime = now;

        TrackingBuffer.fpsHistory.push(fps);
        if (TrackingBuffer.fpsHistory.length > 30)
          TrackingBuffer.fpsHistory.shift();
        const avgFps =
          TrackingBuffer.fpsHistory.reduce((a, b) => a + b, 0) /
          TrackingBuffer.fpsHistory.length;
        if (avgFps < 25) TrackingBuffer.recentDrops++;
        else TrackingBuffer.recentDrops = 0;

        if (TrackingBuffer.recentDrops > 50 && !isLowTier) setIsLowTier(true);
        else if (TrackingBuffer.recentDrops === 0 && isLowTier)
          setIsLowTier(false);

        if (
          results.multiFaceLandmarks &&
          results.multiFaceLandmarks.length > 0
        ) {
          TrackingBuffer.landmarks = results.multiFaceLandmarks[0];
          TrackingBuffer.isValid = true;
          if (!isTracking) setIsTracking(true);
        } else {
          TrackingBuffer.isValid = false;
        }
      });

      camera = new CameraCtor(videoRef.current!, {
        onFrame: async () => {
          if (videoRef.current) {
            const vw = videoRef.current.videoWidth;
            const vh = videoRef.current.videoHeight;
            if (vw && vh) {
              const exactAspect = vw / vh;
              if (Math.abs(nativeAspect - exactAspect) > 0.05) {
                setNativeAspect(exactAspect);
              }
            }

            try {
              await faceMesh.send({ image: videoRef.current });
            } catch {
              // ignore frame errors while the stream initializes
            }
          }
        },
        width: 640,
        height: 480,
      });

      try {
        camera.start();
      } catch (error) {
        console.error("Camera access denied or failed.");
      }
    };

    if (
      document.getElementById("mediapipe-camera") &&
      document.getElementById("mediapipe-facemesh")
    ) {
      initAR();
    } else {
      const script1 = document.createElement("script");
      script1.id = "mediapipe-camera";
      script1.src =
        "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js";
      script1.crossOrigin = "anonymous";
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.id = "mediapipe-facemesh";
      script2.src =
        "https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js";
      script2.crossOrigin = "anonymous";
      document.body.appendChild(script2);

      script2.onload = initAR;
    }

    return () => {
      if (camera) {
        camera.stop();
        camera = null;
      }
      if (faceMesh) {
        faceMesh.close();
        faceMesh = null;
      }
    };
  }, [nativeAspect, isLowTier]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-100 overflow-hidden ${isReverseAR ? "bg-transparent" : "bg-black"}`}
    >
      <button
        onClick={onClose}
        className="group absolute top-8 right-8 z-50 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition-colors hover:bg-black/60"
      >
        <X
          size={24}
          className="transition-transform duration-300 group-hover:rotate-90"
        />
      </button>

      <video
        ref={videoRef}
        className="absolute inset-0 h-px w-px opacity-0 pointer-events-none"
        playsInline
        autoPlay
        muted
      />

      <div className="absolute inset-0 z-20 pointer-events-none">
        {isTracking && (
          <Canvas
            gl={{ alpha: true, antialias: true }}
            camera={{
              position: [0, 0, 50],
              fov: isReverseAR ? 40 : fovOverride,
              near: 0.1,
              far: 1000,
            }}
          >
            <ambientLight intensity={1.5} />
            <Environment preset="city" />
            <directionalLight position={[50, 100, 50]} intensity={3} />
            <pointLight position={[-50, 50, -50]} intensity={1} />
            <FaceTracker debugMode={debugMode} isReverseAR={isReverseAR} />
          </Canvas>
        )}
      </div>
    </div>
  );
}
