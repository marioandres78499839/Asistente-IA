// ============================================================
// storage.js — Almacenamiento en memoria (simula base de datos)
// En producción: reemplazar con Firebase / MongoDB / PostgreSQL
// ============================================================
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "../data/sessions.json");

// Asegurar que el directorio de datos existe
import { mkdirSync } from "fs";
mkdirSync(join(__dirname, "../data"), { recursive: true });

// Cargar datos persistidos al iniciar
let sessions = {};
if (existsSync(DB_PATH)) {
  try {
    sessions = JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    sessions = {};
  }
}

// Persistir en disco
function persist() {
  try {
    writeFileSync(DB_PATH, JSON.stringify(sessions, null, 2));
  } catch (err) {
    console.error("[storage] Error persistiendo:", err.message);
  }
}

/**
 * Guardar un mensaje en el historial de sesión
 * @param {string} sessionId
 * @param {{ role: "user"|"assistant", content: string }} message
 */
export function saveMessage(sessionId, message) {
  if (!sessions[sessionId]) {
    sessions[sessionId] = {
      id: sessionId,
      createdAt: new Date().toISOString(),
      messages: [],
    };
  }
  sessions[sessionId].messages.push({
    ...message,
    timestamp: new Date().toISOString(),
  });
  sessions[sessionId].updatedAt = new Date().toISOString();
  persist();
}

/**
 * Obtener historial de mensajes de una sesión
 * Devuelve formato compatible con la API de Anthropic
 */
export function getHistory(sessionId) {
  if (!sessions[sessionId]) return [];
  return sessions[sessionId].messages.map(({ role, content }) => ({
    role,
    content,
  }));
}

/**
 * Limpiar historial de una sesión
 */
export function clearHistory(sessionId) {
  delete sessions[sessionId];
  persist();
}

/**
 * Obtener resumen de todas las sesiones (para dashboard admin)
 */
export function getAllSessions() {
  return Object.values(sessions).map(({ id, createdAt, updatedAt, messages }) => ({
    id,
    createdAt,
    updatedAt,
    messageCount: messages.length,
  }));
}
