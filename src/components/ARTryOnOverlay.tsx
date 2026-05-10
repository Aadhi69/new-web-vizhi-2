"use client";

import React from "react";
import { X } from "lucide-react";

export default function ARTryOnOverlay({
  onClose,
  hud,
  isReverseAR,
}: {
  onClose: () => void;
  hud?: React.ReactNode;
  isReverseAR?: boolean;
}) {
  return (
    <div
      className={`fixed inset-0 z-100 overflow-hidden ${isReverseAR ? "bg-transparent" : "bg-black"}`}
    >
      <button
        onClick={onClose}
        className="group absolute top-8 right-8 z-50 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition-colors hover:bg-black/60"
      >
        <X
          size={24}
          className="transition-transform duration-300 group-hover:rotate-90"
        />
      </button>

      <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
        <div className="text-center px-6">
          <h3 className="text-lg font-semibold">AR disabled</h3>
          <p className="text-sm opacity-80">
            This build has WebGL/AR features disabled.
          </p>
        </div>
      </div>
    </div>
  );
}
