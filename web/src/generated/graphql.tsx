import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type Query = {
  __typename?: 'Query'
  findAll: Array<Maybe<Todo>>
  findOneById: Todo
}

export type QueryFindOneByIdArgs = {
  id: Scalars['ID']
}

export type Todo = {
  __typename?: 'Todo'
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  status: TodoStatus
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
  New = 'NEW',
}

export type TodoQueryVariables = Exact<{ [key: string]: never }>

export type TodoQuery = {
  __typename?: 'Query'
  findAll: Array<{
    __typename?: 'Todo'
    id: string
    title: string
    description?: string | null
  } | null>
}

export const TodoDocument = gql`
  query Todo {
    findAll {
      id
      title
      description
    }
  }
`

/**
 * __useTodoQuery__
 *
 * To run a query within a React component, call `useTodoQuery` and pass it any options that fit your needs.
 * When your component renders, `useTodoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTodoQuery({
 *   variables: {
 *   },
 * });
 */
export function useTodoQuery(
  baseOptions?: Apollo.QueryHookOptions<TodoQuery, TodoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options)
}
export function useTodoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TodoQuery, TodoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<TodoQuery, TodoQueryVariables>(
    TodoDocument,
    options
  )
}
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>
export type TodoQueryResult = Apollo.QueryResult<TodoQuery, TodoQueryVariables>
