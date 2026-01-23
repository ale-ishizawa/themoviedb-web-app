import { getYouTubeUrl } from '@/utils'
import type { Video } from '@/types'
import './TrailerList.css'

interface TrailerListProps {
  trailers: Video[]
}

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M9 7L15 11L9 15V7Z" fill="currentColor"/>
  </svg>
)

export function TrailerList({ trailers }: TrailerListProps) {
  const handlePlayTrailer = (videoKey: string) => {
    window.open(getYouTubeUrl(videoKey), '_blank', 'noopener,noreferrer')
  }

  if (trailers.length === 0) {
    return (
      <div className="trailer-list">
        <h3 className="trailer-list__title">Trailers</h3>
        <p className="trailer-list__empty">No trailers available</p>
      </div>
    )
  }

  return (
    <div className="trailer-list">
      <h3 className="trailer-list__title">Trailers</h3>
      <div className="trailer-list__items">
        {trailers.map((trailer, index) => (
          <button
            key={trailer.id}
            className="trailer-list__item"
            onClick={() => handlePlayTrailer(trailer.key)}
            aria-label={`Play ${trailer.name}`}
          >
            <div className="trailer-list__play-icon" aria-hidden="true">
              <PlayIcon />
            </div>
            <div className="trailer-list__info">
              <p className="trailer-list__name">
                {trailer.name || `Play trailer ${index + 1}`}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
