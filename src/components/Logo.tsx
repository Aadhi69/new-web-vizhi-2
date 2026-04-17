"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Logo() {
  const pathname = usePathname();
  const [showHeader, setShowHeader] = useState(pathname !== "/");
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";

  useEffect(() => {
    if (pathname !== "/") {
      setShowHeader(true);
      return;
    }

    const onScroll = () => {
      const threshold = window.innerHeight * 2.2;
      setShowHeader(window.scrollY >= threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-6 md:px-10 py-4 md:py-6 z-50 transition-all duration-500 ${
        showHeader
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between rounded-2xl border border-white/30 bg-black/85 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl px-4 md:px-6 py-3 md:py-3.5">
        <Link
          href="/"
          onClick={handleClick}
          className="flex items-center gap-3 md:gap-4 group"
        >
          <span className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center opacity-95 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
            <Image
              src="/Vizhi_Logo.png"
              alt="Vizhi Logo"
              fill
              className="object-contain"
              priority
            />
          </span>
          <span className="nitro-text nitro-text-soft group-hover:text-white transition-colors text-[10px] md:text-xs uppercase tracking-[0.22em]">
            Vizhi xr
          </span>
        </Link>

        <div className="flex items-center gap-2 md:gap-3 rounded-xl border border-white/20 bg-white/5 p-1.5 text-[10px] md:text-xs uppercase tracking-[0.16em]">
          <Link
            href="/"
            className={`px-3 md:px-4 py-1.5 rounded-lg transition-all ${
              isHome
                ? "bg-white text-black"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Home
          </Link>
          <Link
            href="/contact"
            className={`px-3 md:px-4 py-1.5 rounded-lg transition-all ${
              isContact
                ? "bg-white text-black"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            Contact
          </Link>
        </div>

        <div className="hidden sm:flex items-center">
          <Link
            href="/contact"
            className="px-4 md:px-5 py-2 rounded-xl border border-white/40 bg-white text-black text-[10px] md:text-xs uppercase tracking-[0.16em] font-semibold hover:bg-transparent hover:text-white transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
