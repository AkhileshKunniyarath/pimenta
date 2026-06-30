"use client";

import * as React from "react";
import { useEffect, useState } from "react";

export default function SplashLoader({ onComplete }: { onComplete?: () => void }) {
  const [phase, setPhase] = useState("enter"); // enter → progress → exit → done

  useEffect(() => {
    console.log("SplashLoader: useEffect mounted");
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      console.log("SplashLoader: prefers-reduced-motion found, skipping splash");
      setPhase("done");
      onComplete?.();
      return;
    }
    console.log("SplashLoader: starting timeout sequence");
    const t1 = setTimeout(() => {
      console.log("SplashLoader: phase -> progress");
      setPhase("progress");
    }, 500);
    const t2 = setTimeout(() => {
      console.log("SplashLoader: phase -> exit");
      setPhase("exit");
    }, 1900);
    const t3 = setTimeout(() => {
      console.log("SplashLoader: phase -> done");
      setPhase("done");
      console.log("SplashLoader: calling onComplete");
      onComplete?.();
    }, 2650);
    return () => {
      console.log("SplashLoader: useEffect cleanup, clearing timeouts");
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`splash-overlay splash-phase-${phase}`} aria-hidden="true" role="presentation">
      <div className="splash-bg" />
      <div className="splash-curtain" />
      <div className="splash-center">
        <div className="splash-logo-wrap">
          <div className="splash-logo-glow" />
          <div className="splash-logo-circle">
            <img src="/logo.png" alt="The Pimenta" className="splash-logo" draggable={false} />
          </div>
        </div>
        <div className="splash-brand">
          <span className="splash-brand-the">The</span>
          <span className="splash-brand-name">Pimenta</span>
        </div>
        <div className="splash-tagline">Farm 1962 &middot; Kerala Midlands</div>
        <div className="splash-bar-track">
          <div className="splash-bar-fill" />
        </div>
      </div>
    </div>
  );
}
