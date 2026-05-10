"use client";

import { useEffect } from "react";

export function useReveal() {
    useEffect(() => {
        document.documentElement.classList.add("reveal-ready");

        return () => {
            document.documentElement.classList.remove("reveal-ready");
        };
    }, []);
}
