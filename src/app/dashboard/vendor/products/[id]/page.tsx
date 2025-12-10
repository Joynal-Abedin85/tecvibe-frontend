"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axioss";

export default function EditProductPage() {
  const { id }: any = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [offer, setOffer] = useState({ discount: "", expiresAt: "" });
  const [stock, setStock] = useState("");

  // Fetch product data
  useEffect(() => {
    axios
      .get(`/api/v1/vendors/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setStock(res.data.stock);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  // Update product data
  const handleUpdate = async () => {
    await axios.put(`/api/v1/vendors/products/${id}`, {
      name: product.name,
      price: product.price,
      description: product.description,
    });

    alert("Product Updated Successfully!");
  };

  // Upload product images
  const handleImageUpload = async () => {
    const formData = new FormData();
    images.forEach((img) => formData.append("images", img));

    await axios.post(
      `/api/v1/vendors/products/${id}/images`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Images Uploaded!");
  };

  // Stock Update
  const handleStockUpdate = async () => {
    await axios.put(`/api/v1/vendors/products/${id}/stock`, { stock });
    alert("Stock Updated!");
  };

  // Add Offer
  const handleAddOffer = async () => {
    await axios.post(`/api/v1/vendors/products/${id}/offer`, offer);
    alert("Offer Added!");
  };

  // Delete Product
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    await axios.delete(`/api/v1/vendors/products/${id}`);
    alert("Product Deleted");
    router.push("/dashboard/vendor/products");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold">Edit Product</h1>

      {/* Basic Details */}
      <div className="space-y-2">
        <input
          className="w-full p-2 border rounded"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />

        <textarea
          className="w-full p-2 border rounded"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </div>

      <button
        onClick={handleUpdate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Update Product
      </button>

      {/* Image Upload */}
      <div className="border p-4 rounded space-y-2">
        <h2 className="text-xl font-semibold">Upload Images</h2>

        <input
          type="file"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />

        <button
          onClick={handleImageUpload}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Upload Images
        </button>
      </div>

      {/* Stock Update */}
      <div className="border p-4 rounded space-y-2">
        <h2 className="text-xl font-semibold">Update Stock</h2>
        <input
          type="number"
          className="p-2 border rounded w-full"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />
        <button
          onClick={handleStockUpdate}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Update Stock
        </button>
      </div>

      {/* Offer */}
      <div className="border p-4 rounded space-y-2">
        <h2 className="text-xl font-semibold">Add Offer</h2>

        <input
          className="w-full p-2 border rounded"
          placeholder="Discount %"
          onChange={(e) => setOffer({ ...offer, discount: e.target.value })}
        />

        <input
          className="w-full p-2 border rounded"
          type="date"
          onChange={(e) => setOffer({ ...offer, expiresAt: e.target.value })}
        />

        <button
          onClick={handleAddOffer}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add Offer
        </button>
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded w-full"
      >
        Delete Product
      </button>
    </div>
  );
}
