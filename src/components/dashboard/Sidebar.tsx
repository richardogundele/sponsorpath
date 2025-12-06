import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  FileEdit, 
  Settings, 
  LogOut, 
  HelpCircle,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useUser } from '../../context/UserContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { profile } = useUser();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Find Companies', path: '/dashboard/companies' },
    { icon: FileText, label: 'My Applications', path: '/dashboard/applications' },
    { icon: FileEdit, label: 'CV Optimizer', path: '/dashboard/cv-optimizer' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  // Calculate usage percentage for progress bar
  const usagePercent = profile ? (profile.matchesUsed / profile.matchesLimit) * 100 : 0;
  const isAtLimit = profile ? profile.matchesUsed >= profile.matchesLimit : false;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-[#0F1623] border-r border-white/5 transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-display font-bold text-white text-lg">SponsorPath</span>
          </Link>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-white font-medium border border-white/10">
              {profile?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-white truncate">{profile?.fullName || 'Guest'}</div>
              <div className="text-xs text-gray-400">{profile?.subscriptionTier} Plan</div>
            </div>
          </div>
          
          {/* Usage Meter */}
          <div className="bg-surface rounded-lg p-3 border border-white/5">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Matches Used</span>
              <span className={cn(isAtLimit ? "text-red-400" : "text-white")}>
                {profile?.matchesUsed}/{profile?.matchesLimit}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1.5">
              <div 
                className={cn("h-1.5 rounded-full transition-all duration-500", isAtLimit ? "bg-red-500" : "bg-secondary")} 
                style={{ width: `${Math.min(usagePercent, 100)}%` }}
              ></div>
            </div>
            <Link to="/dashboard/settings" className="block w-full mt-3 text-center text-xs font-semibold text-background bg-secondary hover:bg-emerald-400 py-1.5 rounded transition-colors">
              Upgrade Plan
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-500")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-1">
          <Link 
            to="/support" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <HelpCircle className="w-5 h-5 text-gray-500" />
            Help & Support
          </Link>
          <Link 
            to="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </Link>
        </div>
      </aside>
    </>
  );
}
