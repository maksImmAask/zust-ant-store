import { create } from 'zustand';
import type { Product } from '../types/types';

type FavItem = { product: Product; count: number };
type FavState = {
  favorites: FavItem[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  incrementFav: (productId: number) => void;
  decrementFav: (productId: number) => void;
  getFavCount: (productId: number) => number;
};

export const useFavoritesStore = create<FavState>((set, get) => ({
  favorites: [],
  addFavorite: (product) =>
    set((state) => {
      const exists = state.favorites.find(
        (item) => item.product.id === product.id
      );
      if (exists) return state;
      return { favorites: [...state.favorites, { product, count: 1 }] };
    }),
  removeFavorite: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter(
        (item) => item.product.id !== productId
      ),
    })),
  incrementFav: (productId) =>
    set((state) => ({
      favorites: state.favorites.map((item) =>
        item.product.id === productId
          ? { ...item, count: item.count + 1 }
          : item
      ),
    })),
  decrementFav: (productId) =>
    set((state) => ({
      favorites: state.favorites
        .map((item) =>
          item.product.id === productId
            ? { ...item, count: item.count - 1 }
            : item
        )
        .filter((item) => item.count > 0),
    })),
  getFavCount: (productId) => {
    const item = get().favorites.find(
      (item) => item.product.id === productId
    );
    return item ? item.count : 0;
  },
}));