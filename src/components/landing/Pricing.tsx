import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

const plans = [
  {
    name: "Free",
    price: "£0",
    period: "forever",
    features: [
      "Browse 100,000+ sponsors",
      "1 AI-matched company/month",
      "Application tracking",
      "Basic company details"
    ],
    cta: "Start Free",
    ctaStyle: "outline",
    popular: false
  },
  {
    name: "Basic",
    price: "£5",
    period: "/month",
    features: [
      "Everything in Free",
      "5 AI-matched companies/month",
      "2 CV optimizations/month",
      "Full company contact details"
    ],
    cta: "Get Basic",
    ctaStyle: "outline",
    popular: false
  },
  {
    name: "Pro",
    price: "£12",
    period: "/month",
    features: [
      "Everything in Basic",
      "12 AI-matched companies/month",
      "6 CV optimizations/month",
      "Priority job alerts",
      "Company hiring insights"
    ],
    cta: "Get Pro",
    ctaStyle: "solid-cyan",
    popular: true,
    badge: "MOST POPULAR"
  },
  {
    name: "Unlimited",
    price: "£27",
    period: "/month",
    features: [
      "Everything in Pro",
      "UNLIMITED AI matches",
      "UNLIMITED CV optimizations",
      "Direct email support",
      "Interview prep resources"
    ],
    cta: "Go Unlimited",
    ctaStyle: "solid-coral",
    popular: false,
    badge: "BEST VALUE"
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold tracking-wider text-sm uppercase">Simple Pricing</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-white">
            Start Free. Upgrade When You're Ready.
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            No commitment. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={cn(
                "relative rounded-2xl p-8 border transition-all duration-300 flex flex-col h-full",
                plan.popular 
                  ? "bg-surface border-secondary shadow-[0_0_30px_rgba(0,212,180,0.1)] scale-105 z-10" 
                  : "bg-surface/50 border-white/10 hover:border-white/20"
              )}
            >
              {plan.badge && (
                <div className={cn(
                  "absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide",
                  plan.name === "Pro" ? "bg-secondary text-background" : "bg-accent text-white"
                )}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={cn(
                  "w-full py-3 px-4 rounded-lg text-sm font-semibold text-center transition-colors",
                  plan.ctaStyle === "outline" && "border border-primary text-primary hover:bg-primary hover:text-white",
                  plan.ctaStyle === "solid-cyan" && "bg-secondary text-background hover:bg-emerald-400",
                  plan.ctaStyle === "solid-coral" && "bg-accent text-white hover:bg-accent-hover"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">Save 60% vs searching alone</p>
        </div>
      </div>
    </section>
  );
}
