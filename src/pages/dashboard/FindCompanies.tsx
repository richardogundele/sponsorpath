import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Sparkles } from 'lucide-react';
import CompanyCard, { Company } from '../../components/dashboard/companies/CompanyCard';
import CompanyFilters, { FilterState } from '../../components/dashboard/companies/CompanyFilters';
import UnlockModal from '../../components/dashboard/companies/UnlockModal';
import { cn } from '../../lib/utils';
import { useUser } from '../../context/UserContext';
import { UK_SPONSORS_SAMPLE } from '../../lib/data/uk_sponsors_sample';

export default function FindCompanies() {
  const { profile, incrementMatchesUsed, addApplication } = useUser();
  const [viewMode, setViewMode] = useState<'all' | 'ai'>('ai');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [unlockModal, setUnlockModal] = useState<{ isOpen: boolean; companyId: string | null }>({ isOpen: false, companyId: null });

  // Filter State
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    industries: [],
    location: '',
    routes: []
  });

  // State for companies
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching and processing data
    const loadData = () => {
      setIsLoading(true);

      // Convert raw UK data to our App's Company interface
      const processedData: Company[] = UK_SPONSORS_SAMPLE.map(sponsor => {
        // --- MATCHING ALGORITHM ---
        let score = 60; // Base score
        const reasons: string[] = [];

        // 1. Industry Match
        if (profile?.industries && profile.industries.length > 0) {
          const isIndustryMatch = profile.industries.some(ind =>
            sponsor.industry?.toLowerCase().includes(ind.toLowerCase())
          );
          if (isIndustryMatch) {
            score += 20;
            reasons.push(`Matches your interest in ${sponsor.industry}`);
          }
        }

        // 2. Location Match
        if (profile?.locations && profile.locations.length > 0) {
          const isLocationMatch = profile.locations.some(loc =>
            sponsor.town.toLowerCase().includes(loc.toLowerCase()) ||
            (loc.toLowerCase() === 'london' && ['croydon', 'dartford', 'epsom'].includes(sponsor.town.toLowerCase()))
          );
          if (isLocationMatch) {
            score += 15;
            reasons.push(`Located in ${sponsor.town}`);
          }
        }

        // 3. Skill Match (Simulated based on industry)
        if (profile?.skills && profile.skills.length > 0) {
          if (score > 70) {
            score += 5;
            reasons.push(`Hiring for ${profile.skills[0]}`);
          }
        }

        // Cap score at 99
        score = Math.min(99, score);

        const isApplied = profile?.applications?.includes(sponsor.id) || false;

        return {
          id: sponsor.id,
          name: sponsor.organisationName,
          industry: sponsor.industry || 'Other',
          location: sponsor.town,
          routes: [sponsor.route],
          isLocked: true && !isApplied, // If applied, it's unlocked by default (in real life)
          matchScore: score,
          matchReasons: reasons,
          hasApplied: isApplied
        };
      });

      setCompanies(processedData);
      setIsLoading(false);
    };

    loadData();
  }, [profile]); // Refetch when profile changes (e.g. apps added)

  // --- FILTERING LOGIC ---
  const displayedCompanies = useMemo(() => {
    let result = [...companies];

    // 1. Apply Search Filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }

    // 2. Apply Industry Filter
    if (filters.industries.length > 0) {
      result = result.filter(c => filters.industries.includes(c.industry));
    }

    // 3. Apply Location Filter
    if (filters.location) {
      result = result.filter(c => c.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    // 4. Apply Route Filter
    if (filters.routes.length > 0) {
      result = result.filter(c => c.routes.some(r => filters.routes.includes(r)));
    }

    // 5. Apply View Mode (AI vs All)
    if (viewMode === 'ai') {
      // Sort by match score descending
      result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    } else {
      // Sort alphabetically
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [companies, filters, viewMode]);

  const handleUnlockClick = (id: string) => {
    setUnlockModal({ isOpen: true, companyId: id });
  };

  const handleApplyClick = (id: string) => {
    // In real app, this would open the external job URL
    if (addApplication) {
      addApplication(id);
      // Optimistic update locally to show checkmark immediately
      setCompanies(prev => prev.map(c => c.id === id ? { ...c, hasApplied: true } : c));
    }
  };

  const confirmUnlock = () => {
    if (unlockModal.companyId) {
      const success = incrementMatchesUsed();
      if (success) {
        setCompanies(prev => prev.map(c =>
          c.id === unlockModal.companyId ? { ...c, isLocked: false } : c
        ));
        setUnlockModal({ isOpen: false, companyId: null });
      } else {
        // Handle limit reached (could show a toast or shake animation)
        alert("You've reached your monthly unlock limit. Upgrade to continue.");
      }
    }
  };

  const targetCompany = companies.find(c => c.id === unlockModal.companyId);
  const remainingUnlocks = profile ? profile.matchesLimit - profile.matchesUsed : 0;

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-100px)]">
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-surface border border-white/10 rounded-xl text-white font-medium"
        >
          <Filter className="w-4 h-4" />
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={cn(
        "lg:w-64 flex-shrink-0 lg:block overflow-y-auto pb-10 custom-scrollbar",
        showMobileFilters ? "block" : "hidden"
      )}>
        <CompanyFilters filters={filters} onFilterChange={setFilters} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Find Your Sponsor</h1>
            <p className="text-sm text-gray-400">
              Showing {displayedCompanies.length} verified sponsors
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewMode('all')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all",
                viewMode === 'all' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
              )}
            >
              All Companies
            </button>
            <button
              onClick={() => setViewMode('ai')}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2",
                viewMode === 'ai' ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-400 hover:text-white"
              )}
            >
              <Sparkles className="w-4 h-4" />
              AI Matches
            </button>
          </div>
        </div>

        {/* AI Context Banner */}
        {viewMode === 'ai' && profile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3"
          >
            <div className="p-2 bg-primary/20 rounded-lg text-primary shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Matches based on your profile</h3>
              <p className="text-xs text-gray-300">
                We found these companies based on your interest in <span className="text-white font-medium">{profile.industries.join(', ') || 'Technology'}</span> and location <span className="text-white font-medium">{profile.locations.join(', ') || 'UK'}</span>.
              </p>
            </div>
          </motion.div>
        )}

        {/* Results Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onUnlock={handleUnlockClick}
                onApply={handleApplyClick}
              />
            ))}
            {displayedCompanies.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-400">
                <p>No companies found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Unlock Modal */}
      <UnlockModal
        isOpen={unlockModal.isOpen}
        onClose={() => setUnlockModal({ isOpen: false, companyId: null })}
        onConfirm={confirmUnlock}
        companyName={targetCompany?.name || ''}
        remainingUnlocks={remainingUnlocks}
      />
    </div>
  );
}
