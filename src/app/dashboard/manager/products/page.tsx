"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge, Loader2, Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PendingProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  console.log(products);

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
      <h1 className="text-3xl font-bold">Pending Products</h1>

      {products.length === 0 && (
        <p className="text-muted-foreground">No pending products</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden rounded-2xl shadow-sm hover:shadow-md transition"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product.productimage?.[0]?.url}
                alt={product.name}
                className="h-44 w-full object-cover"
              />
              <Badge className="absolute top-3 right-3 bg-yellow-500">
                {product.status}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-1">
                {product.name}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Store className="w-4 h-4" />
                <span>{product.Vendor?.shopname || "Default Shop"}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>

              <div className="flex justify-between text-sm">
                <span>
                  <strong>Price:</strong> ${product.price}
                </span>
                <span>
                  <strong>Stock:</strong> {product.stock}
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className=" bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(product.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  className=""
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
