import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MoreHorizontal, ExternalLink } from 'lucide-react';
import { cn } from '../../../lib/utils';

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  date: string;
  logo?: string;
}

interface ApplicationCardProps {
  app: Application;
  viewMode: 'board' | 'table';
}

const statusColors: Record<string, string> = {
  saved: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  applied: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  interviewing: 'bg-secondary/10 text-secondary border-secondary/20',
  offer: 'bg-green-500/10 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function ApplicationCard({ app, viewMode }: ApplicationCardProps) {
  if (viewMode === 'table') {
    return (
      <tr className="hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center text-white font-bold text-xs border border-white/10">
              {app.company.charAt(0)}
            </div>
            <span className="font-medium text-white">{app.company}</span>
          </div>
        </td>
        <td className="px-6 py-4 text-gray-300">{app.role}</td>
        <td className="px-6 py-4">
          <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", statusColors[app.status])}>
            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
          </span>
        </td>
        <td className="px-6 py-4 text-gray-400 text-sm">{app.date}</td>
        <td className="px-6 py-4 text-right">
          <button className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </td>
      </tr>
    );
  }

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface border border-white/5 rounded-xl p-4 hover:border-primary/30 hover:shadow-lg transition-all group cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center text-white font-bold border border-white/10">
          {app.company.charAt(0)}
        </div>
        <button className="text-gray-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="font-bold text-white mb-1">{app.company}</h4>
      <p className="text-sm text-gray-400 mb-4 truncate">{app.role}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{new Date(app.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' })}</span>
        </div>
        {app.status === 'interviewing' && (
          <span className="text-secondary animate-pulse">Action needed</span>
        )}
      </div>
    </motion.div>
  );
}
