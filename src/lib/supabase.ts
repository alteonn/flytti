import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const supabaseUrl = 'https://armxjjrtphdkqdouibqv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFybXhqanJ0cGhka3Fkb3VpYnF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxMzIxMzAsImV4cCI6MjA0NzcwODEzMH0.wLQsfKUieDGKbrqbzJutXVp21NQRnE6Tg1f5w9AXzhs';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 2
    }
  },
  global: {
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
});