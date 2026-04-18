"use client";

import { useCallback } from "react";
import { SlideProvider, useSlideContext } from "@/lib/context/SlideContext";
import { useHorizontalScroll } from "@/lib/hooks/useHorizontalScroll";
import { TopBar } from "@/components/ui/TopBar";
import { NavBar } from "@/components/ui/NavBar";
import { AgentDrawer, AgentButton } from "@/components/ui/AgentDrawer";

import { Slide01Hero } from "@/components/slides/Slide01Hero";
import { Slide02Observation } from "@/components/slides/Slide02Observation";
import { Slide03WhyNow } from "@/components/slides/Slide03WhyNow";
import { Slide04Solution } from "@/components/slides/Slide04Solution";
import { Slide14Founder } from "@/components/slides/Slide14Founder";
import { Slide10Architecture } from "@/components/slides/Slide10Architecture";
import { Slide06AppStore } from "@/components/slides/Slide06AppStore";
import { Slide08CompanyFinancials } from "@/components/slides/Slide08CompanyFinancials";
import { Slide13Traction } from "@/components/slides/Slide13Traction";
import { Slide10Roadmap } from "@/components/slides/Slide10Roadmap";
import { Slide12AskAgent } from "@/components/slides/Slide12AskAgent";
import { Slide16Ask } from "@/components/slides/Slide16Ask";
import { Slide05LiveProduct } from "@/components/slides/Slide05LiveProduct";
import { Slide17Contact } from "@/components/slides/Slide17Contact";

function PitchDeck() {
  const { setCurrentSlide } = useSlideContext();

  const handleSlideChange = useCallback(
    (slide: number) => setCurrentSlide(slide),
    [setCurrentSlide]
  );

  const { containerRef, scrollToSlide } = useHorizontalScroll(handleSlideChange);

  return (
    <>
      <TopBar />
      <NavBar onNavigate={scrollToSlide} />
      <AgentButton />
      <AgentDrawer />
      <div ref={containerRef} className="scroll-container">
        {/* 1. What is .stack */}
        <Slide01Hero />
        {/* 2. The problem: SaaS sprawl, unused licenses, fear of cancelling */}
        <Slide02Observation />
        {/* 3. Why the timing is right */}
        <Slide03WhyNow />
        {/* 4. How .stack works: Stackie model, no fear of missing features */}
        <Slide04Solution />
        {/* 5. Who is behind this */}
        <Slide14Founder />
        {/* 6. Technical architecture */}
        <Slide10Architecture />
        {/* 7. The App Store: 42 apps */}
        <Slide06AppStore />
        {/* 8. Company economics (interactive) */}
        <Slide08CompanyFinancials />
        {/* 9. What we have today */}
        <Slide13Traction />
        {/* 10. 12-month plan */}
        <Slide10Roadmap />
        {/* 11. Ask the AI anything */}
        <Slide12AskAgent />
        {/* 12. The investment ask */}
        <Slide16Ask />
        {/* 13. The live product */}
        <Slide05LiveProduct />
        {/* 14. Contact */}
        <Slide17Contact />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <SlideProvider>
      <PitchDeck />
    </SlideProvider>
  );
}
