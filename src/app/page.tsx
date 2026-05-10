"use client";

import { lazy, Suspense } from "react";
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

const HeroSection = lazy(() => import("@/components/HeroSection"));
const DemoHeroParallax = lazy(() => import("@/components/demo-hero-parallax").then(mod => ({ default: mod.DemoHeroParallax })));
const DeviceSection = lazy(() => import("@/components/DeviceSection"));
const BatterySection = lazy(() => import("@/components/BatterySection"));
const InteractionSection = lazy(() => import("@/components/InteractionSection"));
const ApplicationsSection = lazy(() => import("@/components/ApplicationsSection"));
const ArchitectureSection = lazy(() => import("@/components/ArchitectureSection"));
const VisionSection = lazy(() => import("@/components/VisionSection"));

const LoadingFallback = () => <div className="h-screen bg-[var(--surface-deep)]" />;

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface-deep)]">
      <Logo />

      <Suspense fallback={<LoadingFallback />}>
        <DemoHeroParallax />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <HeroSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <DeviceSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <BatterySection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <InteractionSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ApplicationsSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ArchitectureSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <VisionSection />
      </Suspense>
      <Footer />
    </main>
  );
}
