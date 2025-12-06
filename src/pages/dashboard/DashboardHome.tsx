import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, FileText, TrendingUp, Building2 } from 'lucide-react';

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-400">Here's what's happening with your job search today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: AI Matches */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-white/5 rounded-xl p-6 hover:border-primary/30 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-primary/10 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded">Monthly</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">3</div>
          <div className="text-sm text-gray-400 mb-4">Matches Unlocked</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
            <div className="bg-primary h-1.5 rounded-full w-[60%]"></div>
          </div>
          <p className="text-xs text-gray-500">3 of 5 free matches used</p>
        </motion.div>

        {/* Card 2: Applications */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-white/5 rounded-xl p-6 hover:border-secondary/30 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-secondary/10 rounded-lg text-secondary group-hover:bg-secondary group-hover:text-background transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded">+2 this week</span>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12</div>
          <div className="text-sm text-gray-400 mb-4">Total Applications</div>
          <div className="flex gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">2 Applied</span>
            <span className="px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">1 Interview</span>
          </div>
        </motion.div>

        {/* Card 3: CV Score */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-accent/10 rounded-lg text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Needs Work</span>
          </div>
          <div className="flex items-end gap-2 mb-1">
            <div className="text-3xl font-bold text-white">72</div>
            <div className="text-sm text-gray-400 mb-1">/ 100</div>
          </div>
          <div className="text-sm text-gray-400 mb-4">CV Optimization Score</div>
          <Link to="/dashboard/cv-optimizer" className="text-xs font-semibold text-accent hover:text-accent-hover flex items-center gap-1">
            Improve Score <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Card 4: Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-surface to-white/5 border border-white/5 rounded-xl p-6 flex flex-col justify-center gap-3"
        >
          <h3 className="font-semibold text-white mb-1">Quick Actions</h3>
          <Link to="/dashboard/companies" className="flex items-center justify-between px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-colors">
            Search Companies <Search className="w-4 h-4" />
          </Link>
          <Link to="/dashboard/applications" className="flex items-center justify-between px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors">
            Add Application <FileText className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-surface border border-white/5 rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          <button className="text-sm text-secondary hover:text-emerald-400">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-gray-400">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Activity</th>
                <th className="px-6 py-3 font-medium">Details</th>
                <th className="px-6 py-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-gray-400">Today, 10:23 AM</td>
                <td className="px-6 py-4 text-white font-medium">Unlocked Company</td>
                <td className="px-6 py-4 text-gray-300">Deloitte UK</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-400/10 text-green-400">
                    Success
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-gray-400">Yesterday</td>
                <td className="px-6 py-4 text-white font-medium">Application Added</td>
                <td className="px-6 py-4 text-gray-300">Software Engineer at Revolut</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400">
                    Applied
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-gray-400">Dec 3, 2024</td>
                <td className="px-6 py-4 text-white font-medium">CV Optimized</td>
                <td className="px-6 py-4 text-gray-300">Score improved 72 → 78</td>
                <td className="px-6 py-4 text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-400/10 text-purple-400">
                    Completed
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
