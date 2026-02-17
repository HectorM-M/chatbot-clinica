"use client";

import { useState, useRef, useEffect } from "react";
import { getBotResponse } from "../utils/decisionTree";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hola 👋 Soy el asistente virtual de la clínica. ¿Cómo puedo ayudarte?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll automático para los mensajws
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const botMessage = {
      text: getBotResponse(input),
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="w-[380px] h-[600px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border">
      
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center gap-2">
        <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold">
          🤖
        </div>
        <div>
          <p className="font-semibold">Asistente Clínica</p>
          <p className="text-xs opacity-80">En línea</p>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-white flex gap-2">
        <input
          type="text"
          placeholder="Escriba su mensaje..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
