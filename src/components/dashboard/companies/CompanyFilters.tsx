import React from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../../lib/utils';

export interface FilterState {
  search: string;
  industries: string[];
  location: string;
  routes: string[];
}

interface CompanyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export default function CompanyFilters({ filters, onFilterChange, className }: CompanyFiltersProps) {
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleIndustryToggle = (industry: string) => {
    const newIndustries = filters.industries.includes(industry)
      ? filters.industries.filter(i => i !== industry)
      : [...filters.industries, industry];
    onFilterChange({ ...filters, industries: newIndustries });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleRouteToggle = (route: string) => {
    const newRoutes = filters.routes.includes(route)
      ? filters.routes.filter(r => r !== route)
      : [...filters.routes, route];
    onFilterChange({ ...filters, routes: newRoutes });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      industries: [],
      location: '',
      routes: []
    });
  };

  return (
    <div className={cn("space-y-8", className)}>
      {/* Search */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Company name..." 
            className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      {/* Industry */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
          Industry
        </label>
        <div className="space-y-2">
          {['Technology', 'Finance', 'Healthcare', 'Consulting', 'Engineering', 'Education'].map((ind) => (
            <label key={ind} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.industries.includes(ind)}
                  onChange={() => handleIndustryToggle(ind)}
                  className="peer sr-only" 
                />
                <div className="w-4 h-4 border border-gray-600 rounded bg-surface peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{ind}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
          Location
        </label>
        <select 
          value={filters.location}
          onChange={handleLocationChange}
          className="w-full bg-surface border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
        >
          <option value="">Any Location</option>
          <option value="London">London</option>
          <option value="Manchester">Manchester</option>
          <option value="Birmingham">Birmingham</option>
          <option value="Cambridge">Cambridge</option>
          <option value="Bristol">Bristol</option>
          <option value="Edinburgh">Edinburgh</option>
        </select>
      </div>

      {/* Visa Route */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 block">
          Visa Route
        </label>
        <div className="space-y-2">
          {['Skilled Worker', 'Global Business Mobility', 'Scale-up', 'Graduate Route'].map((route) => (
            <label key={route} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative flex items-center">
                <input 
                  type="checkbox" 
                  checked={filters.routes.includes(route)}
                  onChange={() => handleRouteToggle(route)}
                  className="peer sr-only" 
                />
                <div className="w-4 h-4 border border-gray-600 rounded bg-surface peer-checked:bg-secondary peer-checked:border-secondary transition-all"></div>
                <svg className="absolute w-3 h-3 text-background opacity-0 peer-checked:opacity-100 left-0.5 top-0.5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{route}</span>
            </label>
          ))}
        </div>
      </div>

      <button 
        onClick={clearFilters}
        className="w-full py-2.5 rounded-lg border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
      >
        <X className="w-4 h-4" />
        Clear Filters
      </button>
    </div>
  );
}
