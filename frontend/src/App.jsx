import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message
    };

    setChat((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3001/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message
          })
        }
      );

      const data = await response.json();

      const botMessage = {
        sender: "bot",
        text: data.reply || "Sin respuesta."
      };

      setChat((prev) => [...prev, botMessage]);

    } catch (error) {
      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Error conectando con IA."
        }
      ]);
    }

    setLoading(false);
    setMessage("");
  };

  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "Arial"
      }}
    >
      <h1>🤖 Asistente IA</h1>

      <div
        style={{
          background: "#1e293b",
          borderRadius: "10px",
          padding: "15px",
          height: "60vh",
          overflowY: "auto",
          marginBottom: "15px"
        }}
      >
        {chat.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign:
                msg.sender === "user"
                  ? "right"
                  : "left",
              marginBottom: "10px"
            }}
          >
            <span
              style={{
                display: "inline-block",
                background:
                  msg.sender === "user"
                    ? "#2563eb"
                    : "#334155",
                padding: "10px",
                borderRadius: "10px",
                maxWidth: "80%"
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && (
          <p>La IA está escribiendo...</p>
        )}
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px"
        }}
      >
        <input
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Escribe algo..."
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "10px",
            border: "none"
          }}
        />

        <button
          onClick={sendMessage}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}