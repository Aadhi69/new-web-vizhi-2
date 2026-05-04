"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const existing = localStorage.getItem("vizhi_cookie_consent");
      if (!existing) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem("vizhi_cookie_consent", "accepted");
    } catch (e) {
      /* ignore */
    }
    setVisible(false);
  }

  function decline() {
    try {
      localStorage.setItem("vizhi_cookie_consent", "declined");
    } catch (e) {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 md:inset-x-20 bottom-4 z-50 flex flex-col md:flex-row items-center justify-between gap-3 bg-black/85 border border-white/10 p-3 md:p-4 rounded-md md:rounded-lg text-xs md:text-sm text-[var(--text-body)] shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
      {/* Full text for medium+ screens */}
      <div className="hidden md:block">
        We use cookies to improve your experience and analyze traffic. By
        choosing &nbsp;<strong>Accept</strong>&nbsp; you consent to cookies.
        Read our &nbsp;
        <Link href="/cookies" className="text-[var(--accent)] underline">
          cookie policy
        </Link>
        .
      </div>

      {/* Short text for small screens */}
      <div className="md:hidden">
        We use cookies.{" "}
        <Link href="/cookies" className="text-[var(--accent)] underline">
          Learn more
        </Link>
        .
      </div>

      <div className="flex-shrink-0 flex items-center gap-2">
        <button
          onClick={decline}
          className="inline-flex items-center gap-1 bg-transparent border border-white/18 text-[var(--text-body)] px-3 py-1 text-xs rounded-full hover:border-white/30 transition-colors"
          aria-label="Decline cookies"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="inline-flex items-center gap-1 bg-white text-black px-3 py-1 text-xs font-medium rounded-full hover:bg-white/90 transition-colors"
          aria-label="Accept cookies"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
