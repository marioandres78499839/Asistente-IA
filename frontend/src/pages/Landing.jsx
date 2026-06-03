// ============================================================
// Landing.jsx — Página de inicio
// ============================================================
import { useState, useEffect } from "react";

const FEATURES = [
  {
    icon: "◎",
    title: "Organización inteligente",
    desc: "Cuéntale tus tareas y Aria las prioriza automáticamente con un plan de acción concreto.",
    color: "var(--c-cyan)",
    dim: "var(--c-cyan-dim)",
  },
  {
    icon: "◈",
    title: "Plan del día personalizado",
    desc: "Genera horarios optimizados basados en tu energía, urgencia y duración de cada tarea.",
    color: "var(--c-violet)",
    dim: "var(--c-violet-dim)",
  },
  {
    icon: "◉",
    title: "Seguimiento de hábitos",
    desc: "Registra tus rutinas y recibe recomendaciones para mejorar tu productividad diaria.",
    color: "var(--c-emerald)",
    dim: "var(--c-emerald-dim)",
  },
  {
    icon: "⊕",
    title: "Decisiones asistidas",
    desc: "Cuando no sepas qué hacer primero, Aria analiza el contexto y te da claridad.",
    color: "var(--c-amber)",
    dim: "var(--c-amber-dim)",
  },
];

const EXAMPLES = [
  '"Tengo 8 tareas pendientes y solo 3 horas libres"',
  '"No sé cómo organizar mi semana, tengo demasiado"',
  '"Necesito crear un hábito de ejercicio consistente"',
  '"¿Cómo debería priorizar entre X y Y?"',
];

export default function Landing({ onStart }) {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    const interval = setInterval(() => {
      setExampleIdx((i) => (i + 1) % EXAMPLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--c-void)",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Fondo decorativo */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: `
          radial-gradient(ellipse 60% 50% at 50% -10%, rgba(99,179,237,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 80% 80%, rgba(159,122,234,0.08) 0%, transparent 50%)
        `,
        pointerEvents: "none",
      }} />

      {/* Grid sutil */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Nav */}
      <nav style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 40px",
        maxWidth: 1100,
        margin: "0 auto",
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontWeight: 600,
          fontSize: 16,
          letterSpacing: "-0.3px",
        }}>
          <span style={{ color: "var(--c-cyan)", fontSize: 20 }}>◈</span>
          Asistente Personal<span style={{ color: "var(--c-cyan)" }}>.IA</span>
        </div>
        <button
          onClick={onStart}
          style={{
            background: "var(--c-cyan-dim)",
            border: "1px solid var(--c-border-accent)",
            borderRadius: "var(--r-sm)",
            color: "var(--c-cyan)",
            padding: "8px 20px",
            cursor: "pointer",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            transition: "all var(--dur) var(--ease)",
          }}
          onMouseEnter={e => e.target.style.background = "rgba(99,179,237,0.25)"}
          onMouseLeave={e => e.target.style.background = "var(--c-cyan-dim)"}
        >
          Iniciar →
        </button>
      </nav>

      {/* Hero */}
      <main style={{
        position: "relative",
        maxWidth: 780,
        margin: "0 auto",
        padding: "80px 40px 60px",
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: "opacity 0.6s var(--ease), transform 0.6s var(--ease)",
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          background: "var(--c-cyan-dim)",
          border: "1px solid var(--c-border-accent)",
          borderRadius: 100,
          padding: "4px 14px",
          fontSize: 12,
          color: "var(--c-cyan)",
          fontWeight: 500,
          marginBottom: 32,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}>
          <span style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--c-cyan)",
            animation: "blink 1.5s infinite",
            display: "inline-block",
          }} />
          IA · Productividad · Hábitos
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-2px",
          marginBottom: 20,
          color: "var(--t-primary)",
        }}>
          Tu asistente personal{" "}
          <span style={{
            background: "linear-gradient(135deg, var(--c-cyan), var(--c-violet))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            con inteligencia artificial
          </span>
        </h1>

        <p style={{
          fontSize: 18,
          color: "var(--t-secondary)",
          lineHeight: 1.7,
          maxWidth: 560,
          margin: "0 auto 40px",
          fontWeight: 300,
        }}>
          Organiza tus tareas, toma mejores decisiones y construye hábitos sólidos. 
          Solo cuéntale a Aria qué tienes en mente.
        </p>

        {/* CTA */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
          <button
            onClick={onStart}
            style={{
              background: "var(--c-cyan)",
              border: "none",
              borderRadius: "var(--r-md)",
              color: "#08111f",
              padding: "14px 32px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.2px",
              transition: "all var(--dur) var(--ease)",
              boxShadow: "0 0 40px rgba(99,179,237,0.25)",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 60px rgba(99,179,237,0.4)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 0 40px rgba(99,179,237,0.25)"; }}
          >
            Hablar con Aria
          </button>
          <button
            onClick={onStart}
            style={{
              background: "none",
              border: "1px solid var(--c-border)",
              borderRadius: "var(--r-md)",
              color: "var(--t-secondary)",
              padding: "14px 32px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              transition: "all var(--dur) var(--ease)",
            }}
            onMouseEnter={e => { e.target.style.borderColor = "var(--c-border-accent)"; e.target.style.color = "var(--t-primary)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "var(--c-border)"; e.target.style.color = "var(--t-secondary)"; }}
          >
            Ver dashboard →
          </button>
        </div>

        {/* Ejemplo rotativo */}
        <div style={{
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          borderRadius: "var(--r-lg)",
          padding: "16px 24px",
          maxWidth: 500,
          margin: "0 auto 80px",
          textAlign: "left",
        }}>
          <p style={{ fontSize: 11, color: "var(--t-muted)", marginBottom: 8, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.8px" }}>
            Ejemplo de mensaje
          </p>
          <p style={{
            fontSize: 14,
            color: "var(--c-cyan)",
            fontFamily: "var(--font-mono)",
            fontStyle: "italic",
            transition: "opacity 0.3s",
            minHeight: 40,
            display: "flex",
            alignItems: "center",
          }}>
            {EXAMPLES[exampleIdx]}
          </p>
        </div>
      </main>

      {/* Features */}
      <section style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 40px 80px",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s 0.3s var(--ease)",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: "var(--r-lg)",
                padding: "24px",
                transition: "border-color var(--dur) var(--ease), transform var(--dur) var(--ease)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = f.color.replace("var(--c-", "").replace(")", "") === f.color ? "rgba(99,179,237,0.3)" : "rgba(99,179,237,0.3)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--c-border)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{
                width: 40,
                height: 40,
                borderRadius: "var(--r-sm)",
                background: f.dim,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 20,
                color: f.color,
                marginBottom: 16,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8, color: "var(--t-primary)" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--t-secondary)", lineHeight: 1.6, fontWeight: 300 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: "center",
        padding: "24px",
        borderTop: "1px solid var(--c-border)",
        color: "var(--t-muted)",
        fontSize: 12,
        fontFamily: "var(--font-mono)",
      }}>
        Asistente Personal.IA · Powered by Claude · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
