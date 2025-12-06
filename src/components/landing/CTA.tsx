import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, FileCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section id="cta" className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-primary to-[#0A2FE0]">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-secondary blur-[100px] animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent blur-[100px] animate-float-reverse" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white/10 border border-white/20 animate-[bounce_2s_infinite]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-white">Limited early access spots remaining</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-6 text-white">
            Your Visa-Sponsoring Job<br />is Waiting
          </h2>
          
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Join 12,500+ international professionals who stopped applying blind<br className="hidden md:block" />
            and started landing interviews with verified sponsors.
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-5 py-4 rounded-xl text-gray-900 placeholder-gray-500 bg-white focus:ring-2 focus:ring-secondary outline-none"
              />
              <Link 
                to="/signup"
                className="relative overflow-hidden px-8 py-4 rounded-xl font-bold text-white bg-accent hover:scale-105 transition-transform whitespace-nowrap shadow-lg"
              >
                <span className="relative z-10">Get Early Access</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-shimmer" />
              </Link>
            </div>
            <p className="text-sm text-white/70">
              ✓ Free forever for early adopters &nbsp; ✓ No credit card required &nbsp; ✓ Cancel anytime
            </p>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/70">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span>Bank-Level Encryption</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
