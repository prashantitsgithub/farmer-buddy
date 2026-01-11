import React, { useState, useRef, useEffect } from "react";
import "../ChatBot.css";
import axios from "axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today with your farming questions?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Handle click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Add event listener when chat is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: inputValue.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await axios.post(`http://localhost:5000/chat`, {
        messages: [...messages, userMessage],
      });
      console.log("AI Response:", aiResponse.data);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiResponse.data?.response,
        },
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container" ref={chatbotRef}>
      {/* Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? "chatbot-toggle-active" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Chat Container */}
      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h3>KrishiBot</h3>
            <button
              className="close-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div
                style={{ textAlign: "start" }}
                key={index}
                className={`message ${
                  message.role === "assistant" ? "assistant" : "user"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant loading">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbox-input" onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask something about farming or agriculture..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
