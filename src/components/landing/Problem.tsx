import React from 'react';
import { motion } from 'framer-motion';

export default function Problem() {
  return (
    <section className="py-20 md:py-32 relative bg-gradient-to-b from-[#0F1623] to-[#141B2D]">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-white">
            You're Talented. But the System is <span className="text-accent">Broken.</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-400">
            You've spent years earning your degree. You've got the skills employers desperately need. But every job application ends the same way:
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { emoji: "😓", title: '"Do you require sponsorship?"', desc: "The dreaded checkbox that eliminates you before anyone even sees your skills." },
            { emoji: "🔍", title: "Hours of Wasted Research", desc: "Scrolling through LinkedIn, Indeed, Glassdoor—never knowing which companies actually sponsor." },
            { emoji: "⏰", title: "Visa Clock Ticking", desc: "OPT expires in 6 months. Graduate visa running out. Every day feels like borrowed time." }
          ].map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1A2333]/80 to-[#0F1623]/90 border border-white/5 rounded-2xl p-8 text-center hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(26,66,255,0.15)] transition-all duration-300"
            >
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
