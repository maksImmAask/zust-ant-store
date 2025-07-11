import { create } from 'zustand'
import api from '@api/api'
import type { Product } from '../types/types'

type ProductState = {
  products: Product[]
  loading: boolean
  search: string
  setSearch: (value: string) => void
  getProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  search: '',
  setSearch: (value) => set({ search: value }),
  getProducts: async () => {
    set({ loading: true })
    try {
      const res = await api.get('/products/?limit=0')
      const data = res.data as { products: Product[] }
      set({ products: data.products })
    } finally {
      set({ loading: false })
    }
  },
}))