import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react'
import { FavoriteButton } from './FavoriteButton'
import { useFavoritesStore } from '@/stores'

describe('FavoriteButton', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] })
  })

  it('should render with "Add to Favorite" text when not favorited', () => {
    render(<FavoriteButton movieId={123} movieTitle="Test Movie" />)
    
    expect(screen.getByText('Add to Favorite')).toBeInTheDocument()
  })

  it('should render with "Remove from Favorites" text when favorited', () => {
    useFavoritesStore.setState({ favorites: [123] })
    
    render(<FavoriteButton movieId={123} movieTitle="Test Movie" />)
    
    expect(screen.getByText('Remove from Favorites')).toBeInTheDocument()
  })

  it('should toggle favorite when clicked', () => {
    render(<FavoriteButton movieId={123} movieTitle="Test Movie" />)
    
    const button = screen.getByRole('button')
    
    act(() => {
      fireEvent.click(button)
    })
    
    expect(screen.getByText('Remove from Favorites')).toBeInTheDocument()
    
    act(() => {
      fireEvent.click(button)
    })
    
    expect(screen.getByText('Add to Favorite')).toBeInTheDocument()
  })

  it('should have correct aria-label when not favorited', () => {
    render(<FavoriteButton movieId={123} movieTitle="Test Movie" />)
    
    expect(screen.getByRole('button', { name: /add test movie to favorites/i })).toBeInTheDocument()
  })

  it('should have correct aria-label when favorited', () => {
    useFavoritesStore.setState({ favorites: [123] })
    
    render(<FavoriteButton movieId={123} movieTitle="Test Movie" />)
    
    expect(screen.getByRole('button', { name: /remove test movie from favorites/i })).toBeInTheDocument()
  })

  it('should have aria-pressed attribute', () => {
    render(<FavoriteButton movieId={123} movieTitle="Test Movie" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'false')
    
    act(() => {
      fireEvent.click(button)
    })
    
    expect(button).toHaveAttribute('aria-pressed', 'true')
  })
})
