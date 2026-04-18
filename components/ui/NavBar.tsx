"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSlideContext } from "@/lib/context/SlideContext";

interface NavBarProps {
  onNavigate: (slide: number) => void;
}

export function NavBar({ onNavigate }: NavBarProps) {
  const { currentSlide, totalSlides } = useSlideContext();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex items-center gap-3 px-8 py-5">
      <button
        onClick={() => onNavigate(currentSlide - 1)}
        disabled={currentSlide <= 1}
        className="p-1.5 rounded-md hover:bg-[var(--hover-bg)] disabled:opacity-30 transition-colors duration-[180ms]"
        aria-label="Previous slide"
      >
        <ChevronLeft size={18} strokeWidth={1.5} />
      </button>

      <span className="font-mono text-[13px] text-[var(--text-tertiary)] tabular-nums min-w-[40px] text-center">
        {currentSlide}/{totalSlides}
      </span>

      <button
        onClick={() => onNavigate(currentSlide + 1)}
        disabled={currentSlide >= totalSlides}
        className="p-1.5 rounded-md hover:bg-[var(--hover-bg)] disabled:opacity-30 transition-colors duration-[180ms]"
        aria-label="Next slide"
      >
        <ChevronRight size={18} strokeWidth={1.5} />
      </button>
    </div>
  );
}
