"use client";

import * as React from "react";
import {
  createEmptyPackage,
  slugify,
  parseNumber,
  formatLines,
  parseLines,
  panelStyle,
  buttonStyle,
} from "../utils";
import {
  SplitEditor,
  SectionHeader,
  Grid,
  Field,
  SubsectionTitle,
  EmptyEditor,
  ImageUploadField,
} from "../ui/AdminUI";

interface PackagesTabProps {
  packages: any[];
  selectedPackage: number;
  setSelectedPackage: (index: number) => void;
  addArrayItem: (section: string, item: any) => void;
  removeArrayItem: (section: string, index: number) => void;
  updateArrayItem: (section: string, index: number, updater: (item: any) => any) => void;
  draftContent: any;
  updateDraft: (updater: any) => void;
}

export default function PackagesTab({
  packages,
  selectedPackage,
  setSelectedPackage,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
  draftContent,
  updateDraft,
}: PackagesTabProps) {
  const currentPackage = packages[selectedPackage];
  const itemExists = currentPackage != null;

  return (
    <div style={{ display: "grid", gap: 28 }}>
      {/* Experiences Page Header Settings (Exact Location) */}
      <section style={{ ...panelStyle(), padding: 24, display: "grid", gap: 16 }}>
        <SectionHeader
          eyebrow="Page copy settings"
          title="Experiences Page Header"
          body="Manage the eyebrow, title, and intro text shown on the public Experiences page."
        />
        <Grid columns={2}>
          <Field
            label="Page Eyebrow"
            value={draftContent.EXPERIENCES_PAGE?.eyebrow || ""}
            onChange={(value) =>
              updateDraft((next: any) => {
                next.EXPERIENCES_PAGE = {
                  ...(next.EXPERIENCES_PAGE || {}),
                  eyebrow: value,
                };
                return next;
              })
            }
          />
          <Field
            label="Page Title"
            value={draftContent.EXPERIENCES_PAGE?.title || ""}
            onChange={(value) =>
              updateDraft((next: any) => {
                next.EXPERIENCES_PAGE = {
                  ...(next.EXPERIENCES_PAGE || {}),
                  title: value,
                };
                return next;
              })
            }
          />
        </Grid>
        <Field
          label="Introduction text"
          value={draftContent.EXPERIENCES_PAGE?.introText || ""}
          onChange={(value) =>
            updateDraft((next: any) => {
              next.EXPERIENCES_PAGE = {
                ...(next.EXPERIENCES_PAGE || {}),
                introText: value,
              };
              return next;
            })
          }
          multiline
          rows={3}
        />
      </section>

      <SplitEditor
        listTitle="Individual programs"
        listItems={packages}
        selectedIndex={selectedPackage}
        onSelect={setSelectedPackage}
        onAdd={() => {
          addArrayItem("PACKAGES", createEmptyPackage());
          setSelectedPackage(packages.length);
        }}
        onRemove={() => removeArrayItem("PACKAGES", selectedPackage)}
        renderLabel={(item) => item.title || "Untitled package"}
        emptyMessage="No packages added yet."
      >
        {itemExists ? (
          <div style={{ display: "grid", gap: 18 }}>
            <SectionHeader
              eyebrow="Package editor"
              title={currentPackage.title || "Package details"}
              body="Edit experience details, pricing, highlights, and itinerary in one place."
            />

          <ImageUploadField
            label="Image path"
            value={currentPackage.img || ""}
            onChange={(value) =>
              updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                ...item,
                img: value,
              }))
            }
          />

          <Grid columns={3}>
            <Field
              label="Title"
              value={currentPackage.title || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  title: value,
                  id: item.id || slugify(value, "package"),
                  slug: item.slug || slugify(value, "package"),
                }))
              }
            />
            <Field
              label="Slug"
              value={currentPackage.slug || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  slug: slugify(value, "package"),
                }))
              }
            />
            <Field
              label="ID"
              value={currentPackage.id || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  id: slugify(value, "package"),
                }))
              }
            />
            <Field
              label="Subtitle"
              value={currentPackage.subtitle || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  subtitle: value,
                }))
              }
            />
            <Field
              label="Category"
              value={currentPackage.category || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  category: value,
                }))
              }
            />
            <Field
              label="Focus"
              value={currentPackage.focus || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  focus: value,
                }))
              }
            />
            <Field
              label="Nights"
              value={currentPackage.nights ?? ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  nights: parseNumber(value),
                }))
              }
              inputMode="numeric"
            />
            <Field
              label="Days"
              value={currentPackage.days ?? ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  days: parseNumber(value),
                }))
              }
              inputMode="numeric"
            />
            <Field
              label="Intensity"
              value={currentPackage.intensity || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  intensity: value,
                }))
              }
            />
            <Field
              label="Per person price"
              value={currentPackage.pricing?.perPerson ?? ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  pricing: {
                    ...(item.pricing || {}),
                    perPerson: parseNumber(value),
                  },
                }))
              }
              inputMode="numeric"
            />
            <Field
              label="Booking hours"
              value={currentPackage.bookingHours || ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  bookingHours: value,
                }))
              }
            />
            <Field
              label="Min group"
              value={currentPackage.groupSize?.min ?? ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  groupSize: {
                    ...(item.groupSize || {}),
                    min: parseNumber(value),
                  },
                }))
              }
              inputMode="numeric"
            />
            <Field
              label="Max group"
              value={currentPackage.groupSize?.max ?? ""}
              onChange={(value) =>
                updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                  ...item,
                  groupSize: {
                    ...(item.groupSize || {}),
                    max: parseNumber(value),
                  },
                }))
              }
              inputMode="numeric"
            />
          </Grid>

          <Field
            label="Short blurb"
            value={currentPackage.blurb || ""}
            onChange={(value) =>
              updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                ...item,
                blurb: value,
              }))
            }
            multiline
          />
          <Field
            label="Long description"
            value={currentPackage.longBlurb || ""}
            onChange={(value) =>
              updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                ...item,
                longBlurb: value,
              }))
            }
            multiline
            rows={5}
          />
          <Field
            label="Notes"
            value={currentPackage.notes || ""}
            onChange={(value) =>
              updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                ...item,
                notes: value,
              }))
            }
            multiline
          />
          <Field
            label="Highlights"
            hint="One highlight per line"
            value={formatLines(currentPackage.highlights)}
            onChange={(value) =>
              updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                ...item,
                highlights: parseLines(value),
              }))
            }
            multiline
            rows={6}
          />

          <SubsectionTitle title="Itinerary" />
          <div style={{ display: "grid", gap: 12 }}>
            {(currentPackage.itinerary || []).map((step: any, index: number) => (
              <div
                key={`${step.day}-${index}`}
                style={{
                  ...panelStyle(),
                  padding: 16,
                  background: "var(--paper)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div className="mono tracked" style={{ color: "var(--muted)" }}>
                    Step {index + 1}
                  </div>
                  <button
                    onClick={() =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        itinerary: (item.itinerary || []).filter(
                          (_: any, stepIndex: number) => stepIndex !== index,
                        ),
                      }))
                    }
                    style={buttonStyle("danger")}
                  >
                    Remove step
                  </button>
                </div>
                <Grid columns={2}>
                  <Field
                    label="Day / time"
                    value={step.day || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        itinerary: (item.itinerary || []).map((entry: any, entryIndex: number) =>
                          entryIndex === index
                            ? { ...entry, day: value }
                            : entry,
                        ),
                      }))
                    }
                  />
                  <Field
                    label="Title"
                    value={step.title || ""}
                    onChange={(value) =>
                      updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                        ...item,
                        itinerary: (item.itinerary || []).map((entry: any, entryIndex: number) =>
                          entryIndex === index
                            ? { ...entry, title: value }
                            : entry,
                        ),
                      }))
                    }
                  />
                </Grid>
                <Field
                  label="Description"
                  value={step.body || ""}
                  onChange={(value) =>
                    updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                      ...item,
                      itinerary: (item.itinerary || []).map((entry: any, entryIndex: number) =>
                        entryIndex === index
                          ? { ...entry, body: value }
                          : entry,
                      ),
                    }))
                  }
                  multiline
                />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              updateArrayItem("PACKAGES", selectedPackage, (item) => ({
                ...item,
                itinerary: [
                  ...(item.itinerary || []),
                  {
                    day: "",
                    title: "",
                    body: "",
                  },
                ],
              }))
            }
            style={buttonStyle("ghost")}
          >
            Add itinerary step
          </button>
        </div>
      ) : (
        <EmptyEditor message="Select or add a package to edit it." />
      )}
    </SplitEditor>
    </div>
  );
}
