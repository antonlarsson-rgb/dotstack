"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SlideContextType {
  currentSlide: number;
  setCurrentSlide: (n: number) => void;
  agentOpen: boolean;
  setAgentOpen: (open: boolean) => void;
  totalSlides: number;
}

const SlideContext = createContext<SlideContextType | null>(null);

export function SlideProvider({ children }: { children: ReactNode }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [agentOpen, setAgentOpen] = useState(false);

  return (
    <SlideContext.Provider
      value={{
        currentSlide,
        setCurrentSlide,
        agentOpen,
        setAgentOpen,
        totalSlides: 14,
      }}
    >
      {children}
    </SlideContext.Provider>
  );
}

export function useSlideContext() {
  const ctx = useContext(SlideContext);
  if (!ctx) throw new Error("useSlideContext must be used within SlideProvider");
  return ctx;
}
