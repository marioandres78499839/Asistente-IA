// ============================================================
// useChat.js — Hook para comunicarse con el backend
// ============================================================
import { useState, useCallback, useRef } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

// Genera un ID de sesión único y lo persiste en localStorage
function getSessionId() {
  let id = localStorage.getItem("aria_session_id");
  if (!id) {
    id = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("aria_session_id", id);
  }
  return id;
}

export function useChat() {
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      message:
        "¡Hola! Soy Aria, tu asistente personal de productividad. 👋\n\nCuéntame sobre tu día, tus tareas pendientes o cualquier decisión que necesites tomar. Estoy aquí para ayudarte a organizarte mejor.",
      tasks: [],
      recommendations: [
        { id: "r0", text: "Prueba: 'Tengo 5 tareas urgentes y no sé por dónde empezar'", category: "productividad" },
        { id: "r1", text: "Prueba: 'Necesito organizar mi semana'", category: "hábitos" },
      ],
      dayPlan: [],
      mood: "motivador",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sessionId = useRef(getSessionId());

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: `u_${Date.now()}`,
      role: "user",
      message: text,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          sessionId: sessionId.current,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();

      const assistantMsg = {
        id: `a_${Date.now()}`,
        role: "assistant",
        ...data,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setError(err.message);
      const errMsg = {
        id: `err_${Date.now()}`,
        role: "assistant",
        message:
          "Hubo un problema conectando con el servidor. Verifica que el backend esté corriendo en el puerto 3001.",
        tasks: [],
        recommendations: [],
        dayPlan: [],
        mood: "calmado",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(async () => {
    try {
      await fetch(`${API_BASE}/history/${sessionId.current}`, { method: "DELETE" });
    } catch {}
    // Generar nueva sesión
    const newId = `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem("aria_session_id", newId);
    sessionId.current = newId;
    setMessages([
      {
        id: "welcome_new",
        role: "assistant",
        message: "Conversación reiniciada. ¿En qué te puedo ayudar hoy?",
        tasks: [],
        recommendations: [],
        dayPlan: [],
        mood: "motivador",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
