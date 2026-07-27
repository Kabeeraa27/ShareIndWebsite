"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import clsx from "clsx";

const PLANS = [
  {
    name: "Starter",
    price: "₹0",
    period: "/month",
    description: "For new investors dipping their toes in.",
    features: ["Free equity delivery trades", "Basic dashboard & watchlists", "Email support", "1 sub-account"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹299",
    period: "/month",
    description: "For active traders who need real analytics.",
    features: [
      "Everything in Starter",
      "Advanced charting & backtests",
      "AI Assistant included",
      "Priority support",
      "5 sub-accounts",
    ],
    highlighted: true,
  },
  {
    name: "Elite",
    price: "₹999",
    period: "/month",
    description: "For teams, advisors, and power users.",
    features: [
      "Everything in Pro",
      "Full API & webhook access",
      "Dedicated relationship manager",
      "Unlimited sub-accounts",
      "Custom compliance reports",
    ],
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="mx-auto mb-16 max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent-purple">
          Pricing
        </p>
        <h2
          className="text-3xl font-bold text-white sm:text-4xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Simple plans, no surprises
        </h2>
        <p className="mt-4 text-white/60">Start free. Upgrade the moment you need more edge.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={clsx(
              "relative flex flex-col rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5",
              plan.highlighted
                ? "glow-purple border border-accent-purple/40 bg-gradient-to-b from-white/10 to-white/[0.03]"
                : "glass"
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
            <p className="mt-1 text-sm text-white/55">{plan.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">{plan.price}</span>
              <span className="text-white/50">{plan.period}</span>
            </div>
            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent-cyan" />
                  {f}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={clsx(
                "mt-8 rounded-full py-3 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]",
                plan.highlighted
                  ? "bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white"
                  : "border border-white/15 text-white/85"
              )}
            >
              Choose {plan.name}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
