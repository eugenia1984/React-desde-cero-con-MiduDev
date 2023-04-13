import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My App works as espected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareaFrom = app.getByPlaceholderText('Enter text')

  await user.type(textareaFrom, 'Hola mundo')
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 9000 })

  expect(result).toBeTruthy()
})
