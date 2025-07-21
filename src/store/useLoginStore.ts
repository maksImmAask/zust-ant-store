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

type RegistrationData = {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: 'male' | 'female';
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: Credentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
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
          const { data } = await api.post<User>('/auth/login', { username, password });

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

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post<User>('/users/add', data);

          const newUser: User = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email || '',
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            gender: response.data.gender || 'male',
            image: response.data.image || '',
            accessToken: null,
            refreshToken: '',
          };

          set({
            user: newUser,
            isAuthenticated: true,
            error: null,
          });
        }  catch (err: unknown) {
          if (typeof err === 'object' && err !== null && 'message' in err) {
            set({ error: String((err as Error).message) });
          } else {
            set({ error: 'Неизвестная ошибка при регистрации' });
          }
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
