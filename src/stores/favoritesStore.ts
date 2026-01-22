import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/utils/constants'

interface FavoritesState {
  favorites: number[]
  addFavorite: (movieId: number) => void
  removeFavorite: (movieId: number) => void
  toggleFavorite: (movieId: number) => void
  isFavorite: (movieId: number) => boolean
  clearFavorites: () => void
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (movieId: number) => {
        set((state) => {
          if (state.favorites.includes(movieId)) {
            return state
          }
          return { favorites: [...state.favorites, movieId] }
        })
      },

      removeFavorite: (movieId: number) => {
        set((state) => ({
          favorites: state.favorites.filter((id) => id !== movieId),
        }))
      },

      toggleFavorite: (movieId: number) => {
        const { favorites, addFavorite, removeFavorite } = get()
        if (favorites.includes(movieId)) {
          removeFavorite(movieId)
        } else {
          addFavorite(movieId)
        }
      },

      isFavorite: (movieId: number) => {
        return get().favorites.includes(movieId)
      },

      clearFavorites: () => {
        set({ favorites: [] })
      },
    }),
    {
      name: STORAGE_KEYS.FAVORITES,
    }
  )
)
