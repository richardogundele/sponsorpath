import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List, Plus, Search, Filter } from 'lucide-react';
import { cn } from '../../lib/utils';
import ApplicationCard from '../../components/dashboard/applications/ApplicationCard';
import AddApplicationModal from '../../components/dashboard/applications/AddApplicationModal';

// Default data for first-time users
const INITIAL_APPS = [
  { id: '1', company: 'Revolut', role: 'Senior Frontend Engineer', status: 'applied', date: '2024-12-01' },
  { id: '2', company: 'Monzo', role: 'Product Designer', status: 'interviewing', date: '2024-11-28' },
  { id: '3', company: 'Spotify', role: 'Backend Developer', status: 'saved', date: '2024-12-05' },
];

const COLUMNS = [
  { id: 'saved', label: 'Saved', color: 'bg-gray-500' },
  { id: 'applied', label: 'Applied', color: 'bg-blue-500' },
  { id: 'interviewing', label: 'Interviewing', color: 'bg-secondary' },
  { id: 'offer', label: 'Offer', color: 'bg-green-500' },
  { id: 'rejected', label: 'Closed', color: 'bg-red-500' },
];

export default function MyApplications() {
  const [viewMode, setViewMode] = useState<'board' | 'table'>('board');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load applications from localStorage
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('sponsorpath_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });

  // Save applications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('sponsorpath_applications', JSON.stringify(applications));
  }, [applications]);

  const handleAddApplication = (data: any) => {
    const newApp = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      date: data.dateApplied
    };
    setApplications([newApp, ...applications]);
  };

  const filteredApps = applications.filter((app: any) => 
    app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">My Applications</h1>
          <p className="text-sm text-gray-400">Track and manage your job search journey</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search applications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
          
          <div className="flex bg-surface rounded-lg border border-white/10 p-1">
            <button 
              onClick={() => setViewMode('board')}
              className={cn("p-2 rounded-md transition-all", viewMode === 'board' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('table')}
              className={cn("p-2 rounded-md transition-all", viewMode === 'table' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Application</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {viewMode === 'board' ? (
          <div className="h-full overflow-x-auto pb-4">
            <div className="flex gap-6 min-w-[1000px] h-full px-1">
              {COLUMNS.map(col => {
                const colApps = filteredApps.filter((app: any) => app.status === col.id);
                return (
                  <div key={col.id} className="flex-1 min-w-[280px] flex flex-col bg-surface/30 rounded-xl border border-white/5">
                    {/* Column Header */}
                    <div className="p-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0F1623]/95 backdrop-blur-sm z-10 rounded-t-xl">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full", col.color)} />
                        <span className="font-medium text-white text-sm">{col.label}</span>
                      </div>
                      <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                        {colApps.length}
                      </span>
                    </div>
                    
                    {/* Column Content */}
                    <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
                      {colApps.map((app: any) => (
                        <ApplicationCard key={app.id} app={app} viewMode="board" />
                      ))}
                      {colApps.length === 0 && (
                        <div className="text-center py-8 text-gray-600 text-sm border-2 border-dashed border-white/5 rounded-lg">
                          No applications
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-surface border border-white/5 rounded-xl overflow-hidden h-full flex flex-col">
            <div className="overflow-y-auto flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-gray-400 sticky top-0 z-10 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3 font-medium">Company</th>
                    <th className="px-6 py-3 font-medium">Role</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Date Applied</th>
                    <th className="px-6 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredApps.map((app: any) => (
                    <ApplicationCard key={app.id} app={app} viewMode="table" />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <AddApplicationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddApplication} 
      />
    </div>
  );
}
