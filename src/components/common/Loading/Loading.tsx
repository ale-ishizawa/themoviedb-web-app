import './Loading.css'

interface LoadingProps {
  text?: string
  fullscreen?: boolean
}

export function Loading({ text = 'Loading...', fullscreen = false }: LoadingProps) {
  return (
    <div 
      className={`loading ${fullscreen ? 'loading--fullscreen' : ''}`}
      role="status"
      aria-live="polite"
    >
      <div className="loading__spinner" aria-hidden="true" />
      <span className="loading__text">{text}</span>
    </div>
  )
}
