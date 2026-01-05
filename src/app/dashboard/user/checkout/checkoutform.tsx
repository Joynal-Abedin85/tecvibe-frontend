"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "@/lib/axioss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

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
  if (!stripe || !elements) {
    toast.error("Payment system not ready");
    return;
  }

  if (!cart?.length) {
    toast.warning("Your cart is empty");
    return;
  }

  const vendorid = cart[0]?.Product?.vendorid;
  if (!vendorid) {
    toast.error("Vendor not found");
    return;
  }

  setLoading(true);

  // Stripe payment
  const { error } = await stripe.confirmPayment({
    elements,
    redirect: "if_required",
  });

  if (error) {
    toast.error(error.message || "Payment failed");
    setLoading(false);
    return;
  }

  try {
    await axios.post("/api/v1/user/orders", {
      vendorid,
      area,
      address,
      total,
      items: cart.map((i: any) => ({
        productid: i.productid,
        quantity: i.quantity,
        price: i.Product.price,
      })),
    });

    toast.success("Order placed successfully 🎉");
    router.push("/dashboard/user/ordersuccess");
  } catch (err: any) {
    toast.error(
      err?.response?.data?.message ||
        "Order creation failed. Please contact support."
    );
  } finally {
    setLoading(false);
  }
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
