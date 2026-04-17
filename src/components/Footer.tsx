"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const platformLinks = [
    { label: "Technology", href: "#" },
    { label: "Applications", href: "#" },
    { label: "Architecture", href: "#" },
    { label: "Vision", href: "#" },
  ];

  const companyLinks = [
    { label: "About", href: "#" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "X", href: "#", icon: Twitter },
    { label: "GitHub", href: "#", icon: Github },
    { label: "YouTube", href: "#", icon: Youtube },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-12 sm:pb-14 md:pb-16 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70vw] h-56 rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 sm:mb-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="vizhi-kicker text-white/70 nitro-text nitro-text-soft">
              Vizhi XR Platform
            </span>
            <h2 className="vizhi-section-title text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Built For Teams That Run Critical Operations.
            </h2>
            <p className="vizhi-card-copy text-white/55 text-sm sm:text-base max-w-md font-light">
              Enterprise-grade augmented intelligence for healthcare,
              manufacturing, field services, and defense workflows.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl border border-white/20 bg-white/5 text-white/75 hover:text-black hover:bg-white hover:border-white transition-all duration-300 flex items-center justify-center"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="vizhi-kicker text-white/90 mb-5">Platform</h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group text-sm text-white/55 hover:text-white transition-colors inline-flex items-center gap-2"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="vizhi-kicker text-white/90 mb-5">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/55 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="vizhi-kicker text-white/90 mb-5">Contact</h3>
            <div className="space-y-4 text-sm text-white/55">
              <a
                href="mailto:vizhixr@gmail.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail size={16} />
                vizhixr@gmail.com
              </a>
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                Tamil Nadu
              </p>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-8 sm:pt-10 md:pt-11 max-w-7xl mx-auto px-6 lg:px-12"
      >
        <p className="text-white/30 text-xs font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} Vizhi xr. All rights reserved.
        </p>
        <div className="flex items-center gap-4 sm:gap-6 text-xs text-white/55 uppercase tracking-[0.14em]">
          {legalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <span className="text-white/60 text-sm font-medium tracking-wide mb-4 md:mb-0">
          Engineered in Tamil Nadu
        </span>
      </motion.div>
    </footer>
  );
}
