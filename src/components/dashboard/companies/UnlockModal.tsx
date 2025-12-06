import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Building2, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface UnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  companyName: string;
  remainingUnlocks: number;
  isPro?: boolean;
}

export default function UnlockModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  companyName, 
  remainingUnlocks,
  isPro = false
}: UnlockModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md bg-[#141B2D] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-white">Unlock Company?</h3>
              <p className="text-sm text-gray-400">Reveal full details for {companyName}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="bg-surface border border-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Monthly Allowance</span>
              <span className={cn("text-sm font-bold", remainingUnlocks > 0 ? "text-white" : "text-red-400")}>
                {remainingUnlocks} unlocks remaining
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className={cn("h-2 rounded-full transition-all duration-500", remainingUnlocks > 0 ? "bg-secondary" : "bg-red-500")} 
                style={{ width: `${(remainingUnlocks / 5) * 100}%` }} // Assuming 5 is max for basic
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Unlocking reveals:</h4>
            <ul className="space-y-2">
              {['Full contact details & website', 'Visa routes sponsored', 'Application tracking', 'Hiring manager insights'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-white/5 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors font-medium"
          >
            Cancel
          </button>
          {remainingUnlocks > 0 ? (
            <button 
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 rounded-lg bg-secondary hover:bg-emerald-400 text-background transition-colors font-bold flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              Confirm Unlock
            </button>
          ) : (
            <button 
              className="flex-1 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white transition-colors font-bold"
            >
              Upgrade to Unlock
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
