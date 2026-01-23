import { useParams } from 'react-router-dom'
import { Header, Loading, ErrorMessage, FavoriteButton, TrailerList } from '@/components'
import { useMovieDetails, useMovieTrailers } from '@/hooks'
import { getPosterUrl, formatRuntime, getYearFromDate, formatRating } from '@/utils'
import './MovieDetail.css'

export function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const movieId = Number(id)

  const { 
    data: movie, 
    isLoading: isLoadingMovie, 
    isError: isMovieError,
    refetch: refetchMovie 
  } = useMovieDetails(movieId)

  const { 
    data: trailers = [], 
    isLoading: isLoadingTrailers 
  } = useMovieTrailers(movieId)

  const isLoading = isLoadingMovie || isLoadingTrailers

  if (isLoading) {
    return (
      <div className="movie-detail">
        <Header title="Movie details" showBackButton />
        <Loading text="Loading movie details..." fullscreen />
      </div>
    )
  }

  if (isMovieError || !movie) {
    return (
      <div className="movie-detail">
        <Header title="Movie details" showBackButton />
        <ErrorMessage
          title="Failed to load movie"
          message="We couldn't fetch the movie details. Please try again."
          onRetry={() => refetchMovie()}
          fullscreen
        />
      </div>
    )
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'LARGE')
  const year = getYearFromDate(movie.release_date)
  const runtime = formatRuntime(movie.runtime)
  const rating = formatRating(movie.vote_average)

  return (
    <div className="movie-detail">
      <Header title="Movie details" showBackButton />

      <div className="movie-detail__title-bar">
        <h1 className="movie-detail__title-bar-text">{movie.title}</h1>
      </div>

      <main className="movie-detail__content">
        <div className="movie-detail__hero">
          <div className="movie-detail__poster-container">
            {posterUrl ? (
              <img
                className="movie-detail__poster"
                src={posterUrl}
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="movie-detail__poster-placeholder" aria-hidden="true">
                🎬
              </div>
            )}
          </div>

          <div className="movie-detail__info">
            <div className="movie-detail__meta">
              <span className="movie-detail__year">{year}</span>
              <span className="movie-detail__runtime">🕐 {runtime}</span>
            </div>

            <div className="movie-detail__rating">
              <span className="movie-detail__rating-icon">★</span>
              <span>{rating}</span>
            </div>

            <div className="movie-detail__favorite">
              <FavoriteButton movieId={movie.id} movieTitle={movie.title} />
            </div>

            {movie.overview && (
              <>
                <h2 className="movie-detail__overview-title">Overview</h2>
                <p className="movie-detail__overview">{movie.overview}</p>
              </>
            )}

            {movie.genres && movie.genres.length > 0 && (
              <div className="movie-detail__genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="movie-detail__genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="movie-detail__trailers">
          <TrailerList trailers={trailers} />
        </div>
      </main>
    </div>
  )
}
