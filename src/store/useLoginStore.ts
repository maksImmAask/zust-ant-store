import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';
import { message } from 'antd';

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

        } catch (err: unknown) {
          console.log(err);
          message.error('Ошибка входа. Проверьте данные и попробуйте снова.');
        }
         finally {
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
          console.log(err || 'Неизвестная ошибка при входе');
          
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
