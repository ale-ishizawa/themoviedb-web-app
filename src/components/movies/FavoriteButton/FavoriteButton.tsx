import { useFavorites } from '@/hooks'
import './FavoriteButton.css'

interface FavoriteButtonProps {
  movieId: number
  movieTitle: string
}

export function FavoriteButton({ movieId, movieTitle }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const favorited = isFavorite(movieId)

  const handleClick = () => {
    toggleFavorite(movieId)
  }

  return (
    <button
      className={`favorite-button ${favorited ? 'favorite-button--favorited' : ''}`}
      onClick={handleClick}
      aria-label={favorited ? `Remove ${movieTitle} from favorites` : `Add ${movieTitle} to favorites`}
      aria-pressed={favorited}
    >
      <span className="favorite-button__icon" aria-hidden="true">
        {favorited ? '❤️' : '🤍'}
      </span>
      <span>{favorited ? 'Remove from Favorites' : 'Add to Favorite'}</span>
    </button>
  )
}
