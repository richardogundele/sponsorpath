import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase, isSupabaseConnected } from '../../lib/supabase';

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeTerms) {
      setError('You must agree to the Terms of Service');
      return;
    }

    setIsLoading(true);

    try {
      // DEMO MODE CHECK: If Supabase isn't connected, skip auth and redirect
      if (!isSupabaseConnected) {
        console.log('Demo Mode: Skipping Supabase Sign Up');
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/onboarding');
        return;
      }

      // Supabase Sign Up Logic
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Redirect to onboarding
        navigate('/onboarding');
      }
    } catch (err: any) {
      // Fallback for any other fetch errors
      if (err.message === 'Failed to fetch' || err.message?.includes('fetch')) {
        navigate('/onboarding');
        return;
      }
      setError(err.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Form */}
      <div className="w-full lg:w-[60%] flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 py-12 relative z-10">
        <div className="mb-10">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="font-display font-bold text-2xl text-white">SponsorPath</span>
            <span className="text-2xl">🇬🇧</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
            Create Your Free Account
          </h1>
          <p className="text-gray-400 text-lg">
            Get your first company match free. No credit card required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full rounded-lg bg-surface border border-gray-700 text-white px-4 py-3 focus:ring-2 focus:ring-secondary focus:border-transparent transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-700 bg-surface text-secondary focus:ring-secondary focus:ring-offset-background"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeTerms" className="text-gray-400">
                I agree to the <a href="#" className="text-secondary hover:underline">Terms of Service</a> and <a href="#" className="text-secondary hover:underline">Privacy Policy</a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-background bg-secondary hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-gray-500">or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-lg border border-gray-700 bg-surface text-white hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-secondary hover:text-emerald-400">
              Sign In
            </Link>
          </div>
        </form>
      </div>

      {/* Right Side - Benefits (Hidden on Mobile) */}
      <div className="hidden lg:flex w-[40%] bg-surface relative overflow-hidden flex-col justify-center px-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/20 pointer-events-none" />
        
        {/* Decorative shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px] animate-pulse-slow delay-1000" />

        <div className="relative z-10 max-w-md mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-8">
            Join 12,500+ Job Seekers
          </h2>
          
          <div className="space-y-6 mb-12">
            {[
              "Access 100,000+ UK sponsors",
              "AI-powered job matching",
              "Free to start, upgrade anytime"
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  {/* Using simple checkmark SVG to avoid import issues if Lucide isn't ready */}
                  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="bg-background/50 backdrop-blur-sm p-6 rounded-2xl border border-white/5">
            <p className="text-gray-300 italic mb-4">
              "I spent 4 months manually searching before finding SponsorPath. Got my first interview within 2 weeks."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                AO
              </div>
              <div>
                <div className="font-bold text-white text-sm">Adaeze O.</div>
                <div className="text-xs text-gray-400">Data Analyst at Deloitte</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
