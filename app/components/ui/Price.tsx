"use client";

import * as React from "react";
import { useSiteContent } from "../context/SiteContentContext";

interface PriceProps {
  inr: number | null | undefined;
  fallback?: string;
  currency?: string;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}

export default function Price({
  inr,
  fallback,
  currency,
  prefix,
  suffix,
  style,
}: PriceProps) {
  const { formatPrice, currency: currentCurrency } = useSiteContent();
  const cur = currency || currentCurrency || "INR";

  if (inr == null) {
    return <span style={style}>{fallback || "On request"}</span>;
  }

  const formatted = formatPrice(inr, cur);
  return (
    <span style={style}>
      {prefix || ""}
      {formatted}
      {suffix || ""}
    </span>
  );
}
