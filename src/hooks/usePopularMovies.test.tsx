import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { usePopularMovies } from './usePopularMovies'
import { moviesService } from '@/services'
import type { Movie, PaginatedResponse } from '@/types'

vi.mock('@/services', () => ({
  moviesService: {
    getPopularMovies: vi.fn(),
  },
}))

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  original_title: 'Test Movie',
  overview: 'A test movie',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  release_date: '2024-01-15',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  genre_ids: [28],
  original_language: 'en',
  video: false,
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    )
  }
}

describe('usePopularMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch popular movies successfully', async () => {
    const mockResponse: PaginatedResponse<Movie> = {
      page: 1,
      results: [mockMovie],
      total_pages: 10,
      total_results: 100,
    }

    vi.mocked(moviesService.getPopularMovies).mockResolvedValueOnce(mockResponse)

    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockResponse)
    expect(moviesService.getPopularMovies).toHaveBeenCalledWith({})
  })

  it('should handle error state', async () => {
    vi.mocked(moviesService.getPopularMovies).mockRejectedValueOnce(new Error('API Error'))

    const { result } = renderHook(() => usePopularMovies(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isError).toBe(true)
    })

    expect(result.current.error).toBeDefined()
  })
})
