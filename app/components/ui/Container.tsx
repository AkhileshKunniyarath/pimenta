"use client";

import * as React from "react";

interface ContainerProps {
  children: React.ReactNode;
  width?: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function Container({
  children,
  width,
  style,
  className,
}: ContainerProps) {
  return (
    <div
      className={className}
      style={{
        maxWidth: width || 1240,
        margin: "0 auto",
        padding: "0 40px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
