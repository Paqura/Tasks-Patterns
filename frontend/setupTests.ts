import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, beforeAll, vi } from 'vitest'

afterEach(() => {
    cleanup()
})

beforeAll(() => {
    vi.mock('next/router', () => require('next-router-mock'))
})
