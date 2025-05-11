
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'renter' | 'companion';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  interests?: string[];
  hourlyRate?: number;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (userData: Partial<User>) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (userData) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
      logout: () => set({ user: null }),
    }),
    {
      name: 'user-store',
    }
  )
);
