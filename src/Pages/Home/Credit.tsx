import React from "react";
import { Check,  X } from "lucide-react";
import { Link } from "react-router-dom";

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const Credit: React.FC = () => {
  const plans: Plan[] = [
    {
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Perfect for individuals just getting started.",
      features: ["10 Credits / Month", "Basic AI Chat", "Community Support"],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$29",
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
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For teams & businesses that need advanced solutions.",
      features: [
        "Unlimited Everything",
        "Dedicated Account Manager",
        "Custom AI Models",
        "24/7 Premium Support",
      ],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[var(--color-dark-bg)] dark:to-gray-950 flex flex-col items-center py-16 px-6">
      {/* Header */}
    
      <span className="absolute top-4 right-4 p-2 rounded-md hover:bg-gray-200 dark:bg-gray-800">
          <Link to={"/"}>
       <X  className="cursor-pointer iconBg"/>
         </Link>
      </span>
 
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
        {plans.map((plan: Plan, index: number) => (
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
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
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
              {plan.features.map((feature: string, i: number) => (
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
