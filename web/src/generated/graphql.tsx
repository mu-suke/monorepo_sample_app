import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Auth = {
  __typename?: 'Auth';
  userId: Scalars['String'];
};

export type HealthCheck = {
  __typename?: 'HealthCheck';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addTodo: TodoOutput;
  login: Auth;
};


export type MutationAddTodoArgs = {
  newTodo: NewTodoInput;
};

export type NewTodoInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAll: Array<Maybe<TodoOutput>>;
  healthCheck: HealthCheck;
};


export type QueryFindAllArgs = {
  todos: TodosInput;
};

export type TodoOutput = {
  __typename?: 'TodoOutput';
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  status: TodoStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
  New = 'NEW'
}

export type TodosInput = {
  limit?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Float']>;
};

export type LoginMutationVariables = Exact<{ [key: string]: never; }>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Auth', userId: string } };

export type HealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthCheckQuery = { __typename?: 'Query', healthCheck: { __typename?: 'HealthCheck', message: string } };

export type TodoQueryVariables = Exact<{
  todos: TodosInput;
}>;


export type TodoQuery = { __typename?: 'Query', findAll: Array<{ __typename?: 'TodoOutput', title: string, description?: string | null } | null> };

export type AddTodoMutationVariables = Exact<{
  newTodo: NewTodoInput;
}>;


export type AddTodoMutation = { __typename?: 'Mutation', addTodo: { __typename?: 'TodoOutput', title: string, description?: string | null } };


export const LoginDocument = gql`
    mutation Login {
  login {
    userId
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const HealthCheckDocument = gql`
    query HealthCheck {
  healthCheck {
    message
  }
}
    `;

export function useHealthCheckQuery(options?: Omit<Urql.UseQueryArgs<HealthCheckQueryVariables>, 'query'>) {
  return Urql.useQuery<HealthCheckQuery>({ query: HealthCheckDocument, ...options });
};
export const TodoDocument = gql`
    query Todo($todos: TodosInput!) {
  findAll(todos: $todos) {
    title
    description
  }
}
    `;

export function useTodoQuery(options: Omit<Urql.UseQueryArgs<TodoQueryVariables>, 'query'>) {
  return Urql.useQuery<TodoQuery>({ query: TodoDocument, ...options });
};
export const AddTodoDocument = gql`
    mutation AddTodo($newTodo: NewTodoInput!) {
  addTodo(newTodo: $newTodo) {
    title
    description
  }
}
    `;

export function useAddTodoMutation() {
  return Urql.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument);
};