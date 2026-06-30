"use client";

import * as React from "react";
import { useState } from "react";
import PimentaPrototype from "./PimentaPrototype";
import SplashLoader from "./SplashLoader";

export default function SiteShell({ initialContent }: { initialContent: any }) {
  const [splashDone, setSplashDone] = useState(false);
  console.log("SiteShell: render, splashDone =", splashDone);
  return (
    <>
      <SplashLoader onComplete={() => {
        console.log("SiteShell: onComplete callback fired, setting splashDone = true");
        setSplashDone(true);
      }} />
      <div className={splashDone ? "site-content-visible" : "site-content-hidden"}>
        <PimentaPrototype initialContent={initialContent} />
      </div>
    </>
  );
}
