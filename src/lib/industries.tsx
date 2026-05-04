import { ReactNode } from "react";
import {
  Activity,
  Cog,
  Briefcase,
  GraduationCap,
  Map,
  ArrowRight,
  HeartPulse,
  ShieldCheck,
  Database,
  Focus,
} from "lucide-react";

export type Industry = {
  title: string;
  desc: string;
  icon: ReactNode;
  color: string;
  colorClass: string;
  hud: ReactNode;
  textureUrl?: string;
};

export const INDUSTRIES: Industry[] = [
  {
    title: "Healthcare",
    desc: "Real-time patient intelligence delivered directly into a clinician's field of view.",
    icon: <Activity />,
    color: "from-blue-500 to-cyan-500",
    colorClass: "from-blue-600 to-cyan-600",
    hud: (
      <div className="flex flex-col gap-4 font-mono w-full">
        {/* Header */}
        <div className="flex justify-between w-full text-[10px] sm:text-xs border-b border-[#00ff44]/30 pb-2 text-[#00ff44]">
          <span>PATIENT: J. SMITH</span>
          <span>ID: HC-2847</span>
        </div>

        {/* Primary Metrics */}
        <div className="flex flex-col gap-2 items-center justify-center py-2">
          <HeartPulse size={40} className="text-[#00ff44] animate-pulse" />
          <div className="text-5xl font-extrabold tracking-tight">85 BPM</div>
          <div className="text-xs text-[rgba(0,255,68,0.7)]">Heart Rate</div>
        </div>

        {/* Essential Vitals Grid */}
        <div className="grid grid-cols-2 gap-2 text-[10px] sm:text-xs">
          <div className="hud-stat-card">
            <div className="opacity-60 text-[10px] text-[rgba(0,255,68,0.7)]">
              BP
            </div>
            <div className="font-semibold">120/80</div>
            <div className="opacity-40 text-[9px]">mmHg</div>
          </div>
          <div className="hud-stat-card">
            <div className="opacity-60 text-[10px] text-[rgba(0,255,68,0.7)]">
              O₂ SAT
            </div>
            <div className="font-semibold">98%</div>
            <div className="opacity-40 text-[9px]">SpO₂</div>
          </div>
          <div className="hud-stat-card">
            <div className="opacity-60 text-[10px] text-[rgba(0,255,68,0.7)]">
              TEMP
            </div>
            <div className="font-semibold">37.2°C</div>
            <div className="opacity-40 text-[9px]">Normal</div>
          </div>
          <div className="hud-stat-card">
            <div className="opacity-60 text-[10px] text-[rgba(0,255,68,0.7)]">
              RR
            </div>
            <div className="font-semibold">16</div>
            <div className="opacity-40 text-[9px]">breaths/min</div>
          </div>
        </div>

        {/* Status */}
        <div className="text-[10px] text-center pt-2 border-t border-[#00ff44]/30">
          <span className="inline-block px-2 py-1 bg-[#00ff44]/10 rounded">
            ✓ Vitals Stable
          </span>
        </div>

        {/* Healthcare Applications removed per request */}
      </div>
    ),
    textureUrl: "/healthcareimg.png",
  },
  {
    title: "Manufacturing",
    desc: "Contextual instructions and diagnostics delivered directly to workers.",
    icon: <Cog />,
    color: "from-orange-500 to-red-500",
    colorClass: "from-orange-600 to-red-600",
    hud: (
      <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
        <div className="flex justify-between w-full text-[10px] sm:text-xs">
          <span>14:45</span>
          <span>100% 🔋</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center py-4">
          <ShieldCheck size={36} className="text-[#00ff44]" />
          <div className="text-3xl font-bold tracking-tight">45 Nm</div>
          <div className="text-xs">TORQUE DELIVERED</div>
        </div>
        <div className="text-[10px] text-center mt-auto uppercase">
          Temp: 85°C | Optimal
        </div>
      </div>
    ),
  },
  {
    title: "Enterprise Operations",
    desc: "Live operational data integrated with physical facilities.",
    icon: <Briefcase />,
    color: "from-purple-500 to-pink-500",
    colorClass: "from-purple-600 to-pink-600",
    hud: (
      <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
        <div className="flex justify-between w-full text-[10px] sm:text-xs">
          <span>09:15</span>
          <span>100% 🔋</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center py-4">
          <Database size={36} className="text-[#00ff44]" />
          <div className="text-3xl font-bold tracking-tight">94%</div>
          <div className="text-xs">EFFICIENCY RATING</div>
        </div>
        <div className="text-[10px] text-center mt-auto uppercase">
          Supply Chain: Nominal
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    desc: "Holographic interaction with complex academic subjects.",
    icon: <GraduationCap />,
    color: "from-green-500 to-emerald-500",
    colorClass: "from-green-600 to-emerald-600",
    hud: (
      <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
        <div className="flex justify-between w-full text-[10px] sm:text-xs">
          <span>11:30</span>
          <span>100% 🔋</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center py-4">
          <Focus size={36} className="text-[#00ff44]" />
          <div className="text-3xl font-bold tracking-tight">2.5X</div>
          <div className="text-xs">ZOOM MULTIPLIER</div>
        </div>
        <div className="text-[10px] text-center mt-auto uppercase">
          Module: Cortex Anatomy
        </div>
      </div>
    ),
  },
  {
    title: "Field Services",
    desc: "On-site schematic overlays for remote engineering.",
    icon: <Map />,
    color: "from-yellow-500 to-amber-500",
    colorClass: "from-yellow-600 to-amber-600",
    hud: (
      <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
        <div className="flex justify-between w-full text-[10px] sm:text-xs">
          <span>16:00</span>
          <span>100% 🔋</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center py-4">
          <div className="flex items-center gap-4">
            <ArrowRight size={48} className="text-[#00ff44]" />
            <div className="text-4xl font-bold tracking-tight">200m</div>
          </div>
          <div className="text-sm mt-2">Enter Yu Road</div>
        </div>
        <div className="text-[10px] text-center mt-auto uppercase flex justify-between w-full">
          <span>16:45 ARRIVED</span>
          <span>5 KM/H</span>
          <span>1.5 KM</span>
        </div>
      </div>
    ),
  },
  {
    title: "Defence",
    desc: "Tactical overlays and situational awareness on the battlefield.",
    icon: <ShieldCheck />,
    color: "from-gray-500 to-slate-500",
    colorClass: "from-gray-600 to-slate-600",
    hud: (
      <div className="flex flex-col gap-4 font-mono text-[#00ff44] text-shadow-green w-full">
        <div className="flex justify-between w-full text-[10px] sm:text-xs">
          <span>14:45</span>
          <span>100% 🔋</span>
        </div>
        <div className="flex flex-col gap-1 items-center justify-center py-4">
          <ShieldCheck size={36} className="text-[#00ff44]" />
          <div className="text-3xl font-bold tracking-tight">ACTIVE</div>
          <div className="text-xs">DEFENCE SHIELD</div>
        </div>
        <div className="text-[10px] text-center mt-auto uppercase">
          Status: Secure
        </div>
      </div>
    ),
  },
];
