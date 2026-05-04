"use client";

import { useEffect } from "react";

export function useReveal() {
    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.12,
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    // Unobserve after it becomes visible to animate only once
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
            observer.disconnect();
        };
    }, []);
}
