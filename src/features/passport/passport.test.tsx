import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { STORAGE_KEY } from './constants'

function seed(stamps: unknown) { localStorage.setItem(STORAGE_KEY, JSON.stringify(stamps)) }

beforeEach(()=> localStorage.clear())

describe('Stamp Rally', () => {
  it('add flow adds card and updates summary', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /add stamp/i }))
    await user.type(screen.getByLabelText(/place name/i), 'Kyoto')
    // default color red, status stamped
    await user.click(screen.getByRole('button', { name: /^add stamp$/i }))
    expect(await screen.findByText('Kyoto')).toBeInTheDocument()
    expect(screen.getByTestId('summary-bar')).toHaveTextContent('1')
  })

  it('empty place name blocked with error', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /add stamp/i }))
    await user.click(screen.getByRole('button', { name: /^add stamp$/i }))
    expect(await screen.findByRole('alert')).toHaveTextContent(/place name/i)
    expect(screen.queryByTestId('stamp-card')).not.toBeInTheDocument()
  })

  it('summary counts mix', async () => {
    seed([
      { id:'1', placeName:'Paris', status:'stamped', dateVisited:'2024-01-01', color:'red', memory:'', initials:'PA', tiltDeg:2, createdAt:new Date().toISOString() },
      { id:'2', placeName:'Tokyo', status:'dream', dateVisited:null, color:'blue', memory:'', initials:'TO', tiltDeg:-1, createdAt:new Date().toISOString() },
      { id:'3', placeName:'Rome', status:'stamped', dateVisited:'2024-02-01', color:'green', memory:'', initials:'RO', tiltDeg:0, createdAt:new Date().toISOString() },
    ])
    render(<App />)
    const bar = screen.getByTestId('summary-bar')
    expect(bar).toHaveTextContent('2')
    // stamped 2, dreaming 1
    expect(bar.textContent).toMatch(/2.*Stamped/)
    expect(bar.textContent).toMatch(/1.*Dreaming/)
  })

  it('delete requires confirmation', async () => {
    const user = userEvent.setup()
    seed([{ id:'1', placeName:'Paris', status:'stamped', dateVisited:'2024-01-01', color:'red', memory:'', initials:'PA', tiltDeg:2, createdAt:new Date().toISOString() }])
    render(<App />)
    expect(screen.getByText('Paris')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /delete paris/i }))
    expect(screen.getByText('Paris')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /confirm delete/i }))
    expect(screen.queryByText('Paris')).not.toBeInTheDocument()
  })

  it('persistence rehydrates from localStorage', async () => {
    seed([{ id:'1', placeName:'Berlin', status:'stamped', dateVisited:'2023-05-01', color:'purple', memory:'great', initials:'BE', tiltDeg:1, createdAt:new Date().toISOString() }])
    render(<App />)
    expect(await screen.findByText('Berlin')).toBeInTheDocument()
  })

  it('malformed localStorage shows empty state not crash', async () => {
    localStorage.setItem(STORAGE_KEY, 'not-json{{{')
    render(<App />)
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })

  it('dream -> stamped conversion', async () => {
    const user = userEvent.setup()
    seed([{ id:'1', placeName:'Iceland', status:'dream', dateVisited:null, color:'gold', memory:'', initials:'IC', tiltDeg:0, createdAt:new Date().toISOString() }])
    render(<App />)
    await user.click(screen.getByRole('button', { name: /mark as visited/i }))
    expect(await screen.findByText('Iceland')).toBeInTheDocument()
    expect(screen.getAllByText('Stamped').length).toBeGreaterThanOrEqual(1)
    expect(screen.queryByRole('button', { name: /mark as visited/i })).not.toBeInTheDocument()
    expect(screen.getByTestId('summary-bar')).toHaveTextContent('1')
  })

  it('writes to localStorage on add', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /add stamp/i }))
    await user.type(screen.getByLabelText(/place name/i), 'Lisbon')
    await user.click(screen.getByRole('button', { name: /^add stamp$/i }))
    await screen.findByText('Lisbon')
    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).toBeTruthy()
    expect(JSON.parse(raw!)[0].placeName).toBe('Lisbon')
  })
})
