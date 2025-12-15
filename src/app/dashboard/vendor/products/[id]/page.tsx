"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "@/lib/axioss";

interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  stock: number;
  productimages: { url: string }[];
}

export default function EditProductPage() {
  const { id }: any = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [offer, setOffer] = useState({ discount: "", expiresAt: "" });
  const [stock, setStock] = useState("");

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/v1/vendor/products/${id}`);
        setProduct(res.data);
        setStock(res.data.stock.toString());
      } catch (err) {
        console.error(err);
        alert("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!product) return <div className="p-6">Product not found</div>;

  // Update product details
const handleUpdate = async () => {
  try {
    await axios.put(`/api/v1/vendor/products/${id}`, {
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });

    alert("Product Updated Successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update product");
  }
};


  // Upload Images
const handleImageUpload = async () => {
  if (images.length === 0) return alert("Select images first");

  const fd = new FormData();
  images.forEach((img) => fd.append("images", img));

  try {
    await axios.put(`/api/v1/vendor/products/${id}`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Images Uploaded Successfully!");
    setImages([]);
  } catch (err) {
    console.error("Image Upload Error:", err);
    alert("Failed to upload images");
  }
};



  // Stock Update
  const handleStockUpdate = async () => {
    try {
      await axios.put(`/api/v1/vendor/products/${id}/stock`, {
        stock: Number(stock),
      });
      alert("Stock Updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update stock");
    }
  };

  // Add Offer
  const handleAddOffer = async () => {
    if (!offer.discount || !offer.expiresAt)
      return alert("Fill discount and expiration date");
    try {
      await axios.post(`/api/v1/vendor/products/${id}/offer`, offer);
      alert("Offer Added!");
      setOffer({ discount: "", expiresAt: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add offer");
    }
  };

  // Delete Product
  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/v1/vendor/products/${id}`);
      alert("Product Deleted");
      router.push("/dashboard/vendor/products");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Edit Product</h1>

      {/* Product Details */}
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
          onChange={(e) =>
            setProduct({ ...product, price: Number(e.target.value) })
          }
        />
        <textarea
          className="w-full p-2 border rounded"
          value={product.description || ""}
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

      {/* Images */}
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

        {/* Existing Images */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {product.productimages?.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt="product"
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Stock */}
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
          value={offer.discount}
          onChange={(e) => setOffer({ ...offer, discount: e.target.value })}
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={offer.expiresAt}
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
