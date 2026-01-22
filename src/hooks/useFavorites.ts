import { useFavoritesStore } from '@/stores'

export function useFavorites() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const addFavorite = useFavoritesStore((state) => state.addFavorite)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite)
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites)

  const isFavorite = (movieId: number) => favorites.includes(movieId)

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    favoritesCount: favorites.length,
  }
}
