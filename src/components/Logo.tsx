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
      <header aria-label="Site Header" className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-[1100px]">
        <nav
          className={`relative transition-all duration-500 rounded-full border border-white/10 ${
            scrolled
              ? "bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
              : "bg-black/30 backdrop-blur-xl"
          }`}
        >
          <div
            className={`flex items-center justify-between px-6 transition-[height] duration-500 ${
              scrolled ? "h-[54px]" : "h-[62px]"
            }`}
          >
            {/* Left: Logo */}
            <Link
              href="/"
              onClick={handleClick}
              className="group flex items-center gap-3"
              aria-label="Vizhi home"
            >
              <div className="relative h-7 w-28 md:h-8 md:w-32 transition-opacity group-hover:opacity-80">
                <Image
                  src="/Vizhi_Logo_title.png"
                  alt="Vizhi XR Platform Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Center: Desktop Links */}
            <div className="hidden items-center gap-8 md:flex">
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
                  className="text-[13px] font-medium text-white/60 transition-colors hover:text-white"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-full bg-white px-5 text-[13px] font-semibold text-black transition-transform hover:scale-105 active:scale-95"
              >
                Reserve
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="flex h-10 w-10 items-center justify-center text-white transition-opacity hover:opacity-70 md:hidden"
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
