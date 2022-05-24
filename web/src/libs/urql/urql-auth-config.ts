import { IdTokenResult } from '@firebase/auth'
import { AuthConfig } from '@urql/exchange-auth'
import { makeOperation } from 'urql'
import { auth } from '@/libs/firebase'

type AuthState = {
  token: string
  result: IdTokenResult
}

export const authConfig: AuthConfig<AuthState> = {
  getAuth: async () => {
    const tokenResult = await auth.currentUser?.getIdTokenResult()
    return tokenResult
      ? { token: tokenResult.token, result: tokenResult }
      : null
  },
  willAuthError: ({ authState }) => {
    if (authState?.result?.expirationTime) {
      const expirationDate = new Date(authState.result.expirationTime)
      console.log('⚠️ expirationDate: ', expirationDate)
      return expirationDate < new Date()
    }

    return !authState || !authState.token
  },
  addAuthToOperation: ({ authState, operation }) => {
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
          Authorization: 'Bearer ' + authState.token,
        },
      },
    })
  },
}
