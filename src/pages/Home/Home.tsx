import { Header, Loading, ErrorMessage, MovieGrid } from '@/components'
import { usePopularMovies } from '@/hooks'
import './Home.css'

export function Home() {
  const { data, isLoading, isError, refetch } = usePopularMovies()

  return (
    <div className="home">
      <Header title="Pop Movies" />

      <main className="home__content">
        {isLoading && <Loading text="Loading movies..." fullscreen />}

        {isError && (
          <ErrorMessage
            title="Failed to load movies"
            message="We couldn't fetch the popular movies. Please check your connection and try again."
            onRetry={() => refetch()}
            fullscreen
          />
        )}

        {data && <MovieGrid movies={data.results} />}
      </main>
    </div>
  )
}
