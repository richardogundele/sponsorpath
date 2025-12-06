import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL to prevent crashes with malformed env vars (e.g. 'https://.supabase.co')
const isValidUrl = (url: string | undefined) => {
  try {
    return url && new URL(url) && !url.includes('://.');
  } catch {
    return false;
  }
};

// Export a flag to check if we are in "Demo Mode"
export const isSupabaseConnected = 
  isValidUrl(supabaseUrl) && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'YOUR_API_KEY' && 
  supabaseAnonKey !== 'placeholder';

const finalUrl = isValidUrl(supabaseUrl) ? supabaseUrl : 'https://placeholder.supabase.co';
const finalKey = supabaseAnonKey || 'placeholder';

if (!isSupabaseConnected) {
  console.warn('Supabase not connected. App running in Demo Mode.');
}

export const supabase = createClient(finalUrl, finalKey);
