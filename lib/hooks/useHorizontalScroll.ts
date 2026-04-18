"use client";

import { useEffect, useRef, useCallback } from "react";

export function useHorizontalScroll(onSlideChange: (slide: number) => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToSlide = useCallback(
    (n: number, smooth = true) => {
      const el = containerRef.current;
      if (!el) return;
      const clamped = Math.max(1, Math.min(n, 17));
      el.scrollTo({
        left: (clamped - 1) * window.innerWidth,
        behavior: smooth ? "smooth" : "auto",
      });
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
        const slide = Math.round(el.scrollLeft / window.innerWidth) + 1;
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

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
