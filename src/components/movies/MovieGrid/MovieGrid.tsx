import { MovieCard } from '../MovieCard'
import type { Movie } from '@/types'
import './MovieGrid.css'

interface MovieGridProps {
  movies: Movie[]
  emptyMessage?: string
}

export function MovieGrid({ 
  movies, 
  emptyMessage = 'No movies found' 
}: MovieGridProps) {
  if (movies.length === 0) {
    return (
      <div className="movie-grid movie-grid--empty">
        <div className="movie-grid__empty-message">
          <div className="movie-grid__empty-icon" aria-hidden="true">🎬</div>
          <p className="movie-grid__empty-text">{emptyMessage}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
