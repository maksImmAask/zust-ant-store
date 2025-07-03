import { create } from 'zustand';
import type { Product } from '../types';

type FavoritesState = {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],
  addFavorite: (product) =>
    set((state) =>
      state.favorites.find((p) => p.id === product.id)
        ? { favorites: state.favorites }
        : { favorites: [...state.favorites, product] }
    ),
  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((p) => p.id !== id),
    })),
}));