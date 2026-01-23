import { useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showMenuButton?: boolean
}

const ArrowLeftIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 14H7M7 14L14 21M7 14L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function Header({ 
  title, 
  showBackButton = false, 
  showMenuButton = true 
}: HeaderProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <header className="header">
      <div className="header__container">
        {showBackButton ? (
          <button 
            className="header__back-button" 
            onClick={handleBack}
            aria-label="Go back"
          >
            <ArrowLeftIcon />
          </button>
        ) : (
          <div /> 
        )}
        
        <h1 className="header__title">{title}</h1>
        
        {showMenuButton ? (
          <button 
            className="header__menu-button"
            aria-label="Open menu"
          >
            ⋮
          </button>
        ) : (
          <div />
        )}
      </div>
    </header>
  )
}
