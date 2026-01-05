"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axioss";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutForm from "./checkoutform";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_KEY!
);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.Product.price * item.quantity,
    0
  );

  useEffect(() => {
    axios.get("/api/v1/user/cart").then((res) => {
      setCart(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (total > 0) {
      axios
        .post("/api/v1/user/create-intent", { amount: total * 100 })
        .then((res) => setClientSecret(res.data.clientSecret));
    }
  }, [total]);

  if (!clientSecret) return <p className="p-10">Loading...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm
        cart={cart}
        total={total}
        address={address}
        setAddress={setAddress}
        area={area}
        setArea={setArea}
      />
    </Elements>
  );
}
