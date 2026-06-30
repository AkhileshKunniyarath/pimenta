"use client";

import * as React from "react";

interface BtnProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "accent" | "ghost" | string;
  as?: React.ElementType;
  href?: string;
  style?: React.CSSProperties;
}

export default function Btn({
  children,
  onClick,
  variant,
  as: Tag = "button",
  href,
  style,
}: BtnProps) {
  const cls = "btn " + (variant === "accent" ? "btn-accent" : variant === "ghost" ? "btn-ghost" : "");
  return (
    <Tag className={cls} onClick={onClick} href={href} style={style}>
      {children}
      <span style={{ display: "inline-block", transition: "transform .2s" }}>→</span>
    </Tag>
  );
}
