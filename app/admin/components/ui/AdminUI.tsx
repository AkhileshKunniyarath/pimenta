"use client";

import * as React from "react";
import { ADMIN_UI, buttonStyle } from "../utils";

/* --- UTILITY COMPONENTS --- */

export function UtilityPill({ label, strong = false }: { label: string; strong?: boolean }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 10,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        background: strong ? "rgba(139,58,31,0.08)" : "var(--paper-2)",
        color: strong ? "var(--accent)" : "var(--muted)",
        padding: "4px 8px",
        borderRadius: 2,
        fontWeight: strong ? 600 : 400,
        display: "inline-block",
      }}
    >
      {label}
    </span>
  );
}

export function DashboardStatCard({
  label,
  value,
  compact = false,
  icon,
}: {
  label: string;
  value: string | number;
  compact?: boolean;
  icon?: string;
}) {
  return (
    <div
      style={{
        background: ADMIN_UI.cardBg,
        border: `1px solid ${ADMIN_UI.cardBorder}`,
        borderRadius: ADMIN_UI.radius,
        padding: compact ? "16px 20px" : "24px 30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        <div className="mono" style={{ fontSize: 11, color: ADMIN_UI.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </div>
        <div className="serif" style={{ fontSize: compact ? 28 : 38, marginTop: 6, color: ADMIN_UI.textInk, lineHeight: 1 }}>
          {value}
        </div>
      </div>
      {icon && (
        <span style={{ fontSize: compact ? 24 : 32, opacity: 0.85 }}>{icon}</span>
      )}
    </div>
  );
}

export function StatusListItem({ label, done }: { label: string; done: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "8px 0",
        color: done ? ADMIN_UI.textInk : ADMIN_UI.textMuted,
        fontSize: 14,
      }}
    >
      <span style={{ color: done ? ADMIN_UI.successText : ADMIN_UI.dangerText, fontWeight: "bold" }}>
        {done ? "✓" : "○"}
      </span>
      <span style={{ textDecoration: done ? "none" : "line-through", opacity: done ? 1 : 0.6 }}>{label}</span>
    </div>
  );
}

export function NavShortcutRow({
  badge,
  label,
  note,
  active = false,
  onClick,
}: {
  badge?: string;
  label: string;
  note?: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 18px",
        borderRadius: ADMIN_UI.radius,
        background: active ? "var(--paper-2)" : "transparent",
        border: `1px solid ${active ? "var(--rule)" : "transparent"}`,
        cursor: "pointer",
        transition: "all 0.15s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {badge && (
          <span
            style={{
              padding: "2px 6px",
              background: active ? "var(--ink)" : "var(--rule)",
              color: active ? "var(--paper)" : "var(--ink)",
              borderRadius: 2,
              fontSize: 10,
              fontFamily: "monospace",
            }}
          >
            {badge}
          </span>
        )}
        <span style={{ fontWeight: active ? 500 : 400, fontSize: 14 }}>{label}</span>
      </div>
      {note && (
        <span className="mono" style={{ fontSize: 11, color: ADMIN_UI.textMuted }}>
          {note}
        </span>
      )}
    </div>
  );
}

/* --- STRUCTURED HEADERS --- */

export function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div style={{ marginBottom: 28 }}>
      {eyebrow && (
        <div className="mono" style={{ fontSize: 11, color: ADMIN_UI.textMuted, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
          {eyebrow}
        </div>
      )}
      <h1 className="serif" style={{ fontSize: 32, margin: 0, letterSpacing: "-0.015em", color: ADMIN_UI.textInk }}>
        {title}
      </h1>
      {body && (
        <p style={{ margin: "8px 0 0", fontSize: 14, color: ADMIN_UI.textMuted, lineHeight: 1.5, maxWidth: 660 }}>
          {body}
        </p>
      )}
    </div>
  );
}

export function SubsectionTitle({ title }: { title: string }) {
  return (
    <h3 className="serif" style={{ fontSize: 20, margin: "10px 0 2px", color: ADMIN_UI.textInk }}>
      {title}
    </h3>
  );
}

export function Grid({ columns = 3, children }: { columns?: number; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 20,
      }}
    >
      {children}
    </div>
  );
}

/* --- FORM CONTROLS --- */

interface FieldProps {
  label: string;
  value: string | number;
  onChange: (value: any) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
  inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search";
  hint?: string;
}

export function Field({
  label,
  value,
  onChange,
  multiline = false,
  rows = 3,
  type = "text",
  inputMode,
  hint,
}: FieldProps) {
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 18,
    border: `1px solid ${ADMIN_UI.cardBorder}`,
    background: "var(--paper)",
    padding: "14px 16px",
    fontFamily: "inherit",
    fontSize: 14,
    color: ADMIN_UI.textInk,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
    outline: "none",
  };

  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: ADMIN_UI.textInk }}>
        {label}
      </span>
      {hint ? (
        <span style={{ fontSize: 12, color: ADMIN_UI.textMuted, marginTop: -4 }}>
          {hint}
        </span>
      ) : null}
      {multiline ? (
        <textarea
          rows={rows}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          style={{
            ...sharedStyle,
            resize: "vertical",
            minHeight: rows * 28,
            lineHeight: 1.6,
          }}
        />
      ) : (
        <input
          type={type}
          inputMode={inputMode}
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          style={sharedStyle}
        />
      )}
    </label>
  );
}


