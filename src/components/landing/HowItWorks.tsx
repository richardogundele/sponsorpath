import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-b from-[#0F1623] to-[#0A1628]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-white">
            From <span className="text-accent">Application</span> to <span className="text-secondary">Offer</span> in 3 Steps
          </h2>
        </motion.div>
        
        <div className="space-y-8">
          {[
            { num: 1, title: "Create Your Profile", desc: "Tell us your skills, target country (UK/US/Canada), current visa status, and preferred industries. Takes 5 minutes. Our AI starts learning your ideal match.", color: "bg-primary", border: "border-primary/10", bg: "bg-primary/5" },
            { num: 2, title: "Get Matched Daily", desc: "Every morning, receive 5-10 curated job matches from verified sponsoring employers. No more guessing if they sponsor—they all do. Sorted by your compatibility score.", color: "bg-secondary", border: "border-secondary/10", bg: "bg-secondary/5" },
            { num: 3, title: "Apply with Confidence", desc: "Use our one-click apply, AI-generated cover letters, and sponsorship-optimized resume. Track every application. Land interviews 3x faster than traditional job boards.", color: "bg-accent", border: "border-accent/10", bg: "bg-accent/5" }
          ].map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col md:flex-row items-start gap-6 p-8 rounded-2xl border ${step.border} ${step.bg}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold flex-shrink-0 text-white ${step.color} shadow-lg`}>
                {step.num}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-white">{step.title}</h3>
                <p className="text-lg text-gray-400">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
