import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 bg-[#0F1623] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <span className="font-semibold font-display text-white text-lg">SponsorPath</span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          
          <div className="text-sm text-gray-500">
            © 2025 SponsorPath. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