export function ImageUploadField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      onChange(result.url);
    } catch (err: any) {
      setError(err.message || "Unable to upload image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 18,
    border: `1px solid ${ADMIN_UI.cardBorder}`,
    background: "var(--paper)",
    padding: "14px 16px",
    fontFamily: "inherit",
    fontSize: 14,
    color: ADMIN_UI.textInk,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
    outline: "none",
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: ADMIN_UI.textInk }}>
        {label}
      </span>
      {hint && (
        <span style={{ fontSize: 12, color: ADMIN_UI.textMuted, marginTop: -4 }}>
          {hint}
        </span>
      )}
      
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/uploads/... or external URL"
          style={{ ...inputStyle, flex: 1 }}
        />
        <label
          style={{
            ...buttonStyle("ghost"),
            fontSize: 12,
            padding: "13px 18px",
            borderRadius: 18,
            whiteSpace: "nowrap",
            cursor: uploading ? "not-allowed" : "pointer",
            opacity: uploading ? 0.6 : 1,
            margin: 0,
            display: "inline-flex",
            alignItems: "center"
          }}
        >
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {error && (
        <span style={{ fontSize: 12, color: "var(--accent)" }}>
          {error}
        </span>
      )}

      {value && (
        <div style={{ marginTop: 4, display: "flex", gap: 12, alignItems: "center" }}>
          <img
            src={value}
            alt="Preview"
            style={{
              width: 80,
              height: 50,
              objectFit: "cover",
              borderRadius: 6,
              border: `1px solid ${ADMIN_UI.cardBorder}`,
              background: "var(--paper-2)"
            }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span style={{ fontSize: 12, color: ADMIN_UI.textMuted, wordBreak: "break-all" }}>
            Previewing: {value}
          </span>
        </div>
      )}
    </div>
  );
}



export function CheckField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontSize: 14,
        cursor: "pointer",
        userSelect: "none",
        padding: "6px 0",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ width: 16, height: 16, cursor: "pointer" }}
      />
      <span>{label}</span>
    </label>
  );
}

export function InlineChecks({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24, padding: "8px 0" }}>
      {children}
    </div>
  );
}

/* --- SPLIT EDITOR LAYOUT --- */

interface SplitEditorProps {
  listTitle: string;
  listItems: any[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  renderLabel: (item: any, index: number) => string;
  emptyMessage: string;
  children: React.ReactNode;
}

export function SplitEditor({
  listTitle,
  listItems,
  selectedIndex,
  onSelect,
  onAdd,
  onRemove,
  renderLabel,
  emptyMessage,
  children,
}: SplitEditorProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: 30,
        alignItems: "start",
      }}
    >
      {/* Sidebar List */}
      <div
        style={{
          border: `1px solid ${ADMIN_UI.shellBorder}`,
          borderRadius: ADMIN_UI.radius,
          background: ADMIN_UI.cardBg,
          display: "flex",
          flexDirection: "column",
          maxHeight: "72vh",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${ADMIN_UI.shellBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono" style={{ fontSize: 11, color: ADMIN_UI.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {listTitle} ({listItems.length})
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              onAdd();
            }}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--accent)",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            + Add
          </button>
        </div>
        <div style={{ padding: 8, display: "flex", flexDirection: "column", gap: 2 }}>
          {listItems.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: ADMIN_UI.textMuted, fontSize: 13 }}>
              {emptyMessage}
            </div>
          ) : (
            listItems.map((item, idx) => {
              const active = selectedIndex === idx;
              return (
                <div
                  key={idx}
                  onClick={() => onSelect(idx)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: ADMIN_UI.radius - 1,
                    background: active ? "var(--paper-2)" : "transparent",
                    cursor: "pointer",
                    fontSize: 13,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 12,
                    transition: "all 0.12s ease",
                    border: `1px solid ${active ? "var(--rule)" : "transparent"}`,
                  }}
                >
                  <span style={{ fontWeight: active ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, color: active ? ADMIN_UI.textInk : "var(--ink-2)" }}>
                    {renderLabel(item, idx)}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }} onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onRemove(idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: ADMIN_UI.dangerText,
                        cursor: "pointer",
                        fontSize: 11,
                        fontWeight: 600,
                        padding: 2,
                      }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Editor Panel */}
      <div>{children}</div>
    </div>
  );
}


export function EmptyEditor({ message }: { message: string }) {
  return (
    <div
      style={{
        border: `1px dashed ${ADMIN_UI.shellBorder}`,
        borderRadius: ADMIN_UI.radius,
        padding: "60px 40px",
        textAlign: "center",
        color: ADMIN_UI.textMuted,
      }}
    >
      <div className="serif" style={{ fontSize: 22, marginBottom: 12 }}>
        No entry selected
      </div>
      <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
    </div>
  );
}

/* --- OTHER METRIC & BOOKING BLOCKS --- */

export function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ borderTop: `1px solid ${ADMIN_UI.shellBorder}`, paddingTop: 12 }}>
      <div className="mono" style={{ fontSize: 10, color: ADMIN_UI.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </div>
      <div className="serif" style={{ fontSize: 16, marginTop: 4, color: ADMIN_UI.textInk }}>
        {value}
      </div>
    </div>
  );
}

export function MiniStatDark({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 12 }}>
      <div className="mono" style={{ fontSize: 10, color: ADMIN_UI.sidebarMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </div>
      <div className="serif" style={{ fontSize: 16, marginTop: 4, color: ADMIN_UI.sidebarText }}>
        {value}
      </div>
    </div>
  );
}

export function InfoPanel({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        background: "var(--paper-2)",
        border: `1px solid ${ADMIN_UI.shellBorder}`,
        borderRadius: ADMIN_UI.radius,
        padding: "20px 24px",
      }}
    >
      <div className="mono" style={{ fontSize: 10, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, color: ADMIN_UI.textInk, marginBottom: 6 }}>{title}</div>
      <p style={{ margin: 0, fontSize: 13, color: ADMIN_UI.textMuted, lineHeight: 1.5 }}>{body}</p>
    </div>
  );
}
