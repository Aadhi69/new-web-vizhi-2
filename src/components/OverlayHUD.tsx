"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  ChevronLeft,
  Heart,
  Thermometer,
  Droplet,
  Wind,
  Battery,
  Cog,
  Database,
  GraduationCap,
  MapPin,
  AlertTriangle,
  Focus,
} from "lucide-react";

interface OverlayHUDProps {
  type: string;
  title: string;
  hudContent: ReactNode;
  onExit: () => void;
}

export default function OverlayHUD({
  type,
  title,
  hudContent,
  onExit,
}: OverlayHUDProps) {
  const [timestamp, setTimestamp] = useState("--:--:--");
  useEffect(() => {
    const updateClock = () =>
      setTimestamp(
        new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }),
      );
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const industryType = (title || type || "").toLowerCase();
  const isHealthcare = industryType.includes("health");
  const isManufacturing = industryType.includes("manufactur");
  const isEducation = industryType.includes("educ");
  const isEnterprise = industryType.includes("enterprise");
  const isFieldService = industryType.includes("field");
  const isDefence =
    industryType.includes("defence") || industryType.includes("defense");

  return (
    <div className="fixed inset-0 z-20 pointer-events-none flex flex-col items-center justify-between p-6 sm:p-8">
      {/* Corner brackets */}
      <div className="corner-bracket top-left pointer-events-none" />
      <div className="corner-bracket top-right pointer-events-none" />
      <div className="corner-bracket bottom-left pointer-events-none" />
      <div className="corner-bracket bottom-right pointer-events-none" />

      {/* Top HUD Section */}
      <div className="w-full flex justify-between items-start pointer-events-auto">
        {/* Left: Back button above system active */}
        <div className="flex flex-col items-start gap-2 pt-1 pointer-events-auto">
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[11px] text-white backdrop-blur-md transition-colors hover:border-(--vizhi-teal) hover:bg-black/70"
            aria-label="Go back"
          >
            <ChevronLeft size={14} />
            Back
          </button>
          <div className="flex items-center gap-3 font-mono text-sm text-(--vizhi-teal) mt-1">
            <div className="pulse-dot animate" />
            <div className="text-xs text-(--vizhi-muted)">SYSTEM ACTIVE</div>
          </div>
        </div>

        {/* Right: Device info */}
        <div className="text-right font-sans text-[13px] text-(--vizhi-muted) pointer-events-auto">
          <div className="font-semibold text-white">Vizhi XR</div>
          <div className="text-xs flex items-center justify-end gap-2 mt-1">
            <Battery size={14} className="text-(--vizhi-muted)" />
            <span className="text-[10px]">v1.2 • 92%</span>
          </div>
        </div>
      </div>

      {/* Center HUD */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 pointer-events-auto max-h-[76vh] overflow-y-hidden w-full">
        <div className="hud-panel w-full max-w-3xl p-0 sm:p-0">
          {/* Header / Title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-2xl font-semibold text-white tracking-tight">
                {title.toUpperCase()}
              </h2>
              <div className="mt-2 flex items-center gap-3 bg-transparent text-[12px] text-(--vizhi-muted)">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[rgba(255,255,255,0.06)] rounded-full flex items-center justify-center text-sm font-semibold">
                    {isHealthcare && "JS"}
                    {isManufacturing && "MF"}
                    {isEducation && "ST"}
                    {isEnterprise && "OP"}
                    {isFieldService && "FS"}
                    {isDefence && "TM"}
                  </div>
                  <div className="font-mono text-sm">
                    <div>
                      {isHealthcare && "J. SMITH"}
                      {isManufacturing && "UNIT-47"}
                      {isEducation && "STUDENT-001"}
                      {isEnterprise && "OPS-CENTER"}
                      {isFieldService && "TEAM-ALPHA"}
                      {isDefence && "TACTICAL-01"}
                    </div>
                    <div className="text-[11px] opacity-70">
                      {isHealthcare && "ID: HC-2847 • 46 yrs"}
                      {isManufacturing && "Line 3 • Active"}
                      {isEducation && "Grade: A+ • Focus: 95%"}
                      {isEnterprise && "Global Network"}
                      {isFieldService && "On Assignment"}
                      {isDefence && "Secure Channel"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-(--vizhi-muted)">3D Preview Mode</div>
          </div>

          {/* Main content layout - Industry-specific */}
          {isHealthcare ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Left: ECG + BPM hero */}
              <div className="col-span-1 flex flex-col items-center gap-3">
                <div className="ecg-wrapper">
                  <svg
                    className="ecg-track ecg-move"
                    viewBox="0 0 480 60"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline
                      fill="none"
                      stroke="var(--vizhi-teal)"
                      strokeWidth="2"
                      points="0,30 30,30 40,10 60,50 80,30 110,30 120,18 140,42 170,30 200,30 220,14 240,46 260,30 300,30 320,16 340,34 380,30 420,30 460,30"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="flex flex-col items-center">
                  <div className="pulse-ring rounded-full p-6">
                    <div className="text-5xl sm:text-6xl font-extrabold text-(--vizhi-teal) mono-numeric">
                      85
                    </div>
                    <div className="text-xs text-(--vizhi-teal) mt-1">BPM</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-(--vizhi-muted)">
                    <div className="text-sm">↑</div>
                    <div className="mono-numeric">+3% (5m)</div>
                    <div className="ml-2 text-[10px] opacity-70">trend</div>
                  </div>
                </div>
              </div>

              {/* Middle & Right: Vitals grid (2x2) */}
              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <div className="hud-stat-card flex items-center gap-3">
                  <Heart size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Blood Pressure
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      120/80 <span className="text-xs">mmHg</span>
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Normal
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Droplet size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">SpO₂</div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      98% <span className="text-xs">SpO₂</span>
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Normal
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Thermometer size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">Temp</div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      37.2°C
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(240,165,0,0.12)]">
                    Normal
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Wind size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Resp Rate
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      16
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Normal
                  </div>
                </div>
              </div>
            </div>
          ) : isManufacturing ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="col-span-1 flex flex-col items-center gap-3">
                <Cog
                  size={48}
                  className="text-(--vizhi-teal) animate-spin"
                  style={{ animationDuration: "3s" }}
                />
                <div className="flex flex-col items-center">
                  <div className="pulse-ring rounded-full p-6">
                    <div className="text-5xl sm:text-6xl font-extrabold text-(--vizhi-teal) mono-numeric">
                      45
                    </div>
                    <div className="text-xs text-(--vizhi-teal) mt-1">NM</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-(--vizhi-muted)">
                    <div className="text-sm">✓</div>
                    <div className="mono-numeric">Torque Optimal</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <div className="hud-stat-card flex items-center gap-3">
                  <Thermometer size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Motor Temp
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      82°C
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Good
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Battery size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Power Draw
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      3.2 kW
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Normal
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ◈
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">RPM</div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      1850
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Optimal
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <AlertTriangle size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Safety
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      100%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Safe
                  </div>
                </div>
              </div>
            </div>
          ) : isEducation ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="col-span-1 flex flex-col items-center gap-3">
                <GraduationCap size={48} className="text-(--vizhi-teal)" />
                <div className="flex flex-col items-center">
                  <div className="pulse-ring rounded-full p-6">
                    <div className="text-5xl sm:text-6xl font-extrabold text-(--vizhi-teal) mono-numeric">
                      A+
                    </div>
                    <div className="text-xs text-(--vizhi-teal) mt-1">
                      GRADE
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-(--vizhi-muted)">
                    <div className="text-sm">↑</div>
                    <div className="mono-numeric">+12% (session)</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <div className="hud-stat-card flex items-center gap-3">
                  <Focus size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Focus Level
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      95%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Excellent
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ■
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Completion
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      88%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    On Track
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ◆
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Session Time
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      42m
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Active
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ●
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Mastery
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      78%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Good
                  </div>
                </div>
              </div>
            </div>
          ) : isEnterprise ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="col-span-1 flex flex-col items-center gap-3">
                <Database size={48} className="text-(--vizhi-teal)" />
                <div className="flex flex-col items-center">
                  <div className="pulse-ring rounded-full p-6">
                    <div className="text-5xl sm:text-6xl font-extrabold text-(--vizhi-teal) mono-numeric">
                      94
                    </div>
                    <div className="text-xs text-(--vizhi-teal) mt-1">%</div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-(--vizhi-muted)">
                    <div className="text-sm">✓</div>
                    <div className="mono-numeric">Efficiency</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ▬
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Supply Chain
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      Nominal
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    OK
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Battery size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">Load</div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      68%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Balanced
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ◇
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Uptime
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      99.8%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Excellent
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ≈
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Network
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      Connected
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Stable
                  </div>
                </div>
              </div>
            </div>
          ) : isFieldService ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="col-span-1 flex flex-col items-center gap-3">
                <MapPin size={48} className="text-(--vizhi-teal)" />
                <div className="flex flex-col items-center">
                  <div className="pulse-ring rounded-full p-6">
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      12.4 km
                    </div>
                    <div className="text-xs text-(--vizhi-teal) mt-1">
                      TO BASE
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-(--vizhi-muted)">
                    <div className="text-sm">→</div>
                    <div className="mono-numeric">E-NE 45°</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <div className="hud-stat-card flex items-center gap-3">
                  <MapPin size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Location
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      Sector-7
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    OK
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    →
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Task Status
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      In Progress
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    60%
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Battery size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Equipment
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      Ready
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    ✓
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ⋯
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Signal
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      Strong
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    5/5
                  </div>
                </div>
              </div>
            </div>
          ) : isDefence ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="col-span-1 flex flex-col items-center gap-3">
                <AlertTriangle size={48} className="text-(--vizhi-teal)" />
                <div className="flex flex-col items-center">
                  <div className="pulse-ring rounded-full p-6">
                    <div className="text-3xl sm:text-4xl font-extrabold text-(--vizhi-teal) mono-numeric">
                      READY
                    </div>
                    <div className="text-xs text-(--vizhi-teal) mt-1">
                      STATUS
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[12px] text-(--vizhi-muted)">
                    <div className="text-sm pulse-dot animate"></div>
                    <div className="mono-numeric">Secure Channel</div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 grid grid-cols-2 gap-3">
                <div className="hud-stat-card flex items-center gap-3">
                  <AlertTriangle size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Threat Level
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      LOW
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    ✓
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <Battery size={20} className="text-(--vizhi-teal)" />
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Power
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      100%
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    Full
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal) font-bold">
                    ◆
                  </span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Encryption
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      ACTIVE
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    ✓
                  </div>
                </div>

                <div className="hud-stat-card flex items-center gap-3">
                  <span className="text-lg text-(--vizhi-teal)">📡</span>
                  <div>
                    <div className="text-[10px] text-(--vizhi-muted)">
                      Comms
                    </div>
                    <div className="text-lg font-semibold mono-numeric text-(--vizhi-teal)">
                      SECURE
                    </div>
                  </div>
                  <div className="ml-auto text-sm px-2 py-1 rounded text-white bg-[rgba(0,201,167,0.12)]">
                    ✓
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>{hudContent}</div>
          )}
        </div>
      </div>

      {/* Bottom - Status Row */}
      <div className="w-full max-w-3xl pointer-events-auto">
        <div className="flex justify-between items-center px-4 py-2 font-mono text-[11px] text-(--vizhi-muted)">
          <div className="flex items-center gap-4">
            <div>FPS: 60</div>
            <div>MODE: {type.toUpperCase()}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="pulse-dot animate" />{" "}
              <span className="text-white">LIVE</span>
            </div>
            <div className="opacity-70">Vizhi for {type.toLowerCase()}</div>
            <div className="text-[10px] opacity-60" suppressHydrationWarning>
              {timestamp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
