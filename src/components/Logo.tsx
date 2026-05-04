"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Logo() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const links = [
    { name: "Technology", href: "/#technology" },
    { name: "Applications", href: "/#applications" },
    { name: "Vision", href: "/#platform" },
  ];

  return (
    <>
      <header aria-label="Site Header">
        <nav
          className={`fixed left-0 top-0 z-[100] w-full border-b transition-all duration-[var(--duration-base)] ${
            scrolled
              ? "border-white/10 bg-black/78 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
              : "border-white/5 bg-black/28 backdrop-blur-md"
          }`}
        >
          <div
            className={`container flex items-center justify-between transition-[height] duration-[var(--duration-base)] ${
              scrolled ? "h-[58px]" : "h-[68px]"
            }`}
          >
            {/* Left: Logo */}
            <Link
              href="/"
              onClick={handleClick}
              className="group relative flex min-w-0 items-center gap-3"
              aria-label="Vizhi home"
            >
              <div className="hidden md:flex relative h-8 w-32 overflow-hidden rounded-md transition-opacity group-hover:opacity-80 md:h-9 md:w-40">
                <Image
                  src="/Vizhi_Logo_title.png"
                  alt="Vizhi XR Platform Logo"
                  fill
                  sizes="(max-width: 768px) 128px, 160px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="whitespace-nowrap text-[11px] font-semibold tracking-[0.28em] text-[var(--text-muted)] sm:text-[12px]">
                VIZHI XR
              </span>
            </Link>

            {/* Center: Desktop Links */}
            <div className="hidden items-center gap-9 md:flex">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (pathname === "/" && link.href.includes("#")) {
                      e.preventDefault();
                      const id = link.href.split("#")[1];
                      const el = document.getElementById(id);
                      if (el)
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    }
                  }}
                  className="relative py-2 text-[13px] font-normal text-[var(--text-muted)] transition-colors duration-[var(--duration-base)] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-[width] after:duration-[var(--duration-base)] hover:text-[var(--text-primary)] hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: CTA */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className="group inline-flex h-9 items-center gap-2 rounded-full border border-white/18 bg-white/8 px-4 text-[13px] font-medium text-[var(--text-primary)] transition-all duration-[var(--duration-base)] hover:border-white hover:bg-white hover:text-black"
              >
                Reserve
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center text-[var(--text-primary)] transition-opacity hover:opacity-70 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[90] pt-[68px] transition-all duration-[var(--duration-slow)] md:hidden ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: "rgba(0,0,0,0.94)",
          backdropFilter: "blur(18px) saturate(150%)",
          WebkitBackdropFilter: "blur(18px) saturate(150%)",
        }}
      >
        <div
          className={`container flex flex-col transition-transform duration-[var(--duration-slow)] ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-3"
          }`}
        >
          <div className="flex flex-col border-t border-white/10 py-5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (pathname === "/" && link.href.includes("#")) {
                    e.preventDefault();
                    const id = link.href.split("#")[1];
                    const el = document.getElementById(id);
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between border-b border-white/10 py-5 text-[22px] font-medium text-[var(--text-primary)] transition-colors duration-[var(--duration-base)] hover:text-white/70"
              >
                {link.name}
                <ArrowUpRight size={18} className="text-white/45" />
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              href="/contact"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white bg-white px-5 text-[14px] font-medium text-black"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reserve
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
