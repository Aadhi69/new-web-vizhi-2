import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import { DemoHeroGeometric } from "@/components/demo-hero-geometric";
import { DemoHeroParallax } from "@/components/demo-hero-parallax";
import DeviceSection from "@/components/DeviceSection";
import BatterySection from "@/components/BatterySection";
import InteractionSection from "@/components/InteractionSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--surface-deep)]">
      <Logo />

      <DemoHeroParallax />
      <HeroSection />
      <DeviceSection />
      <BatterySection />
      <InteractionSection />
      <ApplicationsSection />
      <ArchitectureSection />
      <VisionSection />
      <Footer />
    </main>
  );
}
