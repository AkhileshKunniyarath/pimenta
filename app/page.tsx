import * as React from "react";
import SiteShell from "./components/SiteShell";
import { getSiteContent } from "../lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const contentResult = await getSiteContent();
  const brand = contentResult.content?.BRAND || {};
  const location = brand.location || {};
  const bungalows = brand.bungalows
    ? `${brand.bungalows} ${brand.bungalows === 1 ? "bungalow" : "bungalows"}`
    : "private bungalows";

  return {
    title: brand.name || "The Pimenta",
    description:
      brand.description ||
      `A family-run farm stay in ${location.region || "Kerala"} with vegetarian cooking and ${bungalows}.`,
  };
}

export default async function HomePage() {
  const contentResult = await getSiteContent();
  return <SiteShell initialContent={contentResult.content} />;
}
