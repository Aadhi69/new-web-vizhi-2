"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock3, ScanSearch, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Metric = {
  label: string;
  value: number;
  suffix: string;
  decimals?: number;
  description: string;
};

function useCountUp(
  target: number,
  start: boolean,
  duration = 1600,
  decimals = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Number((target * eased).toFixed(decimals));

      setValue(nextValue);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frame);
  }, [decimals, duration, start, target]);

  return value;
}

function MetricCard({
  metric,
  index,
  shouldAnimate,
}: {
  metric: Metric;
  index: number;
  shouldAnimate: boolean;
}) {
  const current = useCountUp(
    metric.value,
    shouldAnimate,
    1500 + index * 220,
    metric.decimals ?? 0,
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="glass-panel glass-panel-hover rounded-2xl p-6 md:p-7 lg:p-8"
    >
      <p className="text-white/35 text-xs uppercase tracking-[0.18em] mb-3">
        {metric.label}
      </p>
      <p className="vizhi-display-title text-4xl md:text-5xl text-white leading-none mb-3">
        {current}
        <span className="text-white/60">{metric.suffix}</span>
      </p>
      <p className="vizhi-card-copy text-white/55 text-sm md:text-base">
        {metric.description}
      </p>
    </motion.article>
  );
}

export default function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-160px" });

  const metrics: Metric[] = [
    {
      label: "Hands-Free Productivity",
      value: 42,
      suffix: "%",
      description: "Average task-time reduction in guided workflow simulations.",
    },
    {
      label: "Decision Velocity",
      value: 3.1,
      suffix: "x",
      decimals: 1,
      description:
        "Faster spatial decision cycles when teams use contextual overlays.",
    },
    {
      label: "Platform Availability",
      value: 99.97,
      suffix: "%",
      decimals: 2,
      description:
        "Resilient architecture designed for operationally critical environments.",
    },
  ];

  const rails = [
    { label: "Healthcare", width: "93%" },
    { label: "Field Services", width: "87%" },
    { label: "Manufacturing", width: "90%" },
    { label: "Logistics", width: "84%" },
  ];

  const deploymentTracks = [
    "SOC2-ready controls",
    "On-prem + cloud deployment",
    "Offline-first edge execution",
    "Role-based overlays",
    "Existing ERP and CMMS integration",
    "Zero-disruption rollout",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-28 md:py-36 border-y border-white/8 bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-[10%] h-56 w-56 rounded-full bg-white/8 blur-[120px]" />
        <div className="absolute bottom-0 right-[4%] h-72 w-72 rounded-full bg-white/7 blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.06)_0%,transparent_42%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-7 mb-11 md:mb-14"
        >
          <div className="max-w-3xl">
            <span className="vizhi-kicker text-white/65">Operational Impact</span>
            <h2 className="vizhi-section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mt-3 mb-4 md:mb-5">
              Measurable Outcomes,
              <span className="block nitro-text nitro-text-soft">
                Enterprise-Grade Confidence.
              </span>
            </h2>
            <p className="vizhi-section-lead text-white/58 max-w-2xl">
              Vizhi is engineered to move from pilot to production quickly,
              with controls, observability, and deployment flexibility that
              satisfy serious operating teams.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 self-start lg:self-auto rounded-full border border-white/25 bg-white/7 px-5 py-3 text-sm md:text-base text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Schedule Enterprise Demo
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 md:mb-12">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.label}
              metric={metric}
              index={index}
              shouldAnimate={isInView}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 lg:items-start">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-8 glass-panel rounded-2xl p-6 md:p-8"
          >
            <div className="flex items-center gap-3 text-white/78 mb-7">
              <ScanSearch size={18} />
              <p className="vizhi-kicker">Readiness Matrix</p>
            </div>

            <div className="space-y-5">
              {rails.map((rail, index) => (
                <div key={rail.label}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-white/72 tracking-wide">{rail.label}</span>
                    <span className="text-white/45">{rail.width}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: rail.width }}
                      viewport={{ once: true, margin: "-70px" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.12 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full bg-linear-to-r from-white/80 via-white to-white/70"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="rounded-xl border border-white/15 bg-black/35 p-4 flex items-center gap-3">
                <ShieldCheck size={18} className="text-white/80" />
                <span className="text-white/70 text-sm">Security-First Design</span>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/35 p-4 flex items-center gap-3">
                <Clock3 size={18} className="text-white/80" />
                <span className="text-white/70 text-sm">Rapid Pilot Timelines</span>
              </div>
              <div className="rounded-xl border border-white/15 bg-black/35 p-4 flex items-center gap-3">
                <Zap size={18} className="text-white/80" />
                <span className="text-white/70 text-sm">Low-Latency Performance</span>
              </div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.62, ease: "easeOut", delay: 0.05 }}
            className="lg:col-span-4 lg:self-start glass-panel rounded-2xl p-6 md:p-7 overflow-hidden"
          >
            <p className="vizhi-kicker text-white/70 mb-4">Deployment Tracks</p>
            <p className="vizhi-card-copy text-sm text-white/55 mb-6">
              Deploy in the model your organization already trusts, without
              rewriting core operational systems.
            </p>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-linear-to-r from-[#050505] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-[#050505] to-transparent z-10" />
              <div className="overflow-hidden">
                <div className="flex gap-2 w-max animate-infinite-scroll will-change-transform pr-2">
                  {[...deploymentTracks, ...deploymentTracks].map((item, index) => (
                    <span
                      key={`${item}-${index}`}
                      className="shrink-0 rounded-full border border-white/20 bg-white/8 px-3 py-1.5 text-xs text-white/80 tracking-wide"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}