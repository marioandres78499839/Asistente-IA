# 🤖 Asistente Personal.IA

Un asistente de productividad personal con IA que organiza tus tareas, propone planes del día y sugiere mejoras de hábitos.

---

## 📁 Estructura del proyecto

```
asistente-ia/
├── frontend/                  # React + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── MessageBubble.jsx   # Burbuja de chat
│   │   │   └── TaskCard.jsx        # Tarjeta de tarea interactiva
│   │   ├── hooks/
│   │   │   └── useChat.js          # Lógica de comunicación con API
│   │   ├── pages/
│   │   │   ├── Landing.jsx         # Página de inicio
│   │   │   ├── ChatPage.jsx        # Chat con Aria
│   │   │   └── Dashboard.jsx       # Resumen visual
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/                   # Node.js + Express
    ├── src/
    │   ├── server.js           # API Express
    │   └── storage.js          # Almacenamiento en memoria/disco
    ├── data/                   # Sesiones guardadas (auto-creado)
    ├── .env.example
    └── package.json
```

---

## 🚀 Cómo ejecutar

### 1. Configurar la API Key de Anthropic

```bash
cd backend
cp .env.example .env
# Edita .env y agrega tu API key:
# ANTHROPIC_API_KEY=sk-ant-...
```

Obtén tu API key en: https://console.anthropic.com/

### 2. Instalar dependencias e iniciar el backend

```bash
cd backend
npm install
npm run dev
# El servidor corre en http://localhost:3001
```

### 3. Instalar dependencias e iniciar el frontend

```bash
# En otra terminal:
cd frontend
npm install
npm run dev
# La app corre en http://localhost:5173
```

### 4. Abrir en el navegador

```
http://localhost:5173
```

---

## 🔌 Endpoints del Backend

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/chat` | Envía mensaje, recibe respuesta de IA |
| `GET`  | `/history/:sessionId` | Obtiene historial de conversación |
| `DELETE` | `/history/:sessionId` | Limpia historial |
| `GET`  | `/health` | Estado del servidor |

### Ejemplo de llamada a `/chat`:

```json
POST /chat
{
  "message": "Tengo 5 tareas urgentes y no sé por dónde empezar",
  "sessionId": "usuario_123"
}
```

```json
Response:
{
  "success": true,
  "message": "Entiendo que estás desbordado...",
  "tasks": [
    { "id": "t1", "title": "Tarea urgente A", "priority": "alta", "time": "09:00", "duration": "30min" }
  ],
  "recommendations": [
    { "id": "r1", "text": "Aplica la técnica Pomodoro...", "category": "productividad" }
  ],
  "dayPlan": [
    { "time": "09:00", "activity": "Bloque de trabajo profundo", "type": "trabajo" }
  ],
  "mood": "motivador"
}
```

---

## 💬 Ejemplos de uso

Prueba estos mensajes con Aria:

- `"Tengo muchas tareas y poco tiempo"`
- `"Necesito organizar mi semana completa"`
- `"Quiero crear un hábito de ejercicio diario"`
- `"No sé qué priorizar: el proyecto X o el cliente Y"`
- `"Me siento abrumado, ¿por dónde empiezo?"`
- `"Necesito un plan para estudiar para un examen en 3 días"`

---

## 🗄️ Almacenamiento

El backend guarda las conversaciones en `backend/data/sessions.json`.

Para usar **Firebase** en producción:
1. Instala: `npm install firebase-admin`
2. Reemplaza las funciones en `storage.js` con el SDK de Firebase Admin

---

## 🔮 Mejoras futuras

1. **Autenticación de usuarios** — Login con Google/GitHub para historial persistente
2. **Notificaciones push** — Recordatorios en tiempo real de tareas próximas
3. **Integración con calendario** — Sincronizar el plan del día con Google Calendar
4. **Análisis de productividad** — Gráficas de tendencias semanales/mensuales
5. **Modo offline** — Service Worker para usar sin conexión
6. **IA multimodal** — Subir imágenes de listas escritas a mano para procesarlas
7. **Exportar PDF** — Generar reporte semanal de productividad
8. **Integración con Notion/Trello** — Sincronizar tareas automáticamente
9. **Voz a texto** — Dictar tareas por micrófono
10. **Modo equipo** — Compartir planes y tareas con colaboradores

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| IA | Anthropic Claude (claude-sonnet-4) |
| Almacenamiento | In-memory + JSON (producción: Firebase) |
| Estilos | CSS puro con variables |
| Fuentes | Sora + JetBrains Mono |
