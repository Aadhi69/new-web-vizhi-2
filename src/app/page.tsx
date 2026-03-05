import Image from "next/image";
import HeroSection from "@/components/HeroSection";
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
      {/* Fixed Logo Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:p-10 z-50 flex items-center pointer-events-none">
        <div className="w-10 h-10 md:w-16 md:h-16 relative flex items-center justify-center pointer-events-auto opacity-80 hover:opacity-100 transition-opacity duration-300 mix-blend-screen cursor-pointer">
          <Image src="/logo.jpg" alt="Vizhi Logo" fill className="object-contain" priority />
        </div>
      </nav>

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
