import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useFavorites } from './useFavorites'
import { useFavoritesStore } from '@/stores'

describe('useFavorites', () => {
  beforeEach(() => {
    // Reset store before each test
    useFavoritesStore.setState({ favorites: [] })
  })

  it('should return initial empty favorites', () => {
    const { result } = renderHook(() => useFavorites())

    expect(result.current.favorites).toEqual([])
    expect(result.current.favoritesCount).toBe(0)
  })

  it('should add favorite correctly', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(123)
    })

    expect(result.current.favorites).toContain(123)
    expect(result.current.favoritesCount).toBe(1)
  })

  it('should check if movie is favorite', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(123)
    })

    expect(result.current.isFavorite(123)).toBe(true)
    expect(result.current.isFavorite(456)).toBe(false)
  })

  it('should toggle favorite correctly', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.toggleFavorite(123)
    })
    expect(result.current.isFavorite(123)).toBe(true)

    act(() => {
      result.current.toggleFavorite(123)
    })
    expect(result.current.isFavorite(123)).toBe(false)
  })

  it('should remove favorite correctly', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(123)
      result.current.addFavorite(456)
      result.current.removeFavorite(123)
    })

    expect(result.current.isFavorite(123)).toBe(false)
    expect(result.current.isFavorite(456)).toBe(true)
    expect(result.current.favoritesCount).toBe(1)
  })

  it('should clear all favorites', () => {
    const { result } = renderHook(() => useFavorites())

    act(() => {
      result.current.addFavorite(1)
      result.current.addFavorite(2)
      result.current.addFavorite(3)
      result.current.clearFavorites()
    })

    expect(result.current.favorites).toEqual([])
    expect(result.current.favoritesCount).toBe(0)
  })
})
