import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-[#0F1623]">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Radial Gradient Pulse */}
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(26,66,255,0.1)_0%,transparent_50%)] animate-pulse-bg" />
        
        {/* Floating Orbs */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-primary/30 rounded-full blur-[60px] animate-float" />
        <div className="absolute bottom-[-50px] left-[-100px] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[60px] animate-float delay-2000" />
        <div className="absolute top-1/2 left-[30%] w-[200px] h-[200px] bg-accent/15 rounded-full blur-[60px] animate-float delay-4000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(26,66,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(26,66,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-secondary/10 border border-secondary/30 animate-[bounce_2s_infinite]"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-sm text-secondary font-medium">2,847 international talents matched this month</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6 text-white drop-shadow-[0_0_40px_rgba(26,66,255,0.5)]"
        >
          Land Your <span className="text-secondary">Sponsorship Job</span><br />
          in <span className="border-r-4 border-secondary pr-2 animate-[pulse_0.8s_infinite]">UK, US & Canada</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-400"
        >
          The only platform that connects international students and immigrants with 15,000+ verified employers who actively sponsor work visas. Stop guessing. Start applying.
        </motion.p>

        {/* Flags */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-4 mb-10"
        >
          {['🇬🇧', '🇺🇸', '🇨🇦'].map((flag, i) => (
            <div key={i} className="w-12 h-8 rounded bg-white/10 flex items-center justify-center text-2xl hover:scale-110 hover:rotate-6 transition-transform cursor-default">
              {flag}
            </div>
          ))}
        </motion.div>

        {/* CTA Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-5 py-4 rounded-xl bg-white/5 text-white placeholder-gray-400 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
            />
            <Link 
              to="/signup"
              className="relative overflow-hidden px-8 py-4 rounded-xl font-semibold text-white bg-accent hover:bg-accent-hover transition-all hover:scale-105 whitespace-nowrap group"
            >
              <span className="relative z-10">Get Early Access →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Link>
          </div>
          <p className="text-sm mt-4 text-gray-500">
            Join 12,500+ waitlist members. Free forever for early adopters.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { val: "15,247", label: "Sponsoring Employers" },
            { val: "43,000+", label: "Active Job Listings" },
            { val: "89%", label: "Interview Success Rate" },
            { val: "3", label: "Countries Covered" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-bold font-display bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                {stat.val}
              </div>
              <div className="text-sm mt-1 text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
