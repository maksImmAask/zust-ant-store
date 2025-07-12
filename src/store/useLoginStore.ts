import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: 'female' | 'male';
  image: string;
  accessToken: string | null;
  refreshToken: string;
};

type Credentials = {
  username: string;
  password: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async ({ username, password }) => {
        set({ loading: true, error: null });
        try {
          const res = await api.post<User>('/auth/login', { username, password });
          const data = res.data;

          const user: User = {
            id: data.id,
            username: data.username,
            email: data.email || '',
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
            accessToken: data.accessToken || null, 
            refreshToken: '', 
          };

          set({
            user,
            isAuthenticated: true,
            error: null,
          });
        } finally {
          set({ loading: false });
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null });
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
