import { authExchange } from '@urql/exchange-auth'
import { cacheExchange } from '@urql/exchange-graphcache'
import {
  createClient,
  dedupExchange,
  fetchExchange,
  subscriptionExchange,
} from 'urql'
import { authConfig } from '@/libs/urql/urql-auth-config'
import { graphcacheConfig } from '@/libs/urql/urql-graphcache-config'
import { subscriptionConfig } from '@/libs/urql/urql-subscription-config'

export const urqlClient = createClient({
  url: 'http://localhost:8000/graphql',
  suspense: false,
  exchanges: [
    dedupExchange,
    cacheExchange(graphcacheConfig),
    authExchange(authConfig),
    fetchExchange,
    subscriptionExchange(subscriptionConfig),
  ],
})
