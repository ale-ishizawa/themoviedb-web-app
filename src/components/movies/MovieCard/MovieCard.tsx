import { useNavigate } from 'react-router-dom'
import { getPosterUrl, getYearFromDate } from '@/utils'
import type { Movie } from '@/types'
import './MovieCard.css'

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate()
  const posterUrl = getPosterUrl(movie.poster_path, 'MEDIUM')
  const year = getYearFromDate(movie.release_date)

  const handleClick = () => {
    navigate(`/movie/${movie.id}`)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  return (
    <article
      className="movie-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="movie-card__poster-container">
        {posterUrl ? (
          <img
            className="movie-card__poster"
            src={posterUrl}
            alt={`${movie.title} poster`}
            loading="lazy"
          />
        ) : (
          <div className="movie-card__placeholder" aria-hidden="true">
            🎬
          </div>
        )}
      </div>

      <div className="movie-card__rating">
        <span className="movie-card__rating-icon">★</span>
        <span>{movie.vote_average.toFixed(1)}</span>
      </div>

      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{year}</p>
      </div>
    </article>
  )
}
