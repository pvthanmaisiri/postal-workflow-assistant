import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Chatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hello! I'm your Postal AI Assistant. Ask me anything about India Post policies."
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, loading]);

  const askQuestion = async (customQuestion = null) => {
    const userQuestion = customQuestion || question;

    if (!userQuestion.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(
  "https://postal-workflow-assistant.onrender.com/api/chat",
  { question: userQuestion }
);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: res.data.answer,
        },
      ]);

      // Suggestions
      if (userQuestion.toLowerCase().includes("rpli")) {
        setSuggestions([
          "RPLI eligibility",
          "RPLI documents",
          "RPLI workflow",
        ]);
      } else if (userQuestion.toLowerCase().includes("sukanya")) {
        setSuggestions([
          "Sukanya eligibility",
          "Sukanya documents",
          "Sukanya workflow",
        ]);
      } else if (userQuestion.toLowerCase().includes("ppf")) {
        setSuggestions([
          "PPF eligibility",
          "PPF documents",
          "PPF workflow",
        ]);
      } else {
        setSuggestions([
          "Tell me about RPLI",
          "Tell me about Sukanya",
          "Tell me about PPF",
        ]);
      }

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  };

  const quickAsk = (text) => {
    askQuestion(text);
  };

  return (
    <div className="chat-container">
      <h2>🤖 Postal AI Assistant</h2>

      <div className="quick-actions">
        <button onClick={() => quickAsk("Tell me about Sukanya")}>
          🌸 Sukanya
        </button>

        <button onClick={() => quickAsk("Tell me about PPF")}>
          💰 PPF
        </button>

        <button onClick={() => quickAsk("Tell me about RPLI")}>
          🛡 RPLI
        </button>

        <button onClick={() => quickAsk("PPF documents")}>
          📄 Documents
        </button>

        <button onClick={() => quickAsk("Sukanya eligibility")}>
          ✅ Eligibility
        </button>

        <button onClick={() => quickAsk("Compare PPF and Sukanya")}>
          ⚖ Compare
        </button>
      </div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "user-message"
                : "bot-message"
            }
          >
            {msg.text}
          </div>
        ))}

        {loading && (
          <div className="bot-message typing-message">
            <span>🤖 Assistant is typing</span>

            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {suggestions.length > 0 && (
        <div className="suggestions">
          <p>
            <strong>💡 You may also ask:</strong>
          </p>

          <div className="suggestion-buttons">
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => quickAsk(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Ask about PPF, Sukanya, RPLI..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              askQuestion();
            }
          }}
        />

        <button
          className="btn"
          onClick={() => askQuestion()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;