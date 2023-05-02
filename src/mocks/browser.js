import { setupWorker } from 'msw'
import { handlers } from './handlers'

// Setup worker for the develop mocking
export const worker = setupWorker(...handlers)