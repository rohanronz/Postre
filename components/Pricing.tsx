"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals just starting out.",
    features: [
      "5 URL conversions per month",
      "LinkedIn & Twitter formats",
      "Basic AI tone selection",
      "Community support",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For creators who want to scale their content.",
    features: [
      "Unlimited URL conversions",
      "All social platforms included",
      "Advanced AI models (GPT-4)",
      "Newsletter generation",
      "Priority support",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "/month",
    description: "For agencies and large teams.",
    features: [
      "Everything in Pro",
      "API Access",
      "Team collaboration",
      "Custom brand voice training",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your content needs. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl p-8 border flex flex-col h-full",
                tier.popular
                  ? "border-blue-600 shadow-xl bg-white dark:bg-gray-900 dark:border-blue-500"
                  : "border-gray-200 bg-gray-50 dark:bg-black/50 dark:border-gray-800"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 dark:text-white">
                  {tier.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 dark:text-gray-400">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-gray-500 dark:text-gray-400">{tier.period}</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <Check className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={cn(
                  "w-full py-3 rounded-xl font-medium transition-colors",
                  tier.popular
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/25"
                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 dark:bg-transparent dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
                )}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
