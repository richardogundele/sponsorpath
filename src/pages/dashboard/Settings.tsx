import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Bell, LogOut, Loader2, CheckCircle2 } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { cn } from '../../lib/utils';

export default function Settings() {
  const { profile, updateProfile } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'notifications'>('profile');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Local state for form
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || '',
    currentJobTitle: profile?.currentJobTitle || '',
    desiredJobTitle: profile?.desiredJobTitle || '',
    email: profile?.email || 'user@example.com'
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile({
      fullName: formData.fullName,
      currentJobTitle: formData.currentJobTitle,
      desiredJobTitle: formData.desiredJobTitle
    });
    
    setIsLoading(false);
    setSuccessMsg('Profile updated successfully');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleUpgrade = (tier: 'Basic' | 'Pro' | 'Unlimited') => {
    // Simulate upgrade
    updateProfile({ 
      subscriptionTier: tier,
      matchesLimit: tier === 'Basic' ? 15 : tier === 'Pro' ? 50 : 9999
    });
    setActiveTab('subscription');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'subscription', label: 'Subscription', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and subscription.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab.id 
                    ? "bg-surface text-white border border-white/10" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <tab.icon className={cn("w-5 h-5", activeTab === tab.id ? "text-primary" : "text-gray-500")} />
                {tab.label}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors mt-8">
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 bg-surface border border-white/5 rounded-2xl p-6 sm:p-8">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
              
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-2xl border-2 border-surface shadow-xl">
                    {formData.fullName.charAt(0) || 'U'}
                  </div>
                  <button type="button" className="px-4 py-2 rounded-lg border border-white/10 text-sm font-medium text-white hover:bg-white/5 transition-colors">
                    Change Avatar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      className="w-full bg-[#0F1623] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      disabled
                      className="w-full bg-[#0F1623]/50 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Current Job Title</label>
                    <input 
                      type="text" 
                      value={formData.currentJobTitle}
                      onChange={e => setFormData({...formData, currentJobTitle: e.target.value})}
                      className="w-full bg-[#0F1623] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1.5">Desired Job Title</label>
                    <input 
                      type="text" 
                      value={formData.desiredJobTitle}
                      onChange={e => setFormData({...formData, desiredJobTitle: e.target.value})}
                      className="w-full bg-[#0F1623] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                  </button>
                  {successMsg && (
                    <span className="text-green-400 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <CheckCircle2 className="w-4 h-4" /> {successMsg}
                    </span>
                  )}
                </div>
              </form>
            </motion.div>
          )}

          {activeTab === 'subscription' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold text-white mb-6">Subscription Plan</h2>
              
              <div className="bg-[#0F1623] border border-white/10 rounded-xl p-6 mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Current Plan</div>
                    <div className="text-2xl font-bold text-white">{profile?.subscriptionTier} Plan</div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-xs font-bold">ACTIVE</span>
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Company Unlocks</span>
                    <span className="text-white">{profile?.matchesUsed} / {profile?.matchesLimit} used</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5">
                    <div 
                      className="bg-secondary h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${(profile!.matchesUsed / profile!.matchesLimit) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {profile?.subscriptionTier === 'Free' && (
                  <button 
                    onClick={() => handleUpgrade('Pro')}
                    className="w-full py-3 rounded-lg bg-secondary hover:bg-emerald-400 text-background font-bold transition-colors"
                  >
                    Upgrade to Pro
                  </button>
                )}
              </div>
              
              {profile?.subscriptionTier === 'Free' && (
                <div className="grid grid-cols-2 gap-4">
                   <div className="border border-white/10 rounded-xl p-4 hover:border-primary/30 cursor-pointer" onClick={() => handleUpgrade('Basic')}>
                      <h4 className="font-bold text-white">Basic</h4>
                      <p className="text-sm text-gray-400">£5/mo</p>
                      <p className="text-xs text-gray-500 mt-2">15 unlocks/mo</p>
                   </div>
                   <div className="border border-secondary/50 bg-secondary/5 rounded-xl p-4 cursor-pointer" onClick={() => handleUpgrade('Pro')}>
                      <h4 className="font-bold text-white">Pro</h4>
                      <p className="text-sm text-gray-400">£12/mo</p>
                      <p className="text-xs text-gray-500 mt-2">50 unlocks/mo</p>
                   </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-xl font-bold text-white mb-6">Notifications</h2>
              <div className="space-y-4">
                {['Email me new AI matches', 'Email me application reminders', 'Email me product updates'].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-[#0F1623] border border-white/10 rounded-xl">
                    <span className="text-gray-300 text-sm">{item}</span>
                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input type="checkbox" name="toggle" id={`toggle-${i}`} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-primary" defaultChecked={i === 0}/>
                      <label htmlFor={`toggle-${i}`} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-700 cursor-pointer checked:bg-primary"></label>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
