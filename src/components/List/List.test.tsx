import React from 'react'
import { render, screen } from '@testing-library/react'
import List from './List'

const data = Array.from(Array(25).keys(), item => String(item))

test('renders list with elements', () => {
  render(<List<string>
    rowHeight={50}
    data={data}
    keyExtractor={(item) => item}
    renderItem={(item) => <div>{item}</div>}
    overscan={25}
  />)
  const first = screen.getByText(/^0$/i)
  const last = screen.getByText(new RegExp(data[data.length - 1], 'i'))
  
  expect(first).toBeInTheDocument()
  expect(last).toBeInTheDocument()
})

test('List with limited elements', () => {
  render(
    <List<string>
      rowHeight={50}
      data={data}
      keyExtractor={(item) => item}
      renderItem={(item) => <div>{item}</div>}
      overscan={5}
    />
  )
  const last = screen.getByText(/^4$/i)
  expect(last).toBeInTheDocument()
})
