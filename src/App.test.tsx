import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders learn react app', () => {
  render(<App />)
  const text = screen.getByText(/virtualized list/i)
  expect(text).toBeInTheDocument()
})
