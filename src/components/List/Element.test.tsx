import React from 'react'
import { render, screen } from '@testing-library/react'
import Element from './Element'

test('renders element', () => {
  render(<Element<string>
    index={0}
    renderItem={(item: string) => <div>{item}</div>}
    item={'0'}
    rowHeight={50}
    overscan={1}
    scrollPos={0}
    beforeHeight={0}
    listHeight={0}
  />)
  const first = screen.getByText(/^0$/i)
  expect(first).toBeInTheDocument()
})

test('doesnt renders element', () => {
  render(<Element<string>
    index={0}
    renderItem={(item: string) => <div>{item}</div>}
    item={'0'}
    rowHeight={50}
    overscan={1}
    scrollPos={100}
    beforeHeight={0}
    listHeight={0}
  />)
  const first = screen.queryByText(/^0$/i)
  expect(first).not.toBeInTheDocument()
})
