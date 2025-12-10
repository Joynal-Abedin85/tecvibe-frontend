// src/app/dashboard/vendor/chat/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "@/lib/axioss";

type Msg = {
  id: string;
  fromId?: string;
  toId?: string;
  text: string;
  createdAt?: string;
  senderName?: string;
};

export default function VendorChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get("/api/v1/vendor/chat");
      const payload = res.data?.data ?? res.data;
      setMessages(Array.isArray(payload) ? payload : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      // scroll
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  };

  useEffect(() => {
    fetchMessages();
    const iv = setInterval(fetchMessages, 5000); // poll every 5s
    return () => clearInterval(iv);
  }, []);

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await axios.post("/api/v1/vendor/chat", { text });
      setText("");
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert("Send failed");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vendor Chat</h1>

      <div className="border rounded h-[60vh] flex flex-col overflow-hidden">
        <div className="p-4 flex-1 overflow-auto space-y-3">
          {loading ? (
            <div>Loading...</div>
          ) : messages.length === 0 ? (
            <div className="text-gray-500">No messages yet.</div>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`p-2 rounded max-w-[80%] ${m.fromId ? "bg-gray-100 self-start" : "bg-blue-600 text-white self-end"}`}
                style={{ alignSelf: m.fromId ? "flex-start" : "flex-end" }}
              >
                <div className="text-sm">{m.senderName ?? (m.fromId ? "User" : "You")}</div>
                <div className="mt-1">{m.text}</div>
                <div className="text-xs text-gray-400 mt-1">{m.createdAt ? new Date(m.createdAt).toLocaleString() : ""}</div>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        <div className="p-3 border-t flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded p-2"
            placeholder="Type a message..."
          />
          <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
        </div>
      </div>
    </div>
  );
}
