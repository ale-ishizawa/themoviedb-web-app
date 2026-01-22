import { apiClient } from '@/services/api/client'
import { ENDPOINTS } from '@/utils/constants'
import type { 
  Movie, 
  MovieDetails, 
  Video, 
  PaginatedResponse, 
  VideosResponse 
} from '@/types'

export interface GetPopularMoviesParams {
  page?: number
  language?: string
}

export const moviesService = {
  /**
   * Get a list of movies ordered by popularity
   */
  getPopularMovies: async (params: GetPopularMoviesParams = {}): Promise<PaginatedResponse<Movie>> => {
    const { page = 1, language = 'en-US' } = params
    
    const response = await apiClient.get<PaginatedResponse<Movie>>(ENDPOINTS.MOVIES.POPULAR, {
      params: {
        page,
        language,
      },
    })
    
    return response.data
  },

  /**
   * Get detailed information about a specific movie
   */
  getMovieDetails: async (movieId: number, language = 'en-US'): Promise<MovieDetails> => {
    const response = await apiClient.get<MovieDetails>(ENDPOINTS.MOVIES.DETAILS(movieId), {
      params: {
        language,
      },
    })
    
    return response.data
  },

  /**
   * Get videos (trailers, teasers, etc.) for a specific movie
   */
  getMovieVideos: async (movieId: number, language = 'en-US'): Promise<Video[]> => {
    const response = await apiClient.get<VideosResponse>(ENDPOINTS.MOVIES.VIDEOS(movieId), {
      params: {
        language,
      },
    })
    
    return response.data.results
  },

  /**
   * Get only trailers for a specific movie
   */
  getMovieTrailers: async (movieId: number, language = 'en-US'): Promise<Video[]> => {
    const videos = await moviesService.getMovieVideos(movieId, language)
    
    return videos.filter(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    )
  },
}
