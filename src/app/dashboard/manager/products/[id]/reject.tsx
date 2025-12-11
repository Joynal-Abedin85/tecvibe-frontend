"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function RejectProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/manager/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleReject = () => {
    setUpdating(true);
    axios.put(`/api/v1/manager/products/${id}/reject`)
      .then(() => router.push("/dashboard/manager/vendors"))
      .catch(err => console.log(err))
      .finally(() => setUpdating(false));
  };

  if (loading) return (
    <div className="flex justify-center py-20">
      <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
    </div>
  );

  return (
    <Card className="bg-[var(--color-bgs)] text-[var(--color-texts)]">
      <CardHeader><CardTitle>Reject Product</CardTitle></CardHeader>
      <CardContent className="space-y-4">
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Description:</strong> {product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <Button
          onClick={handleReject}
          className="bg-red-600 text-white"
          disabled={updating}
        >
          {updating ? "Rejecting..." : "Reject"}
        </Button>
      </CardContent>
    </Card>
  );
}
