import React from 'react';
import { motion } from 'framer-motion';

export default function Solution() {
  const features = [
    { icon: "✓", title: "Verified Sponsors Only", desc: "Every employer is manually verified against government visa records. UK Tier 2, US H-1B, Canada LMIA—all confirmed." },
    { icon: "🎯", title: "AI-Powered Matching", desc: "Tell us your skills, experience, and target country. Our AI matches you with roles where you'll actually get interviews." },
    { icon: "📊", title: "Sponsorship Success Data", desc: "See each company's sponsorship approval rate, average timeline, and nationalities they've sponsored before." },
    { icon: "🔔", title: "Instant Job Alerts", desc: "Get notified the moment a sponsoring company posts a role matching your profile. Apply before the crowd." },
    { icon: "📝", title: "Visa-Ready Resume Builder", desc: "Our AI crafts resumes optimized for international hiring. Highlight transferable skills, address sponsorship proactively." },
    { icon: "💬", title: "Community & Support", desc: "Join 12,000+ international professionals sharing interview tips, visa timelines, and employer reviews." }
  ];

  return (
    <section id="features" className="py-20 md:py-32 relative bg-[#0F1623]">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(26,66,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,66,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-primary/10 border border-primary/30">
            <span className="text-sm font-medium text-primary">THE SOLUTION</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 text-white">
            Every Employer. <span className="text-secondary">Verified Sponsorship.</span>
          </h2>
          <p className="text-lg max-w-3xl mx-auto text-gray-400">
            We've done the impossible—built a database of 15,000+ companies with verified visa sponsorship history across UK, US, and Canada.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-8 hover:border-primary/30 hover:shadow-[0_0_60px_rgba(26,66,255,0.1)] transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
