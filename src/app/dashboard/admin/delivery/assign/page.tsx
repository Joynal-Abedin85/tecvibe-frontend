"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AssignDeliveryPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  const [loading, setLoading] = useState(false);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderRes, driverRes] = await Promise.all([
          axios.get("/api/v1/admin/orders"),
          axios.get("/api/v1/admin/managers?role=delivery"),
        ]);

        setOrders(orderRes.data?.data || []);
        setDrivers(driverRes.data?.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedOrder || !selectedDriver) {
      toast.warning("Select order & driver first");
      return;
    }
    setLoading(true);

    try {
      await axios.post("/admin/delivery/assign", {
        orderId: selectedOrder,
        driverId: selectedDriver,
      });

      toast.success("Delivery Assigned Successfully!");
      setSelectedOrder("");
      setSelectedDriver("");
    } catch (err) {
      console.log(err);
      toast.error("Failed to assign delivery");
    } finally {
      setLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
      </div>
    );
  }

  return (
    <Card className="shadow-md border-0 bg-[var(--color-bgs)] text-[var(--color-texts)]">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Assign Delivery</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Select */}
        <div className="space-y-2">
          <label className="text-sm">Select Order</label>
          <Select value={selectedOrder} onValueChange={setSelectedOrder}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Choose Order" />
            </SelectTrigger>

            <SelectContent>
              {orders.map((o) => (
                <SelectItem key={o.id} value={o.id}>
                  #{o.id} — {o.customer?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Driver Select */}
        <div className="space-y-2">
          <label className="text-sm">Select Delivery Person</label>
          <Select value={selectedDriver} onValueChange={setSelectedDriver}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Choose Driver" />
            </SelectTrigger>

            <SelectContent>
              {drivers.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name} — {d.phone}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleAssign}
          disabled={loading}
          className="bg-[var(--color-primarys)] hover:bg-[var(--color-secondarys)] text-white"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : "Assign Delivery"}
        </Button>
      </CardContent>
    </Card>
  );
}
