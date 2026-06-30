"use client";

import * as React from "react";
import {
  createEmptyRoom,
  createEmptyStayMode,
  slugify,
  parseNumber,
  formatLines,
  parseLines,
  panelStyle,
} from "../utils";
import {
  SplitEditor,
  SectionHeader,
  Grid,
  Field,
  EmptyEditor,
  InlineChecks,
  CheckField,
  ImageUploadField,
} from "../ui/AdminUI";

interface StayTabProps {
  rooms: any[];
  stayModes: any[];
  selectedRoom: number;
  setSelectedRoom: (index: number) => void;
  selectedStayMode: number;
  setSelectedStayMode: (index: number) => void;
  stayTab: string;
  setStayTab: (tab: string) => void;
  addArrayItem: (section: string, item: any) => void;
  removeArrayItem: (section: string, index: number) => void;
  updateArrayItem: (section: string, index: number, updater: (item: any) => any) => void;
}

function extractStayModePrice(mode: any, key: string) {
  if (!mode || !mode.pricing) return null;
  return typeof mode.pricing[key] === "object" ? null : mode.pricing[key];
}

function extractStayModeRange(mode: any, key: string, rangeKey: string) {
  if (!mode || !mode.pricing) return null;
  return typeof mode.pricing[key] === "object" ? mode.pricing[key][rangeKey] : null;
}

