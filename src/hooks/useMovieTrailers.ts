import { useQuery } from '@tanstack/react-query'
import { moviesService } from '@/services'
import { QUERY_KEYS } from '@/utils/constants'

export function useMovieTrailers(movieId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.MOVIES.VIDEOS(movieId),
    queryFn: () => moviesService.getMovieTrailers(movieId),
    enabled: !!movieId,
  })
}
