"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Loader2 } from "lucide-react";

export default function ManagerChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get("/api/v1/manager/chat")
      .then(res => setMessages(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const sendMessage = () => {
    if (!input) return;
    axios.post("/api/v1/manager/chat", { message: input })
      .then(res => setMessages(prev => [...prev, res.data]))
      .catch(err => console.log(err));
    setInput("");
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <div className="flex flex-col h-[80vh] p-4 space-y-2 bg-[var(--color-bgs)] text-[var(--color-texts)]">
      <div className="flex-1 overflow-y-auto p-2 border-b border-[var(--color-primarys)]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`p-2 my-1 rounded ${msg.sender === "manager" ? "bg-[var(--color-accents)] text-black ml-auto" : "bg-[var(--color-secondarys)] text-[var(--color-texts)]"}`}>
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex mt-2 gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 p-2 rounded border border-[var(--color-primarys)] bg-[var(--color-texts)] text-black"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-[var(--color-accents)] px-4 py-2 rounded text-black">Send</button>
      </div>
    </div>
  );
}
