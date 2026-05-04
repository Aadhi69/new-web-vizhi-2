"use client";

import { useParams, useRouter } from "next/navigation";
import { INDUSTRIES } from "@/lib/industries";
import { ChevronLeft } from "lucide-react";
import ARTryOnOverlay from "@/components/ARTryOnOverlay";

export default function ARTryOnPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);

  if (isNaN(id) || id < 0 || id >= INDUSTRIES.length) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Industry not found
          </h1>
          <button onClick={() => router.back()} className="btn-ghost">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const industry = INDUSTRIES[id];
  const isHealthcare = id === 0;

  // Healthcare: Show face-tracked 3D overlay only
  if (isHealthcare) {
    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/healthcare.mp4" type="video/mp4" />
        </video>
        <ARTryOnOverlay isReverseAR={true} onClose={() => router.back()} />
      </div>
    );
  }

  // Other Industries: Show gradient background
  return (
    <div
      className={`fixed inset-0 z-50 bg-linear-to-br ${industry.color} overflow-hidden`}
    >
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-60 bg-black/40 hover:bg-black/60 text-white border border-white/20 rounded-full p-3 transition-colors backdrop-blur-md group"
      >
        <ChevronLeft
          size={24}
          className="group-hover:-translate-x-1 transition-transform duration-300"
        />
      </button>

      {/* Industry Title & Description */}
      <div className="absolute inset-0 z-10 flex items-center justify-center text-center pointer-events-none">
        <div className="max-w-xl px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {industry.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80">{industry.desc}</p>
        </div>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 z-5" />
    </div>
  );
}
