"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Radio,
  Navigation,
  Crosshair,
  ShieldAlert,
  Compass,
  Zap,
  Rotate3d,
  Move,
  Search,
  Scissors,
  MousePointer2,
  Box,
  Globe,
  Cpu,
  Info,
  Wrench,
  Activity,
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
  const [showInitialContent, setShowInitialContent] = useState(true);

  useEffect(() => {
    if (type.toLowerCase().includes("manufactur") || type.toLowerCase().includes("educat")) {
      setShowInitialContent(true);
      const timer = setTimeout(() => {
        setShowInitialContent(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [type]);
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
    <div
      className={`fixed inset-0 z-20 pointer-events-none flex flex-col items-center justify-between overflow-hidden ${
        isFieldService ? "p-3 sm:p-4" : "p-6 sm:p-8"
      }`}
    >
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
      <div
        className={`flex flex-col items-center pointer-events-auto overflow-hidden w-full min-h-0 ${
          isFieldService
            ? "flex-1 justify-center gap-1 max-h-[calc(100vh-7.5rem)]"
            : "gap-2 sm:gap-4 max-h-[85vh]"
        }`}
      >
        <div
          className={`hud-panel w-full p-0 sm:p-0 ${
            isFieldService ? "max-w-6xl h-full flex flex-col min-h-0" : "max-w-5xl"
          }`}
        >
          {/* Header / Title */}
          <div
            className={`flex items-center justify-between shrink-0 ${
              isFieldService ? "mb-1 sm:mb-2" : "mb-4"
            }`}
          >
            <div>
              <h2
                className={`font-semibold text-white tracking-tight ${
                  isFieldService ? "text-sm sm:text-lg" : "text-lg sm:text-2xl"
                }`}
              >
                {title.toUpperCase()}
              </h2>
              <div
                className={`flex items-center gap-3 bg-transparent text-[12px] text-(--vizhi-muted) ${
                  isFieldService ? "mt-1" : "mt-2"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`bg-[rgba(255,255,255,0.06)] rounded-full flex items-center justify-center font-semibold ${
                      isFieldService ? "w-6 h-6 text-[10px]" : "w-8 h-8 text-sm"
                    }`}
                  >
                    {isHealthcare && "JS"}
                    {isManufacturing && "MF"}
                    {isEducation && "ST"}
                    {isEnterprise && "OP"}
                    {isFieldService && "FS"}
                    {isDefence && "TM"}
                  </div>
                  <div className="font-mono">
                    <div
                      className={`text-(--vizhi-teal) font-black tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                        isFieldService ? "text-xs sm:text-sm" : "text-base"
                      }`}
                    >
                      {isHealthcare && "J. SMITH"}
                      {isManufacturing && "UNIT-47"}
                      {isEducation && "STUDENT-001"}
                      {isEnterprise && "OPS-CENTER"}
                      {isFieldService && "TEAM-ALPHA"}
                      {isDefence && "TACTICAL-01"}
                    </div>
                    <div
                      className={`text-(--vizhi-teal) font-bold opacity-90 tracking-wide mt-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
                        isFieldService ? "text-[10px]" : "text-[12px]"
                      }`}
                    >
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
            <div className={`${isFieldService ? "text-[10px]" : "text-xs"} text-(--vizhi-muted)`}>3D Preview Mode</div>
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
            <div className="flex flex-col gap-6 w-full items-center">
              {/* Top Row: AI Status & Minimized Step */}
              <div className="flex w-full justify-between items-center mb-4">
                <div className="flex items-center gap-3 bg-black/60 border border-[rgba(0,201,167,0.3)] rounded-full px-5 py-2 shadow-none sm:shadow-lg">
                  <div className="pulse-dot animate bg-(--vizhi-teal)" />
                  <span className="text-[11px] font-black tracking-widest text-(--vizhi-teal) uppercase">AI Assistance Active</span>
                </div>

                {!showInitialContent && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 bg-black/80 border border-white/20 rounded-full px-5 py-2 shadow-none sm:shadow-xl"
                  >
                    <div className="w-6 h-6 rounded-full bg-(--vizhi-teal) flex items-center justify-center text-[10px] font-black text-black">3</div>
                    <span className="text-[12px] font-black text-white uppercase tracking-widest">Step 3 of 5</span>
                  </motion.div>
                )}
              </div>

              <div className="w-full relative min-h-[400px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {showInitialContent ? (
                    <motion.div 
                      key="sequence"
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start w-full"
                    >
                      {/* Left: Step-by-Step Checklist */}
                      <div className="space-y-5">
                        <h3 className="text-[11px] font-black text-(--vizhi-teal) uppercase tracking-[0.2em] mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Assembly Sequence</h3>
                        {[
                          { step: 1, text: "Scan component QR code", status: "completed" },
                          { step: 2, text: "Verify part alignment (Axis-Z)", status: "completed" },
                          { step: 3, text: "Apply M6 fastener to Housing-A", status: "active" },
                          { step: 4, text: "Calibrate torque to 45Nm", status: "pending" },
                          { step: 5, text: "Final quality check & seal", status: "pending" }
                        ].map((s) => (
                          <div key={s.step} className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                            s.status === 'active' 
                              ? 'bg-black/90 border-(--vizhi-teal) shadow-[0_0_20px_rgba(0,201,167,0.3)] scale-[1.02]' 
                              : s.status === 'completed'
                              ? 'bg-black/70 border-white/20 opacity-90'
                              : 'bg-black/50 border-white/10 opacity-70'
                          }`}>
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black shadow-lg ${
                              s.status === 'active' ? 'bg-(--vizhi-teal) text-black' : 'bg-white/20 text-(--vizhi-teal)'
                            }`}>
                              {s.status === 'completed' ? '✓' : s.step}
                            </div>
                            <span className={`text-[14px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${s.status === 'active' ? 'text-(--vizhi-teal) font-black' : 'text-(--vizhi-teal) font-bold'}`}>
                              {s.text}
                            </span>
                            {s.status === 'active' && (
                              <div className="ml-auto">
                                <div className="h-1.5 w-1.5 rounded-full bg-(--vizhi-teal) animate-ping" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Right: Preview AI Insights */}
                      <div className="space-y-6 opacity-50 pointer-events-none">
                         <div className="hud-stat-card bg-black/40 border-white/10 p-7 rounded-xl">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2.5 h-2.5 rounded-full bg-(--vizhi-teal)" />
                            <span className="text-[12px] font-black text-white uppercase tracking-widest">Preparing Analysis...</span>
                          </div>
                          <p className="text-sm text-white/50 leading-relaxed italic">
                            System initializing real-time guidance...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="focus"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ type: "spring", damping: 20, stiffness: 100 }}
                      className="w-full max-w-2xl px-2"
                    >
                      {/* Centered Focused AI Analysis */}
                      <div className="hud-stat-card bg-black/95 border-(--vizhi-teal) p-6 sm:p-10 rounded-2xl shadow-none sm:shadow-[0_0_40px_rgba(0,201,167,0.4)] border-2">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-3 h-3 rounded-full bg-(--vizhi-teal) shadow-[0_0_12px_rgba(0,201,167,0.8)]" />
                          <span className="text-[12px] sm:text-[14px] font-black text-(--vizhi-teal) uppercase tracking-[0.3em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">AI LIVE GUIDANCE</span>
                        </div>
                        <p className="text-[16px] sm:text-[22px] text-(--vizhi-teal) font-black leading-snug italic mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                          "Detecting slight misalignment in Housing-A. Rotate component 3° clockwise for optimal fastener seating."
                        </p>
                        <div className="flex flex-wrap items-center gap-6 sm:gap-10 pt-8 border-t border-white/20">
                          <div>
                            <div className="text-[10px] sm:text-[12px] text-(--vizhi-teal) font-black uppercase tracking-wider mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Confidence</div>
                            <div className="text-xl sm:text-2xl font-mono text-(--vizhi-teal) font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">99.4%</div>
                          </div>
                          <div>
                            <div className="text-[10px] sm:text-[12px] text-white/80 font-black uppercase tracking-wider mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Deviation</div>
                            <div className="text-xl sm:text-2xl font-mono text-orange-400 font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">0.02mm</div>
                          </div>
                          <div className="ml-0 sm:ml-auto w-full sm:w-auto">
                             <div className="text-[10px] sm:text-[12px] text-(--vizhi-teal) font-black uppercase tracking-wider mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Tools</div>
                             <div className="text-xs sm:text-sm font-black text-black bg-(--vizhi-teal) px-3 py-1 rounded shadow-lg inline-block">SmartWrench v4</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Row: Additional Context */}
              {!showInitialContent && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-6 mt-8"
                >
                  <div className="flex items-center gap-2 text-(--vizhi-teal) text-[10px] font-black uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <Focus size={14} className="text-(--vizhi-teal)" />
                    <span>Real-time Vision Active</span>
                  </div>
                  <div className="flex items-center gap-2 text-(--vizhi-teal) text-[10px] font-black uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <Battery size={14} className="text-(--vizhi-teal)" />
                    <span>System Load: Optimal</span>
                  </div>
                </motion.div>
              )}
            </div>
          ) : isEducation ? (
            <div className="flex flex-col gap-4 w-full h-full max-w-6xl mx-auto px-4 pb-2">
              {/* Header: Learning Topic */}
              <div className="flex w-full justify-between items-center mb-2 px-2">
                <div className="flex items-center justify-center gap-2 sm:gap-3 bg-black/60 border border-[rgba(0,201,167,0.3)] rounded-full px-3 sm:px-5 py-1 sm:py-2 shadow-none sm:shadow-lg">
                  <div className="pulse-dot animate bg-(--vizhi-teal) !w-2 !h-2 sm:!w-2.5 sm:!h-2.5" />
                  <span className="text-[9px] sm:text-[11px] font-black tracking-widest text-(--vizhi-teal) uppercase leading-none">Interactive Anatomy Active</span>
                </div>
                <div className="bg-black/80 border border-white/10 rounded-full px-3 sm:px-4 py-1 sm:py-2 flex items-center justify-center">
                  <span className="text-[9px] sm:text-[12px] font-black text-white/60 uppercase tracking-widest leading-none">Unit 4: Cardiology</span>
                </div>
              </div>

              <div className="w-full relative min-h-[300px] sm:min-h-[400px] flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {showInitialContent ? (
                    <motion.div 
                      key="edu-anatomy"
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, y: -20 }}
                      className="flex flex-col items-center justify-center w-full relative"
                    >
                      {/* Interaction Ring & Heart Model */}
                      <div className="relative w-48 h-48 sm:w-80 sm:h-80 flex items-center justify-center">
                        {/* Outer Glow Ring */}
                        <div className="absolute inset-0 border-2 border-(--vizhi-teal)/20 rounded-full animate-pulse shadow-[0_0_50px_rgba(0,201,167,0.1)]" />
                        
                        {/* Floating Gesture Prompts */}
                        <motion.div 
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="absolute -left-10 sm:-left-20 top-1/4 flex flex-col items-end gap-1 sm:gap-2 bg-black/60 border border-(--vizhi-teal)/30 p-1.5 sm:p-3 rounded-xl backdrop-blur-md"
                        >
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-[7px] sm:text-[11px] font-black text-(--vizhi-teal) uppercase">Pinch Zoom</span>
                            <Search size={12} className="text-(--vizhi-teal) sm:w-[14px]" />
                          </div>
                          <div className="h-[1px] w-full bg-white/10" />
                        </motion.div>

                        <motion.div 
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 }}
                          className="absolute -right-10 sm:-right-20 bottom-1/4 flex flex-col items-start gap-1 sm:gap-2 bg-black/60 border border-(--vizhi-teal)/30 p-1.5 sm:p-3 rounded-xl backdrop-blur-md"
                        >
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Scissors size={12} className="text-(--vizhi-teal) sm:w-[14px]" />
                            <span className="text-[7px] sm:text-[11px] font-black text-(--vizhi-teal) uppercase">Dissect</span>
                          </div>
                          <div className="h-[1px] w-full bg-white/10" />
                        </motion.div>

                        {/* Central Model: Anatomical Heart */}
                        <div className="relative z-10 flex flex-col items-center">
                          <motion.div
                            animate={{ 
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ 
                              scale: { duration: 0.8, repeat: Infinity }
                            }}
                            className="relative flex items-center justify-center"
                          >
                            {/* Physical PNG Heart with Green Filter */}
                            <img 
                              src="/heart.png" 
                              alt="Anatomical Heart" 
                              className="w-[110px] h-[110px] sm:w-[200px] sm:h-[200px] object-contain"
                              style={{ 
                               filter: 'invert(72%) sepia(91%) saturate(3660%) hue-rotate(85deg) brightness(108%) contrast(126%)'
                              }}
                            />
                            {/* Subtle Glow Overlay */}
                            <div className="absolute inset-0 bg-(--vizhi-teal)/10 blur-2xl sm:blur-3xl rounded-full" />
                          </motion.div>
                          <div className="mt-2 sm:mt-4 px-3 sm:px-4 py-1 bg-black/80 border border-(--vizhi-teal) rounded-full">
                            <span className="text-[8px] sm:text-[10px] font-black text-(--vizhi-teal) uppercase tracking-[0.2em]">Human Heart (3D)</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="edu-lecture"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full max-w-5xl"
                    >
                      {/* Left: Interactive Dissection Specs */}
                      <div className="space-y-4">
                        <div className="bg-black/80 p-6 rounded-2xl border-2 border-(--vizhi-teal) shadow-[0_0_30px_rgba(0,201,167,0.2)]">
                          <div className="flex items-center gap-2 mb-4">
                            <Rotate3d size={16} className="text-(--vizhi-teal)" />
                            <h3 className="text-[14px] font-black text-(--vizhi-teal) uppercase tracking-widest">Dissection Analysis</h3>
                          </div>
                          <div className="space-y-3">
                            {[
                              { label: "Left Ventricle", value: "Normal", status: "text-(--vizhi-teal)" },
                              { label: "Mitral Valve", value: "Functional", status: "text-(--vizhi-teal)" },
                              { label: "Aortic Arch", value: "Optimal", status: "text-(--vizhi-teal)" }
                            ].map((item, idx) => (
                              <div key={idx} className="flex justify-between border-b border-white/10 pb-2">
                                <span className="text-[11px] font-black text-white/60 uppercase">{item.label}</span>
                                <span className={`text-[12px] font-black ${item.status}`}>{item.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button className="flex-1 bg-(--vizhi-teal) text-black font-black py-3 rounded-xl text-[10px] uppercase shadow-lg">Isolate Chambers</button>
                          <button className="flex-1 bg-white/5 border border-white/20 text-white font-black py-3 rounded-xl text-[10px] uppercase">Reset Model</button>
                        </div>
                      </div>

                      {/* Right: AI Tutor */}
                      <div className="bg-black/90 border-2 border-(--vizhi-teal) p-4 sm:p-6 rounded-2xl shadow-[0_0_40px_rgba(0,201,167,0.3)]">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-(--vizhi-teal) shadow-[0_0_8px_rgba(0,201,167,0.8)]" />
                          <span className="text-[10px] sm:text-[12px] font-black text-(--vizhi-teal) uppercase tracking-[0.2em]">LIVE AI LECTURE</span>
                        </div>
                        <p className="text-[14px] sm:text-[18px] text-(--vizhi-teal) font-black leading-snug sm:leading-relaxed italic mb-4 sm:mb-8">
                          "The heart's electrical system, starting from the SA node, ensures synchronized contraction."
                        </p>
                        <div className="bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase">Cycle</span>
                            <span className="text-[11px] sm:text-[12px] font-black text-(--vizhi-teal)">Systole</span>
                          </div>
                          <div className="h-1 sm:h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-(--vizhi-teal) w-[65%] animate-pulse" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : isEnterprise ? (
            <div className="flex flex-col gap-3 sm:gap-4 w-full h-full max-w-7xl mx-auto px-2 sm:px-4 pb-2">
              {/* Top Banner: Global Status */}
              <div className="flex justify-between items-center mb-1 px-3 sm:px-4 bg-black/40 border border-(--vizhi-teal)/20 rounded-xl py-1.5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-(--vizhi-teal) shadow-[0_0_8px_var(--vizhi-teal)] animate-pulse" />
                    <span className="text-[10px] font-black text-(--vizhi-teal) uppercase tracking-widest">Global Operations Active</span>
                  </div>
                  <div className="h-4 w-[1px] bg-white/10" />
                  <span className="text-[10px] font-mono text-white/60">NODE: ENTERPRISE-HQ-01</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black text-white/40 uppercase">Efficiency:</span>
                  <span className="text-[12px] font-black text-(--vizhi-teal)">94.8%</span>
                </div>
              </div>

              {/* Holographic Monitor Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Left Monitor: Logistics & Shipments */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="lg:col-span-3 space-y-4 hidden lg:block"
                >
                  <div className="bg-black/80 border border-(--vizhi-teal)/30 p-4 rounded-2xl shadow-[0_0_20px_rgba(0,201,167,0.1)] backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10"><Box size={40} /></div>
                    <h3 className="text-[11px] font-black text-(--vizhi-teal) uppercase mb-4 tracking-widest">Active Logistics</h3>
                    <div className="space-y-3">
                      {[
                        { id: "SH-901", from: "SIN", to: "LAX", status: "In Transit", color: "text-(--vizhi-teal)" },
                        { id: "SH-904", from: "BER", to: "DXB", status: "Delayed", color: "text-orange-500" },
                        { id: "SH-909", from: "TKO", to: "NYC", status: "On Track", color: "text-(--vizhi-teal)" }
                      ].map((ship, idx) => (
                        <div key={idx} className="bg-white/5 p-2 rounded-lg border border-white/5">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-[10px] font-black text-white">{ship.id}</span>
                            <span className={`text-[9px] font-black ${ship.color} uppercase`}>{ship.status}</span>
                          </div>
                          <div className="text-[9px] font-mono text-white/40">{ship.from} → {ship.to}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Center Monitor: Interactive Global Map */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="lg:col-span-6 flex flex-col gap-2 sm:gap-4 order-1 lg:order-2"
                >
                  <div className="bg-black/90 border-2 border-(--vizhi-teal)/50 p-4 sm:p-6 rounded-3xl shadow-[0_0_40px_rgba(0,201,167,0.2)] relative min-h-[260px] sm:min-h-[320px] flex flex-col items-center justify-center overflow-hidden">
                    {/* Animated Grid lines */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" 
                         style={{ backgroundImage: 'linear-gradient(var(--vizhi-teal) 1px, transparent 1px), linear-gradient(90deg, var(--vizhi-teal) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    
                    {/* Simplified Globe/Map UI */}
                    <div className="relative w-full h-40 sm:h-64 flex items-center justify-center">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute w-36 h-36 sm:w-64 sm:h-64 border border-(--vizhi-teal)/20 rounded-full" 
                      />
                      <Globe size={110} className="text-(--vizhi-teal) opacity-40 animate-pulse sm:w-[180px] sm:h-[180px]" />
                      
                      {/* Interactive Nodes */}
                      <div className="absolute top-1/4 left-1/4 group cursor-pointer">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-(--vizhi-teal) rounded-full shadow-[0_0_15px_var(--vizhi-teal)] animate-ping" />
                      </div>

                      <div className="absolute bottom-1/3 right-1/4 group cursor-pointer">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full shadow-[0_0_15px_#f97316] animate-pulse" />
                      </div>
                    </div>

                    <div className="mt-2 text-center">
                      <h4 className="text-[12px] sm:text-[14px] font-black text-(--vizhi-teal) uppercase tracking-[0.2em] mb-1">Supply Chain</h4>
                      <p className="text-[8px] sm:text-[10px] text-white/50 uppercase tracking-widest font-black">Live Monitoring</p>
                    </div>
                  </div>
                </motion.div>

                {/* Right Monitor: Performance Metrics */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="lg:col-span-3 space-y-3 sm:space-y-4 order-2 lg:order-3"
                >
                  <div className="bg-black/80 border border-orange-500/30 p-3 sm:p-4 rounded-2xl shadow-[0_0_20px_rgba(249,115,22,0.1)] backdrop-blur-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-orange-500" />
                      <h3 className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Alerts</h3>
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 p-2 sm:p-3 rounded-xl mb-2 sm:mb-4">
                      <div className="text-[9px] font-black text-orange-500 mb-0.5 uppercase truncate">Efficiency Alert</div>
                      <p className="text-[8px] text-white/80 leading-tight line-clamp-2">Bottleneck in APAC. +14h delay.</p>
                    </div>
                  </div>

                  <div className="bg-black/80 border border-(--vizhi-teal)/30 p-3 sm:p-4 rounded-2xl hidden sm:block">
                    <h3 className="text-[11px] font-black text-(--vizhi-teal) uppercase mb-3 tracking-widest">Global KPIs</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-[9px] font-black text-white/60 mb-1 uppercase">Resource Allocation</div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-(--vizhi-teal) w-[78%]" />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[9px] font-black text-white/60 mb-1 uppercase">Network Stability</div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-(--vizhi-teal) w-[99%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          ) : isFieldService ? (
            <div className="flex min-h-0 flex-1 w-full items-center justify-center overflow-hidden px-1 sm:px-2">
              <div className="flex h-full w-full max-w-[min(1200px,96vw)] flex-col gap-1.5 sm:gap-2 rounded-[1.25rem] bg-black/10 px-1 py-1 sm:px-2 sm:py-1.5">
                <div className="flex w-full justify-between items-center gap-2 px-1 sm:px-2 shrink-0">
                  <div className="flex items-center justify-center gap-2 bg-black/60 border border-[rgba(0,201,167,0.3)] rounded-full px-3 py-1.5">
                  <div className="pulse-dot animate bg-yellow-500 w-2 h-2 sm:w-2.5 sm:h-2.5" />
                    <span className="text-[9px] sm:text-[10px] font-black tracking-widest text-yellow-500 uppercase leading-none text-center">AI Guided Repair Active</span>
                  </div>
                  <div className="bg-black/80 border border-white/10 rounded-full px-3 py-1.5 flex items-center justify-center">
                    <span className="text-[9px] sm:text-[10px] font-black text-white/60 uppercase tracking-widest leading-none text-center">Panel DB-09 / Circuit A</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 sm:gap-2 flex-1 min-h-0 overflow-hidden">
                  <motion.div
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-2 min-h-0"
                  >
                    <div className="bg-black/80 border border-(--vizhi-teal)/30 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-xl flex-1 flex flex-col min-h-0 overflow-hidden">
                      <div className="flex items-center gap-1.5 mb-1.5 shrink-0">
                        <Cpu size={12} className="text-(--vizhi-teal)" />
                        <h3 className="text-[8px] sm:text-[9px] font-black text-(--vizhi-teal) uppercase tracking-widest">Repair Instructions</h3>
                      </div>

                      <div className="space-y-1.5 flex-1 min-h-0 overflow-hidden">
                        <div className="p-1.5 sm:p-2 bg-(--vizhi-teal)/15 border border-(--vizhi-teal)/40 rounded-lg sm:rounded-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 p-1 bg-(--vizhi-teal) text-black text-[7px] font-black px-1.5">CURRENT</div>
                          <div className="text-[8px] font-black text-white/50 mb-1">STEP 3 OF 5</div>
                          <div className="text-[9px] sm:text-[11px] font-black text-(--vizhi-teal) leading-tight uppercase mb-1">Plug the red wire into Terminal B4.</div>
                          <div className="text-[8px] sm:text-[9px] font-bold text-yellow-300/90 uppercase leading-tight mb-1">Keep the black probe in the COM port.</div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              animate={{ width: ["0%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="h-full bg-(--vizhi-teal)"
                            />
                          </div>
                        </div>

                        <div className="p-1.5 sm:p-2 bg-white/5 border border-white/10 rounded-lg sm:rounded-xl opacity-80">
                          <div className="text-[8px] font-black text-white/30 mb-1 uppercase">Next Step</div>
                          <div className="text-[8px] sm:text-[10px] font-black text-white/70 leading-tight uppercase">Set the multimeter to the AC 200V range.</div>
                        </div>
                      </div>

                      <div className="mt-1.5 pt-1.5 border-t border-white/5 shrink-0">
                        <div className="flex items-center gap-1.5 p-1.5 sm:p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg sm:rounded-xl">
                          <Info size={12} className="text-blue-400 shrink-0" />
                          <p className="text-[8px] sm:text-[9px] text-blue-400/80 font-black uppercase leading-tight">Stop immediately if you detect heat or sparks.</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="hidden md:flex flex-col gap-2 min-h-0"
                  >
                    <div className="bg-black/90 border-2 border-(--vizhi-teal)/40 rounded-2xl sm:rounded-3xl p-2 sm:p-3 shadow-2xl relative flex-1 flex flex-col items-center justify-center overflow-hidden min-h-0">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, var(--vizhi-teal) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />

                      <div className="relative w-full aspect-square max-w-[120px] sm:max-w-[170px] flex items-center justify-center">
                        <div className="absolute inset-0 border border-(--vizhi-teal)/20 rounded-xl rotate-45" />
                        <div className="absolute inset-0 border border-(--vizhi-teal)/10 rounded-xl -rotate-12" />

                        <motion.div
                          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.65, 0.35] }}
                          transition={{ duration: 1.6, repeat: Infinity }}
                          className="absolute w-9 h-9 border-2 border-yellow-500 rounded-full flex items-center justify-center"
                          style={{ top: '20%', right: '30%' }}
                        >
                          <Zap size={16} className="text-yellow-500" />
                        </motion.div>

                        <div className="z-10 bg-black/60 p-2 sm:p-3 rounded-xl sm:rounded-2xl border border-(--vizhi-teal)/50 backdrop-blur-md text-center">
                          <div className="flex flex-col items-center gap-1.5 sm:gap-2">
                            <Wrench size={24} className="text-(--vizhi-teal) animate-bounce" />
                            <div>
                              <div className="text-[8px] sm:text-[9px] font-black text-(--vizhi-teal) uppercase tracking-widest">Alignment Active</div>
                              <div className="text-[10px] sm:text-[12px] font-black text-white uppercase">Port: Terminal B4</div>
                              <div className="mt-1 text-[8px] font-black text-yellow-400 uppercase">Place the red wire here.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-yellow-500/20 border border-yellow-500/50 rounded-full text-[7px] sm:text-[8px] font-black text-yellow-500 uppercase tracking-tighter">Connect Here</span>
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-red-500/20 border border-red-500/50 rounded-full text-[7px] sm:text-[8px] font-black text-red-300 uppercase tracking-tighter">Red to B4</span>
                        <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white/5 border border-white/10 rounded-full text-[7px] sm:text-[8px] font-black text-white/40 uppercase tracking-tighter">Black to COM</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ x: 16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-2 min-h-0"
                  >
                    <div className="bg-black/80 border border-blue-500/30 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-xl backdrop-blur-xl flex-1 flex flex-col min-h-0 overflow-hidden">
                      <div className="flex items-center gap-1.5 mb-2 shrink-0">
                        <Activity size={12} className="text-blue-400" />
                        <h3 className="text-[8px] sm:text-[9px] font-black text-blue-400 uppercase tracking-widest">Meter Readings</h3>
                      </div>

                      <div className="space-y-2 flex-1 min-h-0 overflow-hidden">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-[8px] sm:text-[9px] font-black text-white/40 uppercase">Voltage (AC)</div>
                          <div className="text-[clamp(1.25rem,2.4vw,1.9rem)] font-black text-white mono-numeric tracking-tighter leading-none">
                            230.4 <span className="text-blue-400 text-sm uppercase">V</span>
                          </div>
                          <div className="mt-0.5 text-[8px] sm:text-[9px] font-black text-(--vizhi-teal) uppercase">Live reading is updating now.</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <div className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase mb-1">Resistance</div>
                            <div className="text-sm sm:text-base font-black text-(--vizhi-teal) mono-numeric">14.2 Ω</div>
                          </div>
                          <div>
                            <div className="text-[8px] sm:text-[9px] font-black text-white/40 uppercase mb-1">Current</div>
                            <div className="text-sm sm:text-base font-black text-(--vizhi-teal) mono-numeric">1.2 A</div>
                          </div>
                        </div>

                        <div className="pt-1.5 sm:pt-2 border-t border-white/10">
                          <div className="flex justify-between text-[9px] font-black text-white/40 uppercase mb-2">Power Load</div>
                          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-1.5">
                            <motion.div
                              animate={{ width: "78%" }}
                              transition={{ duration: 1 }}
                              className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                            />
                          </div>
                          <div className="text-[9px] font-black text-blue-400 text-right uppercase tracking-widest">78% Nominal</div>
                        </div>

                        <div className="rounded-lg sm:rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-1.5 sm:p-2">
                          <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black uppercase text-yellow-400">
                            <AlertTriangle size={12} />
                            Safety Check
                          </div>
                          <p className="mt-1 text-[8px] sm:text-[9px] font-bold leading-snug text-yellow-100/80">
                            If the reading stays between 220V and 240V, the connection is correct.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : isDefence ? (
            <div className="flex flex-col gap-4 w-full h-full max-w-6xl mx-auto px-4 pb-2">
              {/* Header: Tactical Info & GPS */}
              <div className="flex justify-between items-start mb-2 px-2">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 bg-black/80 border border-red-500/50 rounded-full px-4 py-1 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[10px] font-black tracking-[0.2em] text-red-500 uppercase">Zone Alpha</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 bg-black/60 border border-white/10 rounded-full px-3 py-1">
                      <MapPin size={10} className="text-(--vizhi-teal)" />
                      <span className="text-[9px] font-mono text-(--vizhi-teal) font-black">8°10'30"N 77°25'45"E</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-black/60 border border-(--vizhi-teal)/30 rounded-lg px-3 py-1 w-fit">
                      <span className="text-[9px] font-black text-(--vizhi-teal) uppercase tracking-widest">Secure Layer-7</span>
                    </div>
                    {/* Real Rotating Compass */}
                    <div className="relative flex items-center gap-4 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                      <div className="relative w-10 h-10">
                        {/* Outer Ring */}
                        <div className="absolute inset-0 border border-(--vizhi-teal)/20 rounded-full" />
                        {/* Rotating Markings */}
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0 flex items-center justify-center"
                        >
                          <span className="absolute top-0 text-[8px] font-black text-(--vizhi-teal)">N</span>
                          <span className="absolute right-0 text-[8px] font-black text-(--vizhi-teal)/40 rotate-90">E</span>
                          <span className="absolute bottom-0 text-[8px] font-black text-(--vizhi-teal)/40">S</span>
                          <span className="absolute left-0 text-[8px] font-black text-(--vizhi-teal)/40 -rotate-90">W</span>
                        </motion.div>
                        {/* Center Needle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-[1px] h-4 bg-red-500 shadow-[0_0_8px_red]" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-mono font-black text-(--vizhi-teal) drop-shadow-md">342° NW</span>
                        <span className="text-[8px] font-black text-white/40 uppercase">Bearing</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tactical Minimap */}
                <div className="relative w-24 h-24 sm:w-40 sm:h-40 bg-black/80 rounded-xl border-2 border-(--vizhi-teal)/50 overflow-hidden shadow-2xl">
                  {/* Radar Grid */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none" 
                       style={{ backgroundImage: 'radial-gradient(circle, var(--vizhi-teal) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-[1px] bg-(--vizhi-teal)/30" />
                    <div className="h-full w-[1px] bg-(--vizhi-teal)/30" />
                  </div>
                  {/* Radar Sweep */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 origin-center bg-gradient-to-tr from-(--vizhi-teal)/20 to-transparent"
                    style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)' }}
                  />
                  {/* Blips */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_red] animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-(--vizhi-teal) rounded-full shadow-[0_0_8px_var(--vizhi-teal)]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Crosshair size={20} className="text-(--vizhi-teal) drop-shadow-md" />
                  </div>
                  <div className="absolute bottom-2 left-2 text-[8px] font-black text-(--vizhi-teal) uppercase opacity-60">Map: Sector 7-B</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Left: Tactical Stats */}
                <div className="md:col-span-4 space-y-3 hidden sm:block">
                  <div className="bg-black/80 border border-white/20 p-3 rounded-xl flex items-center gap-3">
                    <ShieldAlert size={20} className="text-red-500" />
                    <div>
                      <div className="text-[9px] font-black text-white/60 uppercase">Threat</div>
                      <div className="text-lg font-black text-red-500">CRITICAL</div>
                    </div>
                  </div>
                  <div className="bg-black/80 border border-white/20 p-3 rounded-xl flex items-center gap-3">
                    <Battery size={20} className="text-(--vizhi-teal)" />
                    <div>
                      <div className="text-[9px] font-black text-white/60 uppercase">Battery</div>
                      <div className="text-lg font-black text-(--vizhi-teal)">94%</div>
                    </div>
                  </div>
                </div>

                {/* Center: Commander Comms */}
                <div className="md:col-span-8">
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-black/90 border-2 border-(--vizhi-teal) p-4 sm:p-6 rounded-2xl shadow-[0_0_30px_rgba(0,201,167,0.3)] relative overflow-hidden"
                  >
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-(--vizhi-teal) p-2 rounded">
                        <Radio size={20} className="text-black" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-black text-(--vizhi-teal) uppercase tracking-[0.2em] drop-shadow-md">Incoming Comms</span>
                        <span className="text-sm font-black text-(--vizhi-teal)">COMMANDER HQ</span>
                      </div>
                      <div className="ml-auto text-[10px] font-mono text-(--vizhi-teal) opacity-60">ID: CMD-01-DELTA</div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[14px] sm:text-[18px] text-(--vizhi-teal) font-black leading-snug italic drop-shadow-lg">
                        "UNITS 4 & 7, ADVANCE TO THE EXTRACTION POINT IN SECTOR B. ENEMY SNIPER SPOTTED IN THE NORTH TOWER. EXTREME CAUTION ADVISED."
                      </p>
                      
                      <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                        <div className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded text-[9px] font-black text-red-500 uppercase">High Priority</div>
                        <div className="px-2 py-0.5 bg-(--vizhi-teal)/20 border border-(--vizhi-teal)/50 rounded text-[9px] font-black text-(--vizhi-teal) uppercase">Auth: L5</div>
                      </div>
                    </div>
                  </motion.div>
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
