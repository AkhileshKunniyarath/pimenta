"use client";

import * as React from "react";

interface ImgProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  ratio?: string;
}

export default function Img({
  src,
  alt,
  className,
  style,
  ratio,
}: ImgProps) {
  const [err, setErr] = React.useState(false);
  const r = ratio || "4/3";
  const base: React.CSSProperties = {
    aspectRatio: r,
    width: "100%",
    height: r === "auto" ? "auto" : undefined,
    objectFit: r === "auto" ? "contain" : "cover",
    display: "block",
  };

  if (err || !src) {
    return (
      <div className={"img-fallback " + (className || "")} style={{ ...base, ...style }}>
        <span className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {alt || "image"}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || ""}
      onError={() => setErr(true)}
      className={className}
      style={{ ...base, ...style }}
    />
  );
}
