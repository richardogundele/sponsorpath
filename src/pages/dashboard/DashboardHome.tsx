import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Search, FileText, TrendingUp, Building2, Globe2, Briefcase } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { UK_SPONSORS_SAMPLE } from '../../lib/data/uk_sponsors_sample';

export default function DashboardHome() {
  const { profile } = useUser();

  // --- Calculate Stats ---
  // 1. Total Market (Hardcoded for effect, representing the 139k DB)
  const TOTAL_MARKET_SIZE = 139420;

  // 2. Calculate Matches
  const matchedCount = useMemo(() => {
    if (!profile) return 0;
    return UK_SPONSORS_SAMPLE.filter(sponsor => {
      // Logic mirrors the one in FindCompanies (simplified here for count)
      const industryMatch = profile.industries.some(ind => sponsor.industry?.toLowerCase().includes(ind.toLowerCase()));
      const locationMatch = profile.locations.some(loc => sponsor.town.toLowerCase().includes(loc.toLowerCase()));
      // If no preferences set, show all? No, show 0 to encourage setup.
      if (profile.industries.length === 0 && profile.locations.length === 0) return false;
      return industryMatch || locationMatch;
    }).length;
  }, [profile]);

  // Scale matches to "simulate" the huge database (optional visual trick, or keep real)
  // Let's keep it real to the mock data for now to avoid confusion, or multiply by a factor?
  // User asked for "apply to 10,000 jobs out of all 10,000 complaints". 
  // Let's multiply the matched count by ~100 to simulate the scale of the full DB vs our sample 
  // UNLESS the user wants exact numbers. Let's just use the real matched count from our sample for accuracy first.
  const displayMatchedCount = matchedCount;

  const applicationsCount = profile?.applications?.length || 0;
  const interviewsCount = profile?.interviews || 0;

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
          Welcome back, {profile?.fullName.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-gray-400">Your sponsorship command center.</p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TOTAL MARKET */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-white/5 rounded-xl p-6 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe2 className="w-24 h-24 text-gray-400" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-gray-400 text-sm font-medium uppercase tracking-wider">
              <Globe2 className="w-4 h-4" /> UK Market
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {TOTAL_MARKET_SIZE.toLocaleString()}
            </div>
            <p className="text-sm text-gray-500">Active Sponsorship Licenses</p>
          </div>
        </motion.div>

        {/* YOUR MATCHES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Building2 className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-primary text-sm font-medium uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> Your Matches
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {displayMatchedCount} <span className="text-lg text-gray-500 font-normal">companies</span>
            </div>
            <p className="text-sm text-gray-500">Based on your profile</p>
          </div>
        </motion.div>

        {/* APPLICATIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-white/5 rounded-xl p-6 relative overflow-hidden group hover:border-secondary/30 transition-colors"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Briefcase className="w-24 h-24 text-secondary" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-secondary text-sm font-medium uppercase tracking-wider">
              <Briefcase className="w-4 h-4" /> Applications
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              {applicationsCount}
            </div>
            <p className="text-sm text-gray-500">Sent out this month</p>
          </div>
        </motion.div>
      </div>

      {/* Progress / Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-surface border border-white/5 rounded-xl p-8"
      >
        <h2 className="text-lg font-semibold text-white mb-6">Your Application Pipeline</h2>
        <div className="relative pt-6 pb-2">
          {/* Progress Bar Background */}
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-1000"
              style={{ width: `${Math.min(((applicationsCount * 10) + (interviewsCount * 30)), 100)}%` }}
            ></div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">{matchedCount}</div>
              <div className="text-xs uppercase tracking-wider text-gray-500">Identified</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary mb-1">{applicationsCount}</div>
              <div className="text-xs uppercase tracking-wider text-primary/70">Applied</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary mb-1">{interviewsCount}</div>
              <div className="text-xs uppercase tracking-wider text-secondary/70">Interviews</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent mb-1">0</div>
              <div className="text-xs uppercase tracking-wider text-accent/70">Offers</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions & Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold">Quick Actions</h3>
          <Link to="/dashboard/companies" className="flex items-center justify-between p-4 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary transition-all group">
            <span className="font-medium">Find Sponsors</span>
            <Search className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/dashboard/cv-optimizer" className="flex items-center justify-between p-4 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-xl text-accent transition-all group">
            <span className="font-medium">Optimize CV</span>
            <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent Activity Table */}
        <div className="lg:col-span-2 bg-surface border border-white/5 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  <th className="px-6 py-3 font-medium">Activity</th>
                  <th className="px-6 py-3 font-medium">Company</th>
                  <th className="px-6 py-3 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {profile?.applications.map((appId, i) => {
                  // Mock lookup, in real app we'd search the massive List
                  const company = UK_SPONSORS_SAMPLE.find(c => c.id === appId) || { organisationName: 'Unknown Company' };
                  return (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">Application Sent</td>
                      <td className="px-6 py-4 text-gray-300">{company.organisationName}</td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-400/10 text-blue-400">
                          Applied
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {(!profile?.applications || profile.applications.length === 0) && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      No recent activity. Start applying!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
