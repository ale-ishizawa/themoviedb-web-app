export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  API_TOKEN: import.meta.env.VITE_TMDB_API_TOKEN,
  API_KEY: import.meta.env.VITE_TMDB_API_KEY,
} as const

export const ENDPOINTS = {
  MOVIES: {
    POPULAR: '/movie/popular',
    DETAILS: (id: number) => `/movie/${id}`,
    VIDEOS: (id: number) => `/movie/${id}/videos`,
  },
} as const

export const IMAGE_SIZES = {
  POSTER: {
    SMALL: 'w185',
    MEDIUM: 'w342',
    LARGE: 'w500',
    ORIGINAL: 'original',
  },
  BACKDROP: {
    SMALL: 'w300',
    MEDIUM: 'w780',
    LARGE: 'w1280',
    ORIGINAL: 'original',
  },
} as const

export const ROUTES = {
  HOME: '/',
  MOVIE_DETAILS: '/movie/:id',
} as const

export const STORAGE_KEYS = {
  FAVORITES: 'rt-movies-favorites',
} as const

export const QUERY_KEYS = {
  MOVIES: {
    POPULAR: ['movies', 'popular'] as const,
    DETAILS: (id: number) => ['movies', 'details', id] as const,
    VIDEOS: (id: number) => ['movies', 'videos', id] as const,
  },
} as const
