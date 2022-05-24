import { CacheExchangeOpts, Data } from '@urql/exchange-graphcache'
import { relayPagination } from '@urql/exchange-graphcache/extras'
import { PaginatedTodosOutput, TodoOutput } from '@/generated/graphql'

// @see https://relay.dev/graphql/connections.htm
// @see https://formidable.com/open-source/urql/docs/graphcache/local-resolvers/#relay-pagination
export const graphcacheConfig: Partial<CacheExchangeOpts> = {
  resolvers: {
    Query: {
      todos: relayPagination(),
    },
  },
  keys: {
    TodoOutput: (data: Data & TodoOutput) => data.title,
    PaginatedTodosOutput: (data: Data & PaginatedTodosOutput) =>
      data.pageInfo?.endCursor ?? null,
  },
}
