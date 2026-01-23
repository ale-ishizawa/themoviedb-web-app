import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Loading', () => {
  it('should render with default text', () => {
    render(<Loading />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render with custom text', () => {
    render(<Loading text="Fetching movies..." />)
    
    expect(screen.getByText('Fetching movies...')).toBeInTheDocument()
  })

  it('should have correct role for accessibility', () => {
    render(<Loading />)
    
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should apply fullscreen class when fullscreen prop is true', () => {
    const { container } = render(<Loading fullscreen />)
    
    expect(container.querySelector('.loading--fullscreen')).toBeInTheDocument()
  })
})
