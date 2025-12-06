import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const stories = [
    { 
      name: "Adaeze N.", 
      role: "Software Engineer @ Google UK", 
      quote: "Applied to 200+ jobs on LinkedIn. Zero responses. Found SponsorPath, applied to 12 verified sponsors, got 5 interviews. Accepted my dream role in 6 weeks.",
      flagFrom: "🇳🇬", flagTo: "🇬🇧", visa: "Tier 2 Visa Secured",
      initial: "A", gradient: "from-[#FF6B6B] to-[#FF8E53]"
    },
    { 
      name: "Raj P.", 
      role: "Data Scientist @ Meta", 
      quote: "OPT was expiring in 4 months. Panicking. SponsorPath showed me exactly which companies had sponsored Indian nationals for H-1B. Landed offer in 8 weeks.",
      flagFrom: "🇮🇳", flagTo: "🇺🇸", visa: "H-1B Approved",
      initial: "R", gradient: "from-[#4FACFE] to-[#00F2FE]"
    },
    { 
      name: "Maria C.", 
      role: "Product Manager @ Shopify", 
      quote: "The sponsorship success rate data was a game changer. I focused on companies with 90%+ approval rates. First job I applied to—got the offer and LMIA approval.",
      flagFrom: "🇧🇷", flagTo: "🇨🇦", visa: "Work Permit Secured",
      initial: "M", gradient: "from-[#A18CD1] to-[#FBC2EB]"
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 relative bg-[#0F1623]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-secondary/10 border border-secondary/30">
            <span className="text-sm font-medium text-secondary">SUCCESS STORIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-white">
            They Landed Their <span className="text-secondary">Dream Jobs</span>
          </h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1A2333]/60 to-[#0F1623]/80 border border-white/5 rounded-2xl p-8 hover:border-secondary/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white bg-gradient-to-br ${story.gradient}`}>
                  {story.initial}
                </div>
                <div>
                  <div className="font-semibold text-white">{story.name}</div>
                  <div className="text-sm text-gray-400">{story.role}</div>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">"{story.quote}"</p>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{story.flagFrom}</span>
                  <span className="text-gray-500">→</span>
                  <span className="text-2xl">{story.flagTo}</span>
                  <span className="text-sm ml-auto text-secondary font-medium">{story.visa}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
