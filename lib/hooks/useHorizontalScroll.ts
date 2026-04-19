"use client";

import { useEffect, useRef, useCallback } from "react";

function isMobile() {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

export function useHorizontalScroll(onSlideChange: (slide: number) => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback(
    (n: number, smooth = true) => {
      const el = containerRef.current;
      if (!el) return;
      const clamped = Math.max(1, Math.min(n, 14));

      if (isMobile()) {
        // Vertical scroll on mobile: find the nth .slide child
        const slides = el.querySelectorAll(".slide");
        const target = slides[clamped - 1];
        if (target) {
          target.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
        }
      } else {
        el.scrollTo({
          left: (clamped - 1) * window.innerWidth,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    },
    []
  );

  // Track current slide from scroll position
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let slide: number;
        if (isMobile()) {
          // Vertical: figure out which slide is most visible
          const slides = el.querySelectorAll(".slide");
          const scrollTop = el.scrollTop;
          slide = 1;
          slides.forEach((s, i) => {
            const rect = (s as HTMLElement).offsetTop;
            if (scrollTop >= rect - 200) slide = i + 1;
          });
        } else {
          slide = Math.round(el.scrollLeft / window.innerWidth) + 1;
        }
        onSlideChange(slide);
        history.replaceState(null, "", `#slide-${slide}`);
        ticking = false;
      });
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [onSlideChange]);

  // Handle initial hash
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#slide-(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      scrollToSlide(n, false);
    }
  }, [scrollToSlide]);

  // Keyboard navigation (desktop only)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isMobile()) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      const el = containerRef.current;
      if (!el) return;
      const current = Math.round(el.scrollLeft / window.innerWidth) + 1;

      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        scrollToSlide(current + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollToSlide(current - 1);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [scrollToSlide]);

  return { containerRef, scrollToSlide };
}
