"use client";

import * as React from "react";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  style?: React.CSSProperties;
  className?: string;
}

export default function Section({
  children,
  id,
  style,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={"pad-section " + (className || "")}
      style={{ padding: "120px 0", ...style }}
    >
      {children}
    </section>
  );
}
