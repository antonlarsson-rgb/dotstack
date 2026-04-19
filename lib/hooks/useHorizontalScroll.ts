"use client";

import { useEffect, useRef, useCallback, useState } from "react";

export function useHorizontalScroll(onSlideChange: (slide: number) => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobile, setMobile] = useState(false);

  // Detect mobile once on mount and on resize
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const scrollToSlide = useCallback(
    (n: number, smooth = true) => {
      const el = containerRef.current;
      if (!el) return;
      const clamped = Math.max(1, Math.min(n, 14));

      if (mobile) {
        const slides = el.querySelectorAll(".slide");
        const target = slides[clamped - 1] as HTMLElement | undefined;
        if (target) {
          el.scrollTo({
            top: target.offsetTop,
            behavior: smooth ? "smooth" : "auto",
          });
        }
      } else {
        el.scrollTo({
          left: (clamped - 1) * window.innerWidth,
          behavior: smooth ? "smooth" : "auto",
        });
      }
    },
    [mobile]
  );

  // Track current slide — throttled
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timeout) return;
      timeout = setTimeout(() => {
        timeout = null;
        try {
          let slide: number;
          if (mobile) {
            const scrollTop = el.scrollTop;
            const slides = el.children;
            slide = 1;
            for (let i = 0; i < slides.length; i++) {
              const child = slides[i] as HTMLElement;
              if (child.classList.contains("slide") && scrollTop >= child.offsetTop - 300) {
                slide = i + 1;
              }
            }
          } else {
            slide = Math.round(el.scrollLeft / window.innerWidth) + 1;
          }
          onSlideChange(slide);
        } catch {
          // ignore scroll tracking errors
        }
      }, 150);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [onSlideChange, mobile]);

  // Handle initial hash
  useEffect(() => {
    const hash = window.location.hash;
    const match = hash.match(/^#slide-(\d+)$/);
    if (match) {
      const n = parseInt(match[1], 10);
      setTimeout(() => scrollToSlide(n, false), 100);
    }
  }, [scrollToSlide]);

  // Keyboard navigation (desktop only)
  useEffect(() => {
    if (mobile) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

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
  }, [scrollToSlide, mobile]);

  return { containerRef, scrollToSlide };
}
