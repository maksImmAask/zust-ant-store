import { create } from 'zustand';

type Category = {
  slug: string;
  name: string;
  url: string;
};

type CategoryState = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};

type ProductState = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));