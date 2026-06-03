// ============================================================
// Dashboard.jsx — Vista resumen de productividad
// ============================================================

const PRIORITY_COLOR = {
  alta: { bg: "var(--c-rose-dim)", text: "var(--c-rose)", border: "rgba(252,129,129,0.2)" },
  media: { bg: "var(--c-amber-dim)", text: "var(--c-amber)", border: "rgba(246,173,85,0.2)" },
  baja: { bg: "var(--c-emerald-dim)", text: "var(--c-emerald)", border: "rgba(104,211,145,0.2)" },
};

const CATEGORY_COLOR = {
  productividad: "var(--c-cyan)",
  bienestar: "var(--c-emerald)",
  hábitos: "var(--c-violet)",
};

export default function Dashboard({ messages, onGoChat }) {
  // Extraer datos de todos los mensajes del asistente
  const assistantMsgs = messages.filter((m) => m.role === "assistant");
  const allTasks = assistantMsgs.flatMap((m) => m.tasks || []);
  const allRecs = assistantMsgs.flatMap((m) => m.recommendations || []);
  const lastPlan = assistantMsgs.slice().reverse().find((m) => m.dayPlan?.length > 0)?.dayPlan || [];

  // Estadísticas
  const totalMessages = messages.filter((m) => m.role === "user").length;
  const highPriorityTasks = allTasks.filter((t) => t.priority === "alta").length;
  const uniqueRecs = Array.from(new Map(allRecs.map((r) => [r.text, r])).values()).slice(0, 6);

  // Últimas tareas (deduplicadas por título)
  const uniqueTasks = Array.from(new Map(allTasks.map((t) => [t.title, t])).values()).slice(0, 8);

  const isEmpty = totalMessages === 0;

  return (
    <div style={{
      height: "calc(100vh - 56px)",
      overflowY: "auto",
      background: "var(--c-void)",
      padding: "32px",
    }}>
      {/* Header */}
      <div style={{ marginBottom: 32, maxWidth: 1000, margin: "0 auto 32px" }}>
        <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 6 }}>
          Vista general
        </p>
        <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--t-primary)" }}>
          Tu dashboard de productividad
        </h2>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {isEmpty ? (
          /* Estado vacío */
          <div style={{
            textAlign: "center",
            padding: "80px 40px",
            background: "var(--c-surface)",
            borderRadius: "var(--r-xl)",
            border: "1px solid var(--c-border)",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>◈</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "var(--t-primary)" }}>
              Aquí aparecerá tu resumen
            </h3>
            <p style={{ fontSize: 14, color: "var(--t-secondary)", marginBottom: 24, lineHeight: 1.6 }}>
              Empieza a chatear con Aria y tu dashboard se irá llenando automáticamente con tus tareas, 
              recomendaciones y plan del día.
            </p>
            <button
              onClick={onGoChat}
              style={{
                background: "var(--c-cyan)",
                border: "none",
                borderRadius: "var(--r-md)",
                color: "#08111f",
                padding: "12px 28px",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Ir al chat →
            </button>
          </div>
        ) : (
          <>
            {/* Métricas */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
              marginBottom: 24,
            }}>
              {[
                { label: "Mensajes enviados", value: totalMessages, color: "var(--c-cyan)", icon: "◎" },
                { label: "Tareas identificadas", value: uniqueTasks.length, color: "var(--c-violet)", icon: "◈" },
                { label: "Alta prioridad", value: highPriorityTasks, color: "var(--c-rose)", icon: "⊗" },
                { label: "Recomendaciones", value: uniqueRecs.length, color: "var(--c-emerald)", icon: "⊕" },
              ].map((m) => (
                <div key={m.label} style={{
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--r-lg)",
                  padding: "20px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: m.color, fontSize: 16 }}>{m.icon}</span>
                    <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {m.label}
                    </p>
                  </div>
                  <p style={{ fontSize: 32, fontWeight: 700, color: m.color, letterSpacing: "-1px" }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Grid principal */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Tareas */}
              <div style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--r-lg)",
                padding: "20px",
              }}>
                <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16 }}>
                  Tareas de la sesión
                </p>
                {uniqueTasks.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--t-muted)", fontStyle: "italic" }}>Sin tareas aún</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {uniqueTasks.map((task) => {
                      const p = PRIORITY_COLOR[task.priority] || PRIORITY_COLOR.baja;
                      return (
                        <div key={task.id} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          padding: "10px 12px",
                          background: "var(--c-elevated)",
                          borderRadius: "var(--r-sm)",
                          border: `1px solid ${p.border}`,
                        }}>
                          <span style={{
                            fontSize: 10,
                            fontFamily: "var(--font-mono)",
                            padding: "2px 7px",
                            borderRadius: 100,
                            background: p.bg,
                            color: p.text,
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                            flexShrink: 0,
                          }}>
                            {task.priority}
                          </span>
                          <p style={{ fontSize: 13, color: "var(--t-primary)", flex: 1, minWidth: 0 }}>
                            {task.title}
                          </p>
                          {task.time && (
                            <span style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", flexShrink: 0 }}>
                              {task.time}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Recomendaciones */}
              <div style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--r-lg)",
                padding: "20px",
              }}>
                <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16 }}>
                  Recomendaciones de Aria
                </p>
                {uniqueRecs.length === 0 ? (
                  <p style={{ fontSize: 13, color: "var(--t-muted)", fontStyle: "italic" }}>Sin recomendaciones aún</p>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {uniqueRecs.map((rec) => {
                      const color = CATEGORY_COLOR[rec.category] || "var(--c-cyan)";
                      return (
                        <div key={rec.id} style={{
                          display: "flex",
                          gap: 10,
                          padding: "10px 12px",
                          background: "var(--c-elevated)",
                          borderRadius: "var(--r-sm)",
                          borderLeft: `2px solid ${color}`,
                        }}>
                          <p style={{ fontSize: 12, color: "var(--t-secondary)", lineHeight: 1.5 }}>
                            {rec.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Plan del día */}
              {lastPlan.length > 0 && (
                <div style={{
                  gridColumn: "1 / -1",
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--r-lg)",
                  padding: "20px",
                }}>
                  <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 16 }}>
                    Plan del día (último generado)
                  </p>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: 10,
                  }}>
                    {lastPlan.map((item, i) => {
                      const typeColor = { trabajo: "var(--c-cyan)", descanso: "var(--c-emerald)", personal: "var(--c-violet)" };
                      const color = typeColor[item.type] || "var(--c-cyan)";
                      return (
                        <div key={i} style={{
                          padding: "12px",
                          background: "var(--c-elevated)",
                          borderRadius: "var(--r-sm)",
                          borderTop: `2px solid ${color}`,
                        }}>
                          <p style={{ fontSize: 11, color: color, fontFamily: "var(--font-mono)", marginBottom: 4 }}>
                            {item.time}
                          </p>
                          <p style={{ fontSize: 13, color: "var(--t-primary)", fontWeight: 500 }}>{item.activity}</p>
                          <p style={{ fontSize: 11, color: "var(--t-muted)", textTransform: "capitalize", marginTop: 2 }}>{item.type}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
