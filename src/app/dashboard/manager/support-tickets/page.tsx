"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SupportTicketsPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/v1/manager/support-tickets")
      .then(res => setTickets(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-[var(--color-primarys)]">Support Tickets</h1>
      {tickets.map(ticket => (
        <Card key={ticket.id} className="bg-[var(--color-bgs)] text-[var(--color-texts)]">
          <CardHeader><CardTitle>{ticket.subject}</CardTitle></CardHeader>
          <CardContent>
            <p><strong>User:</strong> {ticket.user.name}</p>
            <p><strong>Message:</strong> {ticket.message}</p>
            <p><strong>Status:</strong> {ticket.status}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
