import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useFavoritesStore } from './favoritesStore'

describe('favoritesStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useFavoritesStore.setState({ favorites: [] })
  })

  describe('addFavorite', () => {
    it('should add a movie to favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.addFavorite(1)
      })

      expect(result.current.favorites).toContain(1)
    })

    it('should not add duplicate movie to favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.addFavorite(1)
        result.current.addFavorite(1)
      })

      expect(result.current.favorites).toHaveLength(1)
    })
  })

  describe('removeFavorite', () => {
    it('should remove a movie from favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.addFavorite(1)
        result.current.addFavorite(2)
        result.current.removeFavorite(1)
      })

      expect(result.current.favorites).not.toContain(1)
      expect(result.current.favorites).toContain(2)
    })
  })

  describe('toggleFavorite', () => {
    it('should add movie if not in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.toggleFavorite(1)
      })

      expect(result.current.favorites).toContain(1)
    })

    it('should remove movie if already in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.addFavorite(1)
        result.current.toggleFavorite(1)
      })

      expect(result.current.favorites).not.toContain(1)
    })
  })

  describe('isFavorite', () => {
    it('should return true if movie is in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.addFavorite(1)
      })

      expect(result.current.isFavorite(1)).toBe(true)
    })

    it('should return false if movie is not in favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      expect(result.current.isFavorite(999)).toBe(false)
    })
  })

  describe('clearFavorites', () => {
    it('should clear all favorites', () => {
      const { result } = renderHook(() => useFavoritesStore())

      act(() => {
        result.current.addFavorite(1)
        result.current.addFavorite(2)
        result.current.addFavorite(3)
        result.current.clearFavorites()
      })

      expect(result.current.favorites).toHaveLength(0)
    })
  })
})
