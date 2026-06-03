// ============================================================
// TaskCard.jsx — Tarjeta de tarea individual
// ============================================================
import { useState } from "react";

const PRIORITY = {
  alta: { color: "var(--c-rose)", bg: "var(--c-rose-dim)", label: "Alta" },
  media: { color: "var(--c-amber)", bg: "var(--c-amber-dim)", label: "Media" },
  baja: { color: "var(--c-emerald)", bg: "var(--c-emerald-dim)", label: "Baja" },
};

export default function TaskCard({ task }) {
  const [done, setDone] = useState(false);
  const p = PRIORITY[task.priority] || PRIORITY.baja;

  return (
    <div
      style={{
        background: done ? "var(--c-surface)" : "var(--c-elevated)",
        border: "1px solid var(--c-border)",
        borderRadius: "var(--r-sm)",
        padding: "10px 12px",
        opacity: done ? 0.5 : 1,
        transition: "all var(--dur) var(--ease)",
        cursor: "pointer",
      }}
      onClick={() => setDone((d) => !d)}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        {/* Checkbox */}
        <div style={{
          width: 16,
          height: 16,
          borderRadius: 4,
          border: `1.5px solid ${done ? p.color : "var(--c-border)"}`,
          background: done ? p.bg : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: 1,
          fontSize: 10,
          color: p.color,
          transition: "all var(--dur) var(--ease)",
        }}>
          {done && "✓"}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: 12,
            color: done ? "var(--t-muted)" : "var(--t-primary)",
            textDecoration: done ? "line-through" : "none",
            fontWeight: 500,
            lineHeight: 1.4,
          }}>
            {task.title}
          </p>

          <div style={{ display: "flex", gap: 6, marginTop: 4, alignItems: "center" }}>
            <span style={{
              fontSize: 9,
              padding: "2px 6px",
              borderRadius: 100,
              background: p.bg,
              color: p.color,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              fontWeight: 600,
            }}>
              {p.label}
            </span>
            {task.time && (
              <span style={{ fontSize: 10, color: "var(--t-muted)", fontFamily: "var(--font-mono)" }}>
                {task.time}
              </span>
            )}
            {task.duration && (
              <span style={{ fontSize: 10, color: "var(--t-muted)", fontFamily: "var(--font-mono)" }}>
                · {task.duration}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
