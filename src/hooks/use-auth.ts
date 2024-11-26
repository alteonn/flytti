import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: any) => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            console.error('Login error:', error.message);
            return false;
          }

          set({ isAuthenticated: true, user: data.user });
          return true;
        } catch (error) {
          console.error('Unexpected login error:', error);
          return false;
        }
      },
      logout: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          
          if (error) {
            console.error('Logout error:', error.message);
          }

          set({ isAuthenticated: false, user: null });
        } catch (error) {
          console.error('Unexpected logout error:', error);
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: localStorage,
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);