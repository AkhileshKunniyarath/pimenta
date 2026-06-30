"use client";

import * as React from "react";
import { panelStyle, parseNumber } from "../utils";
import { SectionHeader, Grid, Field, SubsectionTitle, ImageUploadField } from "../ui/AdminUI";

interface BusinessTabProps {
  draftContent: any;
  updateBrand: (key: string, value: any) => void;
  updateDraft: (updater: any) => void;
}

export default function BusinessTab({
  draftContent,
  updateBrand,
  updateDraft,
}: BusinessTabProps) {
  return (
    <section style={{ ...panelStyle(), padding: 24, display: "grid", gap: 20 }}>
      <SectionHeader
        eyebrow="Business details"
        title="Shop profile, contact, and location"
        body="This is the core information for your property, brand, and direct contact details."
      />

      {/* Brand Hero Images (Exact Location) */}
      <SubsectionTitle title="Brand Cover Images" />
      <div style={{ display: "grid", gap: 16 }}>
        <ImageUploadField
          label="Main Homepage Hero Image"
          value={draftContent.IMG?.hero || ""}
          onChange={(value) =>
            updateDraft((next: any) => {
              next.IMG = { ...(next.IMG || {}), hero: value };
              return next;
            })
          }
        />
        <ImageUploadField
          label="Stay Page Hero Image"
          value={draftContent.IMG?.heroAlt || ""}
          onChange={(value) =>
            updateDraft((next: any) => {
              next.IMG = { ...(next.IMG || {}), heroAlt: value };
              return next;
            })
          }
        />
      </div>

      <SubsectionTitle title="Core Profile" />
      <Grid columns={4}>
        <Field
          label="Business name"
          value={draftContent.BRAND?.name || ""}
          onChange={(value) => updateBrand("name", value)}
        />
        <Field
          label="Parent brand"
          value={draftContent.BRAND?.parent || ""}
          onChange={(value) => updateBrand("parent", value)}
        />
        <Field
          label="Family / owner line"
          value={draftContent.BRAND?.family || ""}
          onChange={(value) => updateBrand("family", value)}
        />
        <Field
          label="Host name"
          value={draftContent.BRAND?.host || ""}
          onChange={(value) => updateBrand("host", value)}
        />
        <Field
          label="Farm established"
          value={draftContent.BRAND?.farmEst ?? ""}
          onChange={(value) => updateBrand("farmEst", parseNumber(value))}
          inputMode="numeric"
        />
        <Field
          label="Guests since"
          value={draftContent.BRAND?.guestsEst ?? ""}
          onChange={(value) => updateBrand("guestsEst", parseNumber(value))}
          inputMode="numeric"
        />
        <Field
          label="Acres"
          value={draftContent.BRAND?.acres ?? ""}
          onChange={(value) => updateBrand("acres", parseNumber(value))}
          inputMode="decimal"
        />
        <Field
          label="Bungalows"
          value={draftContent.BRAND?.bungalows ?? ""}
          onChange={(value) => updateBrand("bungalows", parseNumber(value))}
          inputMode="numeric"
        />
      </Grid>

      <SubsectionTitle title="Location" />
      <Grid columns={4}>
        <Field
          label="Village / area"
          value={draftContent.BRAND?.location?.village || ""}
          onChange={(value) => updateBrand("location.village", value)}
        />
        <Field
          label="Region / city"
          value={draftContent.BRAND?.location?.region || ""}
          onChange={(value) => updateBrand("location.region", value)}
        />
        <Field
          label="Coordinates"
          value={draftContent.BRAND?.location?.coords || ""}
          onChange={(value) => updateBrand("location.coords", value)}
        />
        <Field
          label="Nearest airport"
          value={draftContent.BRAND?.location?.nearestAirport || ""}
          onChange={(value) => updateBrand("location.nearestAirport", value)}
        />
        <Field
          label="Nearest station"
          value={draftContent.BRAND?.location?.nearestStation || ""}
          onChange={(value) => updateBrand("location.nearestStation", value)}
        />
      </Grid>
      <Field
        label="Address"
        value={draftContent.BRAND?.location?.address || ""}
        onChange={(value) => updateBrand("location.address", value)}
        multiline
      />

      <SubsectionTitle title="Contact" />
      <Grid columns={4}>
        <Field
          label="Email"
          value={draftContent.BRAND?.contact?.email || ""}
          onChange={(value) => updateBrand("contact.email", value)}
          type="email"
        />
        <Field
          label="Phone"
          value={draftContent.BRAND?.contact?.phone || ""}
          onChange={(value) => updateBrand("contact.phone", value)}
        />
        <Field
          label="WhatsApp"
          value={draftContent.BRAND?.contact?.whatsapp || ""}
          onChange={(value) => updateBrand("contact.whatsapp", value)}
        />
        <Field
          label="Website"
          value={draftContent.BRAND?.contact?.web || ""}
          onChange={(value) => updateBrand("contact.web", value)}
        />
        <Field
          label="Business hours"
          value={draftContent.BRAND?.hours || ""}
          onChange={(value) => updateBrand("hours", value)}
        />
        <Field
          label="Response time"
          value={draftContent.BRAND?.responseTime || ""}
          onChange={(value) => updateBrand("responseTime", value)}
        />
        <Field
          label="Valid until"
          value={draftContent.BRAND?.validUntil || ""}
          onChange={(value) => updateBrand("validUntil", value)}
        />
      </Grid>
    </section>
  );
}
