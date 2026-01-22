import { useQuery } from '@tanstack/react-query'
import { moviesService } from '@/services'
import { QUERY_KEYS } from '@/utils/constants'

export function useMovieDetails(movieId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.DETAILS(movieId),
    queryFn: () => moviesService.getMovieDetails(movieId),
    enabled: !!movieId,
  })
}
