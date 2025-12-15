"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PendingProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Pending Products
  const loadPendingProducts = () => {
    setLoading(true);
    axios
      .get("/api/v1/manager/products/pending")
      .then((res) => setProducts(res.data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPendingProducts();
  }, []);

  // Approve Product
  const handleApprove = async (id: string) => {
    try {
      await axios.put(`/api/v1/manager/products/${id}/approve`);
      alert("Product Approved ✅");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to approve");
    }
  };

  // Reject Product
  const handleReject = async (id: string) => {
    try {
      await axios.put(`/api/v1/manager/products/${id}/reject`);
      alert("Product Rejected ❌");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to reject");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin w-10 h-10 text-[var(--color-primarys)]" />
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Pending Products</h1>

      {products.length === 0 && (
        <p className="text-lg text-muted-foreground">No pending products</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="bg-[var(--color-bgs)] text-[var(--color-texts)]"
          >
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {product.productimages?.[0] && (
                <img
                  src={product.productimages[0].url}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <p>
                <strong>Vendor:</strong> {product.vendor?.name || "Unknown"}
              </p>

              <p>
                <strong>Price:</strong> ${product.price}
              </p>

              <div className="flex  gap-3 mt-4">
                <Button
                  className="bg-green-500 text-white w-full"
                  onClick={() => handleApprove(product.id)}
                >
                  Approve
                </Button>

                <Button
                  className="bg-red-600 text-white w-full"
                  onClick={() => handleReject(product.id)}
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
