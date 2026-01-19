"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

// ------------------ TYPES ------------------
type FAQ = {
  id: number;
  question: string;
  answer: string;
};

// ------------------ FAQ DATA ------------------
const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I place an order?",
    answer:
      "Simply browse products, add them to your cart, and proceed to checkout to place an order.",
  },
  {
    id: 2,
    question: "What payment methods are supported?",
    answer:
      "We support Cash on Delivery, Debit/Credit Cards, Mobile Banking, and Online Payments.",
  },
  {
    id: 3,
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 2–5 working days depending on your location.",
  },
  {
    id: 4,
    question: "Can I return or exchange a product?",
    answer:
      "Yes, you can return or exchange products within 7 days if they meet our return policy.",
  },
  {
    id: 5,
    question: "Is it safe to shop on this website?",
    answer:
      "Absolutely. We use secure payment gateways and data encryption to protect your information.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:px-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">❓ Frequently Asked Questions</h1>
        <p className="mt-2 text-gray-600">Find answers to the most common questions</p>
      </div>

      {/* FAQ List */}
      <div className="mx-auto max-w-3xl space-y-4">
        {faqs.map(faq => (
          <Card key={faq.id} className="rounded-2xl">
            <CardContent className="p-0">
              <Button
                variant="ghost"
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                />
              </Button>

              <AnimatePresence initial={false}>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden px-5 pb-4"
                  >
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
