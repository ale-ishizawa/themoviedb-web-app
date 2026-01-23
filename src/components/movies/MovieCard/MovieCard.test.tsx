import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { MovieCard } from './MovieCard'
import type { Movie } from '@/types'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockMovie: Movie = {
  id: 123,
  title: 'Test Movie',
  original_title: 'Test Movie',
  overview: 'A test movie description',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  release_date: '2024-07-15',
  vote_average: 8.5,
  vote_count: 1000,
  popularity: 100,
  adult: false,
  genre_ids: [28, 12],
  original_language: 'en',
  video: false,
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('MovieCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render movie title', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('should render movie year', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('should render movie rating', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText('8.5')).toBeInTheDocument()
  })

  it('should render movie poster', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    const poster = screen.getByAltText('Test Movie poster')
    expect(poster).toBeInTheDocument()
    expect(poster).toHaveAttribute('src', expect.stringContaining('/test-poster.jpg'))
  })

  it('should render placeholder when poster_path is null', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null }
    renderWithRouter(<MovieCard movie={movieWithoutPoster} />)
    
    expect(screen.getByText('🎬')).toBeInTheDocument()
  })

  it('should navigate to movie details on click', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    const card = screen.getByRole('button', { name: /view details for test movie/i })
    fireEvent.click(card)
    
    expect(mockNavigate).toHaveBeenCalledWith('/movie/123')
  })

  it('should navigate on Enter key press', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    const card = screen.getByRole('button', { name: /view details for test movie/i })
    fireEvent.keyDown(card, { key: 'Enter' })
    
    expect(mockNavigate).toHaveBeenCalledWith('/movie/123')
  })

  it('should have correct aria-label', () => {
    renderWithRouter(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByRole('button', { name: /view details for test movie/i })).toBeInTheDocument()
  })
})
