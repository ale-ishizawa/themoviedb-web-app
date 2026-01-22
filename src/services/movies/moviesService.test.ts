import { describe, it, expect, vi, beforeEach } from 'vitest'
import { moviesService } from './moviesService'
import { apiClient } from '@/services/api/client'
import type { Movie, MovieDetails, Video, PaginatedResponse, VideosResponse } from '@/types'

// Mock the apiClient
vi.mock('@/services/api/client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}))

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  original_title: 'Test Movie',
  overview: 'A test movie description',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-01-15',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  genre_ids: [28, 12],
  original_language: 'en',
  video: false,
}

const mockMovieDetails: MovieDetails = {
  ...mockMovie,
  budget: 100000000,
  genres: [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
  ],
  homepage: 'https://example.com',
  imdb_id: 'tt1234567',
  production_companies: [],
  production_countries: [],
  revenue: 500000000,
  runtime: 120,
  spoken_languages: [],
  status: 'Released',
  tagline: 'A test tagline',
}

const mockVideo: Video = {
  id: 'video1',
  iso_639_1: 'en',
  iso_3166_1: 'US',
  key: 'abc123',
  name: 'Official Trailer',
  site: 'YouTube',
  size: 1080,
  type: 'Trailer',
  official: true,
  published_at: '2024-01-01T00:00:00.000Z',
}

describe('moviesService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getPopularMovies', () => {
    it('should fetch popular movies with default params', async () => {
      const mockResponse: PaginatedResponse<Movie> = {
        page: 1,
        results: [mockMovie],
        total_pages: 10,
        total_results: 100,
      }

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse })

      const result = await moviesService.getPopularMovies()

      expect(apiClient.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 1, language: 'en-US' },
      })
      expect(result).toEqual(mockResponse)
    })

    it('should fetch popular movies with custom page', async () => {
      const mockResponse: PaginatedResponse<Movie> = {
        page: 2,
        results: [mockMovie],
        total_pages: 10,
        total_results: 100,
      }

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse })

      const result = await moviesService.getPopularMovies({ page: 2 })

      expect(apiClient.get).toHaveBeenCalledWith('/movie/popular', {
        params: { page: 2, language: 'en-US' },
      })
      expect(result.page).toBe(2)
    })
  })

  describe('getMovieDetails', () => {
    it('should fetch movie details by id', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockMovieDetails })

      const result = await moviesService.getMovieDetails(1)

      expect(apiClient.get).toHaveBeenCalledWith('/movie/1', {
        params: { language: 'en-US' },
      })
      expect(result).toEqual(mockMovieDetails)
    })
  })

  describe('getMovieVideos', () => {
    it('should fetch all videos for a movie', async () => {
      const mockResponse: VideosResponse = {
        id: 1,
        results: [mockVideo],
      }

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse })

      const result = await moviesService.getMovieVideos(1)

      expect(apiClient.get).toHaveBeenCalledWith('/movie/1/videos', {
        params: { language: 'en-US' },
      })
      expect(result).toEqual([mockVideo])
    })
  })

  describe('getMovieTrailers', () => {
    it('should return only YouTube trailers', async () => {
      const mockVideos: Video[] = [
        mockVideo,
        { ...mockVideo, id: 'video2', type: 'Teaser', name: 'Teaser' },
        { ...mockVideo, id: 'video3', type: 'Trailer', site: 'Vimeo', name: 'Vimeo Trailer' },
      ]

      const mockResponse: VideosResponse = {
        id: 1,
        results: mockVideos,
      }

      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockResponse })

      const result = await moviesService.getMovieTrailers(1)

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Official Trailer')
    })
  })
})
