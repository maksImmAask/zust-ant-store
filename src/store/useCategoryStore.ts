import { create } from 'zustand'
import api from '@api/api'
import type { Category } from '../types/types'

type CategoryState = {
  categories: Category[]
  loading: boolean
  getCategories: () => Promise<void>
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  loading: false,
  getCategories: async () => {
    set({ loading: true })
    try {
      const {data} = await api.get('/products/categories')
      set({ categories: data as Category[] })
    } finally {
      set({ loading: false })
    }
  },
}))