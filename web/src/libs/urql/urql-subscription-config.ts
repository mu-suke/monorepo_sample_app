import { SubscriptionExchangeOpts } from '@urql/core/dist/types/exchanges/subscription'
import { createClient as createWSClient } from 'graphql-ws'

const isSSR = typeof window === 'undefined'

const wsClient = !isSSR
  ? createWSClient({
      url: 'ws://localhost:8000/graphql',
    })
  : undefined

export const subscriptionConfig: SubscriptionExchangeOpts = {
  forwardSubscription: operation => ({
    subscribe: sink => ({
      unsubscribe: () => {
        if (wsClient) {
          return wsClient.subscribe(operation, sink)
        }
      },
    }),
  }),
}