export default function StayTab({
  rooms,
  stayModes,
  selectedRoom,
  setSelectedRoom,
  selectedStayMode,
  setSelectedStayMode,
  stayTab,
  setStayTab,
  addArrayItem,
  removeArrayItem,
  updateArrayItem,
}: StayTabProps) {
  const currentRoom = rooms[selectedRoom];
  const currentStayMode = stayModes[selectedStayMode];

  return (
    <section style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {[
          { id: "rooms", label: "Rooms" },
          { id: "modes", label: "Stay modes" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setStayTab(item.id)}
            style={{
              borderRadius: 999,
              padding: "10px 16px",
              border:
                "1px solid " +
                (stayTab === item.id
                  ? "var(--ink)"
                  : "var(--rule)"),
              background:
                stayTab === item.id
                  ? "var(--ink)"
                  : "transparent",
              color: stayTab === item.id ? "var(--paper)" : "var(--ink-2)",
              cursor: "pointer",
              fontSize: 14,
              fontFamily: "inherit",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {stayTab === "rooms" ? (
        <SplitEditor
          listTitle="Rooms"
          listItems={rooms}
          selectedIndex={selectedRoom}
          onSelect={setSelectedRoom}
          onAdd={() => {
            addArrayItem("ROOMS", createEmptyRoom());
            setSelectedRoom(rooms.length);
          }}
          onRemove={() => removeArrayItem("ROOMS", selectedRoom)}
          renderLabel={(item) => item.name || "Untitled room"}
          emptyMessage="No rooms added yet."
        >
          {currentRoom ? (
            <div style={{ display: "grid", gap: 16 }}>
              <SectionHeader
                eyebrow="Room editor"
                title={currentRoom.name || "Room details"}
                body="Manage room name, short copy, occupancy, features, and image."
              />
              <ImageUploadField
                label="Image path"
                value={currentRoom.img || ""}
                onChange={(value) =>
                  updateArrayItem("ROOMS", selectedRoom, (item) => ({
                    ...item,
                    img: value,
                  }))
                }
              />

              <Grid columns={3}>
                <Field
                  label="Room name"
                  value={currentRoom.name || ""}
                  onChange={(value) =>
                    updateArrayItem("ROOMS", selectedRoom, (item) => ({
                      ...item,
                      name: value,
                    }))
                  }
                />
                <Field
                  label="Room ID"
                  value={currentRoom.id || ""}
                  onChange={(value) =>
                    updateArrayItem("ROOMS", selectedRoom, (item) => ({
                      ...item,
                      id: slugify(value, "room"),
                    }))
                  }
                />
                <Field
                  label="Square feet"
                  value={currentRoom.sqft ?? ""}
                  onChange={(value) =>
                    updateArrayItem("ROOMS", selectedRoom, (item) => ({
                      ...item,
                      sqft: parseNumber(value),
                    }))
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Guests"
                  value={currentRoom.guests ?? ""}
                  onChange={(value) =>
                    updateArrayItem("ROOMS", selectedRoom, (item) => ({
                      ...item,
                      guests: parseNumber(value),
                    }))
                  }
                  inputMode="numeric"
                />
              </Grid>
              <Field
                label="Short description"
                value={currentRoom.blurb || ""}
                onChange={(value) =>
                  updateArrayItem("ROOMS", selectedRoom, (item) => ({
                    ...item,
                    blurb: value,
                  }))
                }
                multiline
              />
              <Field
                label="Features"
                hint="One feature per line"
                value={formatLines(currentRoom.features)}
                onChange={(value) =>
                  updateArrayItem("ROOMS", selectedRoom, (item) => ({
                    ...item,
                    features: parseLines(value),
                  }))
                }
                multiline
                rows={6}
              />
            </div>
          ) : (
            <EmptyEditor message="Select or add a room to edit it." />
          )}
        </SplitEditor>
      ) : (
        <SplitEditor
          listTitle="Stay modes"
          listItems={stayModes}
          selectedIndex={selectedStayMode}
          onSelect={setSelectedStayMode}
          onAdd={() => {
            addArrayItem("STAY_MODES", createEmptyStayMode());
            setSelectedStayMode(stayModes.length);
          }}
          onRemove={() => removeArrayItem("STAY_MODES", selectedStayMode)}
          renderLabel={(item) => item.title || "Untitled stay mode"}
          emptyMessage="No stay modes added yet."
        >
          {currentStayMode ? (
            <div style={{ display: "grid", gap: 16 }}>
              <SectionHeader
                eyebrow="Stay mode editor"
                title={currentStayMode.title || "Stay mode details"}
                body="Edit stay products like B&B, full board, or whole property."
              />
              <ImageUploadField
                label="Image path"
                value={currentStayMode.img || ""}
                onChange={(value) =>
                  updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                    ...item,
                    img: value,
                  }))
                }
              />

              <Grid columns={3}>
                <Field
                  label="Title"
                  value={currentStayMode.title || ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      title: value,
                    }))
                  }
                />
                <Field
                  label="ID"
                  value={currentStayMode.id || ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      id: slugify(value, "stay"),
                    }))
                  }
                />
              </Grid>
              <Field
                label="Blurb"
                value={currentStayMode.blurb || ""}
                onChange={(value) =>
                  updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                    ...item,
                    blurb: value,
                  }))
                }
                multiline
              />
              <Grid columns={3}>
                <Field
                  label="Single price"
                  value={extractStayModePrice(currentStayMode, "single") ?? ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: {
                        ...(item.pricing || {}),
                        single: parseNumber(value),
                      },
                    }))
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Double price"
                  value={extractStayModePrice(currentStayMode, "double") ?? ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: {
                        ...(item.pricing || {}),
                        double: parseNumber(value),
                      },
                    }))
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Single from"
                  value={extractStayModeRange(currentStayMode, "single", "from") ?? ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: {
                        ...(item.pricing || {}),
                        single: {
                          ...(typeof item.pricing?.single === "object"
                            ? item.pricing.single
                            : {}),
                          from: parseNumber(value),
                          to: extractStayModeRange(item, "single", "to"),
                        },
                      },
                    }))
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Single to"
                  value={extractStayModeRange(currentStayMode, "single", "to") ?? ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: {
                        ...(item.pricing || {}),
                        single: {
                          ...(typeof item.pricing?.single === "object"
                            ? item.pricing.single
                            : {}),
                          from: extractStayModeRange(item, "single", "from"),
                          to: parseNumber(value),
                        },
                      },
                    }))
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Double from"
                  value={extractStayModeRange(currentStayMode, "double", "from") ?? ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: {
                        ...(item.pricing || {}),
                        double: {
                          ...(typeof item.pricing?.double === "object"
                            ? item.pricing.double
                            : {}),
                          from: parseNumber(value),
                          to: extractStayModeRange(item, "double", "to"),
                        },
                      },
                    }))
                  }
                  inputMode="numeric"
                />
                <Field
                  label="Double to"
                  value={extractStayModeRange(currentStayMode, "double", "to") ?? ""}
                  onChange={(value) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: {
                        ...(item.pricing || {}),
                        double: {
                          ...(typeof item.pricing?.double === "object"
                            ? item.pricing.double
                            : {}),
                          from: extractStayModeRange(item, "double", "from"),
                          to: parseNumber(value),
                        },
                      },
                    }))
                  }
                  inputMode="numeric"
                />
              </Grid>
              <InlineChecks>
                <CheckField
                  label="Per night pricing"
                  checked={Boolean(currentStayMode.perNight)}
                  onChange={(checked) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      perNight: checked,
                    }))
                  }
                />
                <CheckField
                  label="Bespoke pricing"
                  checked={Boolean(currentStayMode.bespoke)}
                  onChange={(checked) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      bespoke: checked,
                    }))
                  }
                />
                <CheckField
                  label="On request only"
                  checked={Boolean(currentStayMode.pricing?.onRequest)}
                  onChange={(checked) =>
                    updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                      ...item,
                      pricing: checked
                        ? { onRequest: true }
                        : {
                            ...(item.pricing || {}),
                            onRequest: false,
                          },
                    }))
                  }
                />
              </InlineChecks>
              <Field
                label="Inclusions"
                hint="One inclusion per line"
                value={formatLines(currentStayMode.inclusions)}
                onChange={(value) =>
                  updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                    ...item,
                    inclusions: parseLines(value),
                  }))
                }
                multiline
                rows={6}
              />
              <Field
                label="Notes"
                value={currentStayMode.notes || ""}
                onChange={(value) =>
                  updateArrayItem("STAY_MODES", selectedStayMode, (item) => ({
                    ...item,
                    notes: value,
                  }))
                }
                multiline
              />
            </div>
          ) : (
            <EmptyEditor message="Select or add a stay mode to edit it." />
          )}
        </SplitEditor>
      )}
    </section>
  );
}
