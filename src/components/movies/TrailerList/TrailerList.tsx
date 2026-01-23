import { getYouTubeUrl } from '@/utils'
import type { Video } from '@/types'
import './TrailerList.css'

interface TrailerListProps {
  trailers: Video[]
}

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
              ▶
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
