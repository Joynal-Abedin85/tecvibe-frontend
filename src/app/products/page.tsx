"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/axioss";
import { useAuth } from "../context/authprovider";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  price: number;
  productimage: { url: string }[];
  category: { id: string; name: string };
  brand: { id: string; name: string };
  Vendor: { shopname: string };
}

interface Category { id: string; name: string }
interface Brand { id: string; name: string }

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [Loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const { user, loading} = useAuth();
  const router = useRouter();

useEffect(() => {
  if (!loading && (!user || user.role !== "USER")) {
    router.replace("/login");
  }
}, [user, loading]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/v1/shop/products", { params: { search, category: filterCategory, brand: filterBrand } });
      setProducts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilters = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        axios.get("/api/v1/shop/categories"),
        axios.get("/api/v1/shop/brands")
      ]);
      setCategories(catRes.data.data);
      setBrands(brandRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilters();
    fetchProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, filterCategory, filterBrand]);

  if (Loading) return <div className="text-center py-20">Loading...</div>;
  console.log(products)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
        <select
          value={filterBrand}
          onChange={(e) => setFilterBrand(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <img
              src={product.productimage[0]?.url || "/placeholder.jpg"}
              alt={product.name}
              className="h-40 w-full object-cover mb-2 rounded"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.Vendor.shopname}</p>
            <p className="text-lg font-semibold">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
