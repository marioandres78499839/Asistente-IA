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
``

## 🛠️ Stack técnico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| IA | Anthropic Claude (claude-sonnet-4) |
| Almacenamiento | In-memory + JSON (producción: Firebase) |
| Estilos | CSS puro con variables |
| Fuentes | Sora + JetBrains Mono |
