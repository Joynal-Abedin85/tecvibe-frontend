"use client";

import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import axios from "@/lib/axioss";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutForm({
  cart,
  total,
  address,
  setAddress,
  area,
  setArea,
}: any) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    // PAYMENT SUCCESS → CREATE ORDER
    await axios.post("/api/v1/user/orders", {
      vendorid: cart[0].product.verdorid,
      area,
      total,
      items: cart.map((i: any) => ({
        productid: i.productid,
        quantity: i.quantity,
        price: i.product.price,
      })),
    });

    router.push("/dashboard/user/ordersuccess");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      {/* Address */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Delivery Address</h2>
        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />
      </div>

      {/* Payment */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-3">Payment</h2>
        <PaymentElement />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Processing..." : `Pay ৳${total}`}
        </button>
      </div>
    </div>
  );
}
