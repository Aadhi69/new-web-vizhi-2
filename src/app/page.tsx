import Logo from "@/components/Logo";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import DeviceSection from "@/components/DeviceSection";
import BatterySection from "@/components/BatterySection";
import InteractionSection from "@/components/InteractionSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Logo />

      <HeroSection />
      <ImpactSection />
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
