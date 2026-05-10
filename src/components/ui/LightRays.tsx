"use client";

import { useEffect, useRef, useState } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./LightRays.css";

const DEFAULT_COLOR = "#ffffff";

type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

type LightRaysProps = {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  intensity?: number;
  opacity?: number;
  maxDpr?: number;
  fps?: number;
  className?: string;
};

type Uniform<T> = { value: T };

type LightRaysUniforms = {
  iTime: Uniform<number>;
  iResolution: Uniform<[number, number]>;
  rayPos: Uniform<[number, number]>;
  rayDir: Uniform<[number, number]>;
  raysColor: Uniform<[number, number, number]>;
  raysSpeed: Uniform<number>;
  lightSpread: Uniform<number>;
  rayLength: Uniform<number>;
  pulsating: Uniform<number>;
  fadeDistance: Uniform<number>;
  saturation: Uniform<number>;
  mousePos: Uniform<[number, number]>;
  mouseInfluence: Uniform<number>;
  noiseAmount: Uniform<number>;
  distortion: Uniform<number>;
  intensity: Uniform<number>;
  opacity: Uniform<number>;
};

const canCreateWebGLContext = () => {
  const canvas = document.createElement("canvas");
  const context =
    canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true }) ||
    canvas.getContext("experimental-webgl", {
      failIfMajorPerformanceCaveat: true,
    }) as WebGLRenderingContext | null;

  if (!context) return false;

  const loseContext = context.getExtension("WEBGL_lose_context");
  loseContext?.loseContext();

  return true;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return match
    ? [
        parseInt(match[1], 16) / 255,
        parseInt(match[2], 16) / 255,
        parseInt(match[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (origin: RaysOrigin, w: number, h: number) => {
  const outside = 0.2;

  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

export default function LightRays({
  raysOrigin = "top-center",
  raysColor = DEFAULT_COLOR,
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
  intensity = 1,
  opacity = 1,
  maxDpr = 1.25,
  fps = 30,
  className = "",
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const uniformsRef = useRef<LightRaysUniforms | null>(null);
  const rendererRef = useRef<Renderer | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationIdRef = useRef<number | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const cleanupFunctionRef = useRef<(() => void) | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [webGLDisabled, setWebGLDisabled] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current || webGLDisabled) return;

    cleanupFunctionRef.current?.();
    cleanupFunctionRef.current = null;

    const initializeWebGL = async () => {
      const container = containerRef.current;
      if (!container) return;

      await new Promise((resolve) => window.setTimeout(resolve, 10));
      if (!containerRef.current) return;

      if (!canCreateWebGLContext()) {
        setWebGLDisabled(true);
        return;
      }

      let renderer: Renderer;

      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio, maxDpr),
          alpha: true,
        });
      } catch (error) {
        console.warn("LightRays WebGL unavailable:", error);
        setWebGLDisabled(true);
        return;
      }

      rendererRef.current = renderer;

      const gl = renderer.gl;
      if (!gl) {
        setWebGLDisabled(true);
        return;
      }

      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        setWebGLDisabled(true);
        cleanupFunctionRef.current?.();
        cleanupFunctionRef.current = null;
      };

      gl.canvas.addEventListener("webglcontextlost", handleContextLost, false);

      while (containerRef.current.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
      containerRef.current.appendChild(gl.canvas);

      const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

      const frag = `precision highp float;

uniform float iTime;
uniform vec2  iResolution;

uniform vec2  rayPos;
uniform vec2  rayDir;
uniform vec3  raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float pulsating;
uniform float fadeDistance;
uniform float saturation;
uniform vec2  mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;
uniform float intensity;
uniform float opacity;

varying vec2 vUv;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);
  float pulse = pulsating > 0.5 ? (0.8 + 0.2 * sin(iTime * speed * 3.0)) : 1.0;

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor * pulse;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 coord = vec2(fragCoord.x, iResolution.y - fragCoord.y);
  vec2 finalRayDir = rayDir;

  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349,
                           1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) *
               rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234,
                           1.1 * raysSpeed);

  fragColor = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    fragColor.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  fragColor.x *= 0.1 + brightness * 0.8;
  fragColor.y *= 0.3 + brightness * 0.6;
  fragColor.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));
    fragColor.rgb = mix(vec3(gray), fragColor.rgb, saturation);
  }

  fragColor.rgb *= raysColor * intensity;
  fragColor.a *= opacity;
}

void main() {
  vec4 color;
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}`;

      const uniforms: LightRaysUniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToRgb(raysColor) },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1 : 0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
        intensity: { value: intensity },
        opacity: { value: opacity },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });
      const mesh = new Mesh(gl, { geometry, program });
      meshRef.current = mesh;

      const updatePlacement = () => {
        if (!containerRef.current || !rendererRef.current) return;

        rendererRef.current.dpr = Math.min(window.devicePixelRatio, maxDpr);

        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        rendererRef.current.setSize(wCSS, hCSS);

        const dpr = rendererRef.current.dpr;
        const w = wCSS * dpr;
        const h = hCSS * dpr;

        uniforms.iResolution.value = [w, h];

        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor as [number, number];
        uniforms.rayDir.value = dir as [number, number];
      };

      let lastFrameTime = 0;
      const minFrameInterval = 1000 / Math.max(1, fps);

      const loop = (time: number) => {
        if (!rendererRef.current || !uniformsRef.current || !meshRef.current) {
          return;
        }

        if (document.hidden || time - lastFrameTime < minFrameInterval) {
          animationIdRef.current = window.requestAnimationFrame(loop);
          return;
        }
        lastFrameTime = time;

        uniforms.iTime.value = time * 0.001;

        if (followMouse && mouseInfluence > 0) {
          const smoothing = 0.92;

          smoothMouseRef.current.x =
            smoothMouseRef.current.x * smoothing +
            mouseRef.current.x * (1 - smoothing);
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * smoothing +
            mouseRef.current.y * (1 - smoothing);

          uniforms.mousePos.value = [
            smoothMouseRef.current.x,
            smoothMouseRef.current.y,
          ];
        }

        try {
          rendererRef.current.render({ scene: meshRef.current });
          animationIdRef.current = window.requestAnimationFrame(loop);
        } catch (error) {
          console.warn("WebGL rendering error:", error);
        }
      };

      window.addEventListener("resize", updatePlacement);
      updatePlacement();
      animationIdRef.current = window.requestAnimationFrame(loop);

      cleanupFunctionRef.current = () => {
        if (animationIdRef.current) {
          window.cancelAnimationFrame(animationIdRef.current);
          animationIdRef.current = null;
        }

        window.removeEventListener("resize", updatePlacement);

        try {
          const canvas = renderer.gl.canvas;
          canvas.removeEventListener("webglcontextlost", handleContextLost);
          const loseContextExt = renderer.gl.getExtension("WEBGL_lose_context");
          loseContextExt?.loseContext();

          if (canvas.parentNode) {
            canvas.parentNode.removeChild(canvas);
          }
        } catch (error) {
          console.warn("Error during WebGL cleanup:", error);
        }

        rendererRef.current = null;
        uniformsRef.current = null;
        meshRef.current = null;
      };
    };

    void initializeWebGL();

    return () => {
      cleanupFunctionRef.current?.();
      cleanupFunctionRef.current = null;
    };
  }, [
    isVisible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
    intensity,
    opacity,
    maxDpr,
    fps,
    webGLDisabled,
  ]);

  useEffect(() => {
    if (!uniformsRef.current || !containerRef.current || !rendererRef.current) {
      return;
    }

    const uniforms = uniformsRef.current;
    const renderer = rendererRef.current;

    uniforms.raysColor.value = hexToRgb(raysColor);
    uniforms.raysSpeed.value = raysSpeed;
    uniforms.lightSpread.value = lightSpread;
    uniforms.rayLength.value = rayLength;
    uniforms.pulsating.value = pulsating ? 1 : 0;
    uniforms.fadeDistance.value = fadeDistance;
    uniforms.saturation.value = saturation;
    uniforms.mouseInfluence.value = mouseInfluence;
    uniforms.noiseAmount.value = noiseAmount;
    uniforms.distortion.value = distortion;
    uniforms.intensity.value = intensity;
    uniforms.opacity.value = opacity;

    const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
    const dpr = renderer.dpr;
    const { anchor, dir } = getAnchorAndDir(
      raysOrigin,
      wCSS * dpr,
      hCSS * dpr,
    );
    uniforms.rayPos.value = anchor as [number, number];
    uniforms.rayDir.value = dir as [number, number];
  }, [
    raysColor,
    raysSpeed,
    lightSpread,
    raysOrigin,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    mouseInfluence,
    noiseAmount,
    distortion,
    intensity,
    opacity,
  ]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !rendererRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouseRef.current = { x, y };
    };

    if (followMouse) {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`light-rays-container ${className}`.trim()}
    />
  );
}
