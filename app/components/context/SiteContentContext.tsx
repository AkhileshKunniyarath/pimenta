"use client";

import * as React from "react";

export interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

export interface SiteContent {
  BRAND?: {
    name?: string;
    parent?: string;
    family?: string;
    host?: string;
    farmEst?: number;
    guestsEst?: number;
    acres?: number;
    bungalows?: number;
    description?: string;
    validUntil?: string;
    contact?: {
      phone?: string;
      email?: string;
      whatsapp?: string;
      web?: string;
    };
    location?: {
      village?: string;
      region?: string;
      coords?: string;
      nearestAirport?: string;
      nearestStation?: string;
      address?: string;
    };
    [key: string]: any;
  };
  NAV?: Array<{ key: string; label: string }>;
  PACKAGES?: Array<any>;
  ROOMS?: Array<any>;
  STAY_MODES?: Array<any>;
  ACTIVITIES?: Array<any>;
  FAQS?: Array<{ q: string; a: string }>;
  REVIEWS?: Array<{ id: string; author: string; stayDate: string; rating: number; text: string; location?: string }>;
  JOURNAL_POSTS?: Array<{ id: string; slug: string; title: string; kind: string; date: string; img: string; excerpt: string; body?: string }>;
  TODAY_PANEL?: {
    fromFarm?: string;
    growing?: string[];
    cooking?: string[];
  };
  TERMS?: {
    title?: string;
    lastUpdated?: string;
    intro?: string;
    sections?: Array<{ title: string; body: string }>;
    acknowledgement?: string;
  };
  VOLUNTEER?: {
    eyebrow?: string;
    title?: string;
    heroImg?: string;
    introText?: string;
    requirements?: Array<{ title: string; description: string }>;
    whatWeProvide?: Array<{ title: string; description: string }>;
    dailyRhythm?: Array<{ time: string; task: string }>;
    ctaTitle?: string;
    ctaText?: string;
  };
  CURRENCY?: Record<string, CurrencyInfo>;
  [key: string]: any;
}

interface SiteContentContextType {
  content: SiteContent;
  currency: string;
  setCurrency: (code: string) => void;
  formatPrice: (inr: number | null | undefined, curOverride?: string) => string | null;
}

const SiteContentContext = React.createContext<SiteContentContextType | undefined>(undefined);

export function SiteContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode;
  initialContent: SiteContent;
}) {
  const [currency, setCurrency] = React.useState<string>("INR");

  const currencies = initialContent.CURRENCY || {};

  const formatPrice = React.useCallback(
    (inr: number | null | undefined, curOverride?: string) => {
      if (inr == null) return null;
      const targetCode = curOverride || currency;
      const c = currencies[targetCode] || currencies.INR;
      if (!c) return null;
      const v = inr * c.rate;
      let r: number;
      if (c.code === "INR") {
        r = Math.round(v / 100) * 100;
      } else {
        r = Math.round(v / 5) * 5;
      }
      return c.symbol + r.toLocaleString(c.code === "INR" ? "en-IN" : "en-US");
    },
    [currency, currencies]
  );

  const value = React.useMemo(
    () => ({
      content: initialContent,
      currency,
      setCurrency,
      formatPrice,
    }),
    [initialContent, currency, formatPrice]
  );

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = React.useContext(SiteContentContext);
  if (context === undefined) {
    throw new Error("useSiteContent must be used within a SiteContentProvider");
  }
  return context;
}
