import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

afterEach(() => {
    cleanup()

    window.IntersectionObserver = IntersectionObserver
})

beforeAll(() => {
    vi.mock('next/router', () => require('next-router-mock'))

    const mockIntersectionObserver = vi.fn()
    mockIntersectionObserver.mockReturnValue({
        observe: () => null,
        unobserve: () => null,
        disconnect: () => null,
    })
    window.IntersectionObserver = mockIntersectionObserver
})
