import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  it('should render with default title and message', () => {
    render(<ErrorMessage />)
    
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument()
    expect(screen.getByText('We encountered an error while loading the content. Please try again.')).toBeInTheDocument()
  })

  it('should render with custom title and message', () => {
    render(
      <ErrorMessage 
        title="Custom Error" 
        message="Custom error message" 
      />
    )
    
    expect(screen.getByText('Custom Error')).toBeInTheDocument()
    expect(screen.getByText('Custom error message')).toBeInTheDocument()
  })

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage onRetry={onRetry} />)
    
    const button = screen.getByRole('button', { name: /try again/i })
    expect(button).toBeInTheDocument()
  })

  it('should not render retry button when onRetry is not provided', () => {
    render(<ErrorMessage />)
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = vi.fn()
    render(<ErrorMessage onRetry={onRetry} />)
    
    fireEvent.click(screen.getByRole('button', { name: /try again/i }))
    
    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it('should have alert role for accessibility', () => {
    render(<ErrorMessage />)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
