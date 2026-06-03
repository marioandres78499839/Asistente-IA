// ============================================================
// MessageBubble.jsx — Burbuja de mensaje del chat
// ============================================================

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        animation: "fadeUp 0.3s var(--ease)",
      }}>
        <div style={{
          background: "var(--c-cyan-dim)",
          border: "1px solid var(--c-border-accent)",
          borderRadius: "var(--r-lg) var(--r-lg) 4px var(--r-lg)",
          padding: "12px 16px",
          maxWidth: "72%",
          fontSize: 14,
          color: "var(--t-primary)",
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
        }}>
          {message.message}
          <p style={{ fontSize: 11, color: "var(--t-muted)", marginTop: 6, textAlign: "right", fontFamily: "var(--font-mono)" }}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
  }

  // Mensaje del asistente
  return (
    <div style={{
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      animation: "fadeUp 0.3s var(--ease)",
    }}>
      {/* Avatar */}
      <div style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "var(--c-cyan-dim)",
        border: "1px solid var(--c-border-accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "var(--c-cyan)",
        flexShrink: 0,
        marginTop: 2,
      }}>
        ◈
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Indicador de mood */}
        {message.mood && (
          <p style={{
            fontSize: 10,
            color: moodColor(message.mood),
            fontFamily: "var(--font-mono)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
            marginBottom: 6,
          }}>
            {moodLabel(message.mood)}
          </p>
        )}

        {/* Mensaje principal */}
        <div style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "4px var(--r-lg) var(--r-lg) var(--r-lg)",
          padding: "14px 16px",
          fontSize: 14,
          color: "var(--t-primary)",
          lineHeight: 1.7,
          whiteSpace: "pre-wrap",
          maxWidth: "90%",
        }}>
          {message.message}
        </div>

        {/* Recomendaciones */}
        {message.recommendations?.length > 0 && (
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6, maxWidth: "90%" }}>
            {message.recommendations.map((rec) => (
              <div key={rec.id} style={{
                display: "flex",
                gap: 8,
                padding: "8px 12px",
                background: "var(--c-cyan-glow)",
                border: "1px solid var(--c-border)",
                borderLeft: "2px solid var(--c-cyan)",
                borderRadius: "0 var(--r-sm) var(--r-sm) 0",
                fontSize: 12,
                color: "var(--t-secondary)",
                lineHeight: 1.5,
              }}>
                <span style={{ color: "var(--c-cyan)", flexShrink: 0 }}>→</span>
                {rec.text}
              </div>
            ))}
          </div>
        )}

        <p style={{ fontSize: 11, color: "var(--t-muted)", marginTop: 6, fontFamily: "var(--font-mono)" }}>
          Aria · {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}

function formatTime(timestamp) {
  if (!timestamp) return "";
  return new Date(timestamp).toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}

function moodColor(mood) {
  const map = {
    motivador: "var(--c-cyan)",
    calmado: "var(--c-emerald)",
    urgente: "var(--c-rose)",
    reflexivo: "var(--c-violet)",
  };
  return map[mood] || "var(--c-cyan)";
}

function moodLabel(mood) {
  const map = {
    motivador: "◎ Modo motivador",
    calmado: "◎ Modo tranquilo",
    urgente: "◎ Alerta urgente",
    reflexivo: "◎ Modo reflexivo",
  };
  return map[mood] || "◎ Aria";
}
