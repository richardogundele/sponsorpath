import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0F1623]/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl group-hover:rotate-180 transition-transform duration-700">
                <span className="group-hover:-rotate-180 transition-transform duration-700">S</span>
              </div>
              <span className="text-xl font-bold font-display text-white">SponsorPath</span>
            </Link>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How It Works', 'Success Stories'].map((item, i) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <Link 
                to="/signup" 
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-primary hover:bg-primary-dark transition-all hover:scale-105 shadow-[0_0_20px_rgba(26,66,255,0.3)]"
              >
                Get Early Access
              </Link>
            </motion.div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[#0F1623] border-b border-white/10"
        >
          <div className="px-6 py-4 space-y-4">
            <a href="#features" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">Features</a>
            <a href="#how-it-works" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">How It Works</a>
            <a href="#success-stories" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white">Success Stories</a>
            <Link to="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center bg-primary text-white py-3 rounded-lg font-medium">
              Get Early Access
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
