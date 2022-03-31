import { createClient, Exchange } from 'urql'
import { empty, fromPromise, map, mergeMap, pipe } from 'wonka'
import { auth } from '@/libs/firebase'

const headerExchange: Exchange =
  ({ forward }) =>
  operations$ =>
    pipe(
      operations$,
      mergeMap(operation => {
        const currentUser = auth.currentUser
        if (!currentUser) {
          return pipe(
            empty,
            map(() => operation)
          )
        }
        return pipe(
          fromPromise(currentUser.getIdToken()),
          map(authToken => {
            console.log('authToken: ', authToken)
            if (!operation.context.fetchOptions) {
              operation.context.fetchOptions = {}
            }
            Object.assign(operation.context.fetchOptions, {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
              },
            })
            return operation
          })
        )
      }),
      forward
    )

export const urqlClient = createClient({
  url: 'http://localhost:8000/graphql',
  suspense: false,
  exchanges: [headerExchange],
})
