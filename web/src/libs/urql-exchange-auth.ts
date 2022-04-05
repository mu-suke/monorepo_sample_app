import { AuthConfig } from '@urql/exchange-auth'
import { makeOperation } from 'urql'
import { getAuthUser } from '@/libs/firebase'

type AuthToken = {
  token: string
}

export const getAuth: AuthConfig<AuthToken>['getAuth'] = async () => {
  try {
    const user = await getAuthUser()
    const token = await user.getIdToken()

    return {
      token,
    }
  } catch {
    return null
  }
}

export const addAuthToOperation: AuthConfig<AuthToken>['addAuthToOperation'] =
  ({ authState, operation }) => {
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

export const didAuthError: AuthConfig<AuthToken>['didAuthError'] = ({
  error,
}) => {
  return error.response.status === 401
}
