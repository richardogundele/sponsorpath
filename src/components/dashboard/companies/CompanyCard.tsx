import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Lock, Unlock, Eye, Plus, CheckCircle } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface Company {
  id: string;
  name: string;
  industry: string;
  location: string;
  routes: string[];
  isLocked: boolean;
  matchScore?: number;
  matchReasons?: string[];
  logo?: string;
}

interface CompanyCardProps {
  company: Company;
  onUnlock: (id: string) => void;
}

export default function CompanyCard({ company, onUnlock }: CompanyCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative group rounded-xl border transition-all duration-300 overflow-hidden",
        company.isLocked 
          ? "bg-surface/50 border-white/5 hover:border-white/10" 
          : "bg-surface border-white/10 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* AI Match Badge */}
      {company.matchScore && (
        <div className="absolute top-4 right-4 z-20">
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold border shadow-lg backdrop-blur-md",
            company.matchScore >= 90 ? "bg-secondary/20 border-secondary text-secondary" :
            company.matchScore >= 70 ? "bg-blue-500/20 border-blue-500 text-blue-400" :
            "bg-yellow-500/20 border-yellow-500 text-yellow-400"
          )}>
            {company.matchScore}% Match
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold text-white shrink-0",
            company.isLocked ? "bg-white/5 blur-[2px]" : "bg-gradient-to-br from-primary to-blue-600"
          )}>
            {company.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-lg font-bold text-white truncate mb-1 transition-all",
              company.isLocked && "blur-[4px] select-none opacity-50"
            )}>
              {company.isLocked ? "Company Name Hidden" : company.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Building2 className="w-3.5 h-3.5" />
              <span className="truncate">{company.industry}</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="w-3.5 h-3.5" />
            <span className={cn(company.isLocked && "blur-[2px]")}>
              {company.location}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.routes.map((route, i) => (
              <span 
                key={i}
                className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-medium bg-white/5 text-gray-400 border border-white/5"
              >
                {route}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        {company.isLocked ? (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex flex-col items-center">
              <Lock className="w-8 h-8 text-white mb-3" />
              <button 
                onClick={() => onUnlock(company.id)}
                className="px-6 py-2 rounded-full bg-white text-background font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                Unlock Details
              </button>
              <p className="text-xs text-white/70 mt-3 font-medium">2 unlocks remaining</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm font-medium">
              <Eye className="w-4 h-4" />
              View
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" />
              Track
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
