import React from "react";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import instance from "../../../axios";

import { useAuth } from "@clerk/clerk-react";

// ✅ Tell TypeScript about Razorpay on window
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  planId?: string; // Optional plan ID for backend reference
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
}

const Credit: React.FC = () => {
  const { getToken } = useAuth();


  const plans: Plan[] = [
    {
      name: "Starter",
      price: "9",
      period: "/month",
      description: "Perfect for individuals just getting started.",
      features: ["10 Credits / Month", "Basic AI Chat", "Community Support"],
      highlighted: false,
      planId: "basic",
    },
    {
      name: "Pro",
      price: "29",
      period: "/month",
      description:
        "For professionals who need more power and unlimited access.",
      features: [
        "Unlimited Credits",
        "Advanced AI Chat",
        "Priority Support",
        "Custom Integrations",
      ],
      highlighted: true,
       planId: "standard",
    },
    {
      name: "Enterprise",
      price: "99",
      period: "/month",
      description: "For teams & businesses that need advanced solutions.",
      features: [
        "Unlimited Everything",
        "Dedicated Account Manager",
        "Custom AI Models",
        "24/7 Premium Support",
      ],
      highlighted: false,
       planId: "premium",
    },
   
  ];
  // For local development, provide a hint in error stack only when actually used
  // ✅ Payment handler
const paymentHandler = async (planId: string) => {
  try {
    const token = await getToken();

    // 1. Create order from backend
    const res = await instance.post(
      "/user/create-order",
      { planId }, // backend already knows the amount from planId
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const { order } = res.data; // ✅ extract properly
console.log(order);

    // 2. Setup Razorpay options
    const options: RazorpayOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_RHODgzsdukR10r",
      amount: order.amount,
      currency: order.currency,
      name: "Test Company",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response) => {
        try {
          await instance.post(
            "/user/verify-payment", // ✅ leading slash
            response,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Payment Successful!");
        } catch (err) {
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment failed. Please try again.");
  }
};


  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[var(--color-dark-bg)] dark:to-gray-950 flex flex-col items-center py-16 px-6">
      {/* Close Button */}
      <span className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 dark:bg-gray-800">
        <Link to={"/"}>
          <X className="cursor-pointer iconBg" />
        </Link>
      </span>

      {/* Header */}
      <div className="max-w-3xl text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-[var(--color-dark-text)]">
          Choose Your Plan
        </h1>
        <p className="text-gray-600 dark:text-[var(--color-dark-muted)] mt-4">
          Simple, transparent pricing that scales with you. Try it risk-free.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl shadow-lg border transition-transform transform hover:scale-105 ${
              plan.highlighted
                ? "bg-white dark:bg-gray-900 border-[var(--color-dark-accent)] shadow-2xl"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            } p-8 flex flex-col`}
          >
            {/* Plan Name */}
            <h3
              className={`text-xl font-semibold mb-4 ${
                plan.highlighted
                  ? "text-[var(--color-dark-accent)]"
                  : "text-gray-900 dark:text-[var(--color-dark-text)]"
              }`}
            >
              {plan.name}
            </h3>

            {/* Price */}
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">$
              {plan.price}
              <span className="text-lg font-medium text-gray-500 dark:text-[var(--color-dark-muted)]">
                {plan.period}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-[var(--color-dark-muted)] mb-6">
              {plan.description}
            </p>

            {/* Features */}
            <ul className="space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-[var(--color-dark-accent)]" />
                  <span className="text-gray-700 dark:text-[var(--color-dark-text)] text-sm">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* Button */}
            <button
              onClick={()=>paymentHandler(plan.planId!)}
              className={`mt-8 py-3 rounded-xl font-semibold transition-colors ${
                plan.highlighted
                  ? "bg-[var(--color-dark-accent)] text-black hover:bg-[var(--color-dark-accent2)]"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {plan.highlighted ? "Get Started" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Credit;
