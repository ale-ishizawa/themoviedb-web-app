import './ErrorMessage.css'

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  fullscreen?: boolean
}

export function ErrorMessage({
  title = 'Oops! Something went wrong',
  message = 'We encountered an error while loading the content. Please try again.',
  onRetry,
  fullscreen = false,
}: ErrorMessageProps) {
  return (
    <div 
      className={`error-message ${fullscreen ? 'error-message--fullscreen' : ''}`}
      role="alert"
    >
      <span className="error-message__icon" aria-hidden="true">⚠️</span>
      <h2 className="error-message__title">{title}</h2>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__button" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  )
}
