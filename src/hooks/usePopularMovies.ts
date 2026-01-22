import { useQuery } from '@tanstack/react-query'
import { moviesService } from '@/services'
import { QUERY_KEYS } from '@/utils/constants'
import type { GetPopularMoviesParams } from '@/services/movies/moviesService'

export function usePopularMovies(params: GetPopularMoviesParams = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.MOVIES.POPULAR, params],
    queryFn: () => moviesService.getPopularMovies(params),
  })
}
