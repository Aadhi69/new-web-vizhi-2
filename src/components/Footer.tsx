"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const platformLinks = ["Technology", "Applications", "Vision"];
  const companyLinks = ["Contact"];
  const socialLinks = [
    { label: "X", href: "#", icon: Twitter },
    { label: "LinkedIn", href: "#", icon: Linkedin },
    { label: "GitHub", href: "#", icon: Github },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-subtle)] bg-[#050505] py-12 sm:py-20 lg:py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left lg:col-span-2">
            <h2 className="mb-4 text-2xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              Vizhi XR
            </h2>
            <p className="mb-6 max-w-sm text-sm font-normal leading-relaxed text-[var(--text-muted)] sm:text-base">
              The next interface for human intelligence. Integrating digital
              computing seamlessly with reality.
            </p>
            <div className="mt-8 flex gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/[0.03] text-[var(--text-muted)] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2">
            <div className="text-center sm:text-left">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Platform
              </h3>
              <ul className="space-y-4">
                {platformLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                Company
              </h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[var(--text-muted)] transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-20 grid grid-cols-1 items-center gap-6 border-t border-white/5 pt-10 text-center sm:grid-cols-3 sm:text-left"
        >
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--text-muted)] sm:justify-self-start">
            {"\u00a9"} {currentYear} Vizhi XR. All rights reserved.
          </p>

          <p className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-body)] sm:justify-self-center">
            Engineered in Tamilnadu
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] sm:justify-self-end">
            <a href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="/terms" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="/cookies" className="transition-colors hover:text-white">
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
