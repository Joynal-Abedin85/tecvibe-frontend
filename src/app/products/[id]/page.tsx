"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/axioss";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios.get(`/api/v1/shop/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const addToCart = async () => {
    await axios.post("/api/v1/user/cart", { productId: product.id, quantity: 1 });
    alert("Added to cart");
  };

  const addToWishlist = async () => {
    await axios.post("/api/v1/user/wishlist", { productId: product.id });
    alert("Added to wishlist");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={product.productimages[0]?.url || "/placeholder.jpg"}
        alt={product.name}
        className="h-80 w-full object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="mb-2">${product.price}</p>
      <p className="mb-4">{product.description}</p>

      <div className="flex gap-3 mb-6">
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={addToWishlist}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Add to Wishlist
        </button>
      </div>

      {/* Reviews & Questions */}
      <ReviewsSection productId={product.id} />
      <QuestionsSection productId={product.id} />
    </div>
  );
}

// Components for Reviews & Questions
function ReviewsSection({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");

  const fetchReviews = async () => {
    const res = await axios.get(`/api/v1/user/products/${productId}/review`);
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const submitReview = async () => {
    await axios.post(`/api/v1/user/products/${productId}/review`, { text });
    setText("");
    fetchReviews();
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">Reviews</h2>
      <textarea
        className="border p-2 w-full mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a review..."
      />
      <button
        className="bg-green-500 text-white px-3 py-1 rounded mb-4"
        onClick={submitReview}
      >
        Submit Review
      </button>

      <div className="space-y-2">
        {reviews.map((r: any) => (
          <div key={r.id} className="p-2 border rounded">
            {r.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionsSection({ productId }: { productId: string }) {
  const [questions, setQuestions] = useState([]);
  const [text, setText] = useState("");

  const fetchQuestions = async () => {
    const res = await axios.get(`/api/v1/user/products/${productId}/question`);
    setQuestions(res.data);
  };

  useEffect(() => {
    fetchQuestions();
  }, [productId]);

  const submitQuestion = async () => {
    await axios.post(`/api/v1/user/products/${productId}/question`, { text });
    setText("");
    fetchQuestions();
  };

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">Questions</h2>
      <textarea
        className="border p-2 w-full mb-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a question..."
      />
      <button
        className="bg-purple-500 text-white px-3 py-1 rounded mb-4"
        onClick={submitQuestion}
      >
        Submit Question
      </button>

      <div className="space-y-2">
        {questions.map((q: any) => (
          <div key={q.id} className="p-2 border rounded">
            {q.text}
          </div>
        ))}
      </div>
    </div>
  );
}
