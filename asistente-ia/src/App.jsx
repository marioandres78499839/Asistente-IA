import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = {
      sender: "user",
      text: message
    };

    setChat((prev) => [...prev, userMsg]);

    try {
      const response = await fetch(
        "asistente-ia-production-edfa.up.railway.app",
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

      console.log(data);

      const botMsg = {
        sender: "bot",
        text: data.reply
      };

      setChat((prev) => [...prev, botMsg]);

    } catch (error) {
      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "No conecta backend"
        }
      ]);
    }

    setMessage("");
  };

  return (
    <div
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        padding: 20
      }}
    >
      <h1>🤖 Asistente IA</h1>

      {chat.map((msg, i) => (
        <p key={i}>
          <b>{msg.sender}:</b> {msg.text}
        </p>
      ))}

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
      />

      <button onClick={sendMessage}>
        Enviar
      </button>
    </div>
  );
}