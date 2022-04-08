import { authExchange } from '@urql/exchange-auth'
import { cacheExchange, createClient, dedupExchange, fetchExchange } from 'urql'
import { authConfig } from '@/libs/urql-exchange-auth'

export const urqlClient = createClient({
  url: 'http://localhost:8000/graphql',
  suspense: false,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange(authConfig),
    fetchExchange,
  ],
})
