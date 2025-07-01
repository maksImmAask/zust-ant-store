import { create } from 'zustand'
import api from '@api/api'
import type { Product } from '../types'

type ProductState = {
  products: Product[]
  loading: boolean
  getProducts: () => Promise<void>
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  getProducts: async () => {
    set({ loading: true })
    try {
      const res = await api.get('?limit=0')
      const data = res.data as { products: Product[] }
      set({ products: data.products })
    } finally {
      set({ loading: false })
    }
  },
}))