import { create } from 'zustand';
import api from '@api/api';
import type { Product } from '../types/types';

type ProductsResponse = {
  products: Product[];
};

type ProductState = {
  products: Product[];
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  getProducts: () => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  search: '',
  setSearch: (value) => set({ search: value }),

  getProducts: async () => {
    set({ loading: true });
    try {
      const { data } = await api.get<ProductsResponse>('/products/?limit=0');
      set({ products: data.products });
    } finally {
      set({ loading: false });
    }
  },
}));
