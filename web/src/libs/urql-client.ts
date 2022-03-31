import { createClient } from 'urql'

export const urqlClient = createClient({
  url: 'http://localhost:8000/graphql',
  suspense: false,
})