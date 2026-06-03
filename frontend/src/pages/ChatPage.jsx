// ============================================================
// ChatPage.jsx — Interfaz principal del chat con IA
// ============================================================
import { useState, useRef, useEffect } from "react";
import MessageBubble from "../components/MessageBubble.jsx";
import TaskCard from "../components/TaskCard.jsx";

const QUICK_PROMPTS = [
  "Tengo muchas tareas y poco tiempo, ayúdame a organizarme",
  "Necesito un plan para mi día de hoy",
  "¿Cómo puedo mejorar mi productividad?",
  "Ayúdame a crear un hábito de lectura",
];

export default function ChatPage({ chat }) {
  const { messages, isLoading, sendMessage, clearChat } = chat;
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(true);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
    inputRef.current?.focus();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Obtener las tareas del último mensaje del asistente
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const activeTasks = lastAssistantMsg?.tasks || [];
  const activePlan = lastAssistantMsg?.dayPlan || [];

  return (
    <div style={{
      display: "flex",
      height: "calc(100vh - 56px)",
      overflow: "hidden",
    }}>
      {/* ── Panel izquierdo: Chat ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRight: "1px solid var(--c-border)",
      }}>
        {/* Header del chat */}
        <div style={{
          padding: "12px 20px",
          borderBottom: "1px solid var(--c-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--c-deep)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "var(--c-cyan-dim)",
              border: "1px solid var(--c-border-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              color: "var(--c-cyan)",
              position: "relative",
            }}>
              ◈
              {isLoading && (
                <div style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: "50%",
                  border: "2px solid var(--c-cyan)",
                  borderTopColor: "transparent",
                  animation: "spin 0.8s linear infinite",
                }} />
              )}
            </div>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--t-primary)" }}>Aria</p>
              <p style={{ fontSize: 11, color: isLoading ? "var(--c-amber)" : "var(--c-emerald)", fontFamily: "var(--font-mono)" }}>
                {isLoading ? "Procesando..." : "● En línea"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => setShowSidebar((s) => !s)}
              title="Alternar panel lateral"
              style={btnStyle}
            >
              ⊞
            </button>
            <button onClick={clearChat} title="Nueva conversación" style={btnStyle}>
              ↺
            </button>
          </div>
        </div>

        {/* Mensajes */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Indicador de carga */}
          {isLoading && (
            <div style={{
              display: "flex",
              gap: 6,
              padding: "12px 16px",
              background: "var(--c-surface)",
              borderRadius: "var(--r-md)",
              width: "fit-content",
              alignSelf: "flex-start",
              animation: "fadeIn 0.3s",
            }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--c-cyan)",
                  animation: `blink 1.2s ${i * 0.2}s infinite`,
                }} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div style={{
            padding: "0 20px 12px",
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            flexShrink: 0,
          }}>
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => sendMessage(p)}
                style={{
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border)",
                  borderRadius: "var(--r-sm)",
                  color: "var(--t-secondary)",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: 12,
                  transition: "all var(--dur) var(--ease)",
                  textAlign: "left",
                  maxWidth: 240,
                }}
                onMouseEnter={e => { e.target.style.borderColor = "var(--c-border-accent)"; e.target.style.color = "var(--t-primary)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "var(--c-border)"; e.target.style.color = "var(--t-secondary)"; }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 20px 16px",
          borderTop: "1px solid var(--c-border)",
          background: "var(--c-deep)",
          flexShrink: 0,
        }}>
          <div style={{
            display: "flex",
            gap: 8,
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "var(--r-lg)",
            padding: "6px 6px 6px 16px",
            transition: "border-color var(--dur) var(--ease)",
          }}
          onFocusCapture={e => e.currentTarget.style.borderColor = "var(--c-border-accent)"}
          onBlurCapture={e => e.currentTarget.style.borderColor = "var(--c-border)"}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Cuéntame qué tienes en mente... (Enter para enviar)"
              disabled={isLoading}
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "var(--t-primary)",
                fontFamily: "var(--font-body)",
                fontSize: 14,
                lineHeight: 1.6,
                resize: "none",
                maxHeight: 120,
                overflowY: "auto",
                padding: "6px 0",
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              style={{
                background: input.trim() && !isLoading ? "var(--c-cyan)" : "var(--c-border)",
                border: "none",
                borderRadius: "var(--r-sm)",
                color: input.trim() && !isLoading ? "#08111f" : "var(--t-muted)",
                width: 36,
                height: 36,
                cursor: input.trim() && !isLoading ? "pointer" : "not-allowed",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                alignSelf: "flex-end",
                transition: "all var(--dur) var(--ease)",
              }}
            >
              ↑
            </button>
          </div>
          <p style={{ fontSize: 11, color: "var(--t-muted)", marginTop: 6, textAlign: "center", fontFamily: "var(--font-mono)" }}>
            Enter envía · Shift+Enter nueva línea
          </p>
        </div>
      </div>

      {/* ── Panel derecho: Tareas y Plan ── */}
      {showSidebar && (
        <div style={{
          width: 300,
          overflowY: "auto",
          background: "var(--c-deep)",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
        }}>
          {/* Tareas activas */}
          <div style={{ padding: "16px", borderBottom: "1px solid var(--c-border)" }}>
            <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
              Tareas prioritarias
            </p>
            {activeTasks.length === 0 ? (
              <p style={{ fontSize: 12, color: "var(--t-muted)", fontStyle: "italic" }}>
                Cuéntale a Aria tus tareas para verlas aquí.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {activeTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>

          {/* Plan del día */}
          <div style={{ padding: "16px" }}>
            <p style={{ fontSize: 11, color: "var(--t-muted)", fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px", marginBottom: 12 }}>
              Plan del día
            </p>
            {activePlan.length === 0 ? (
              <p style={{ fontSize: 12, color: "var(--t-muted)", fontStyle: "italic" }}>
                Pide a Aria que organice tu día.
              </p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {activePlan.map((item, i) => (
                  <div key={i} style={{
                    display: "flex",
                    gap: 12,
                    padding: "8px 0",
                    borderBottom: i < activePlan.length - 1 ? "1px solid var(--c-border)" : "none",
                  }}>
                    <span style={{
                      fontSize: 11,
                      color: "var(--c-cyan)",
                      fontFamily: "var(--font-mono)",
                      minWidth: 44,
                      paddingTop: 2,
                    }}>
                      {item.time}
                    </span>
                    <div>
                      <p style={{ fontSize: 13, color: "var(--t-primary)", fontWeight: 500 }}>{item.activity}</p>
                      <p style={{ fontSize: 11, color: "var(--t-muted)", textTransform: "capitalize" }}>{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const btnStyle = {
  background: "none",
  border: "1px solid var(--c-border)",
  borderRadius: "var(--r-sm)",
  color: "var(--t-secondary)",
  width: 30,
  height: 30,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  transition: "all var(--dur) var(--ease)",
};
