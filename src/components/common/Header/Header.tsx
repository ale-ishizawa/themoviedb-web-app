import { useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  showMenuButton?: boolean
}

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
            <span className="header__back-icon">←</span>
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
