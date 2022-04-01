import { AuthConfig, authExchange } from '@urql/exchange-auth'
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  makeOperation,
} from 'urql'
import { getAuthUser } from '@/libs/firebase'

type AuthToken = {
  token: string
}

const getAuth: AuthConfig<AuthToken>['getAuth'] = async () => {
  try {
    const user = await getAuthUser()
    const token = await user.getIdToken()

    if (!token) {
      return null
    }
    return {
      token,
    }
  } catch {
    return null
  }
}

const addAuthToOperation: AuthConfig<AuthToken>['addAuthToOperation'] = ({
  authState,
  operation,
}) => {
  if (!authState || !authState.token) {
    return operation
  }

  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {}

  return makeOperation(operation.kind, operation, {
    ...operation.context,
    fetchOptions: {
      ...fetchOptions,
      headers: {
        ...fetchOptions.headers,
        Authorization: `Bearer ${authState.token}`,
      },
    },
  })
}

const didAuthError: AuthConfig<AuthToken>['didAuthError'] = ({ error }) => {
  console.log('error: ', error)
  return error.response.status === 401
}

export const urqlClient = createClient({
  url: 'http://localhost:8000/graphql',
  suspense: false,
  exchanges: [
    dedupExchange,
    cacheExchange,
    authExchange({
      addAuthToOperation,
      getAuth,
      didAuthError,
    }),
    fetchExchange,
  ],
})
