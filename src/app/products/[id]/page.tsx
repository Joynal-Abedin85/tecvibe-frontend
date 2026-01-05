"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axioss";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  productimage: { url: string }[];
  Category: { name: string };
  Brand: { name: string };
  Vendor: { shopname: string };
  stock: number
}

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/v1/shop/products/${id}`)
      .then((res) => setProduct(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      const res = await axios.post("/api/v1/user/cart", {
        productid: product.id,
        quantity,
      });

      console.log("Cart added:", res.data);
      alert("Added to Cart!");
    } catch (err: any) {
      console.error("Add cart error:", err.response?.data || err);
      alert("Failed to add to cart");
    }
  };

const handleAddToWishlist = async () => {
  if (!product) return;

  setAdding(true);
  try {
    const res = await axios.post("/api/v1/user/wishlist", {
      productid: product.id,
    });

    console.log("wishlist", res.data);
    alert(res.data.message || "Added to Wishlist!");
  } catch (err: any) {
    console.error(err);

  if (err.code === "P2002") {
    throw new Error( "Already in wishlist");
  }



    alert(
      err?.response?.data?.message || "Already in wishlist"
    );
  } finally {
    setAdding(false);
  }
};


  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          {product.productimage.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={product.name}
              className="w-full h-64 object-cover rounded"
            />
          ))}
        </div>

        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p>
            <strong>Price:</strong> ${product.price}
          </p>
          <p>
            <strong>Category:</strong> {product.Category.name}
          </p>
          <p>
            <strong>Brand:</strong> {product.Brand.name}
          </p>
          <p>
            <strong>Shop:</strong> {product.Vendor.shopname}
          </p>
          <p>
            <strong>stock:</strong> {product.stock}
          </p>

          <div className="flex gap-4 mt-4">
            {/* Quantity Controller */}
            <div className="flex items-center gap-3 border rounded-lg px-3 py-1">
              <Button
                variant="outline"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </Button>

              <span className="min-w-[20px] text-center font-medium">
                {quantity}
              </span>

              <Button
                variant="outline"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>

            {/* Add to Cart */}
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </Button>

            {/* Add to Wishlist */}
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleAddToWishlist}
              disabled={adding}
            >
              {adding ? "Adding..." : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
