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
  userId: Scalars['String'];
};

export type HealthCheck = {
  message: Scalars['String'];
};

export type Mutation = {
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

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
};

export type PaginatedTodosOutput = {
  edges: Array<Maybe<TodoOutputEdge>>;
  pageInfo: PageInfo;
};

export type Query = {
  healthCheck: HealthCheck;
  todos: PaginatedTodosOutput;
};


export type QueryTodosArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type TodoOutput = {
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  status: TodoStatus;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TodoOutputEdge = {
  cursor?: Maybe<Scalars['String']>;
  node: TodoOutput;
};

export enum TodoStatus {
  Complete = 'COMPLETE',
  InProgress = 'IN_PROGRESS',
  New = 'NEW'
}

export type LoginVariables = Exact<{ [key: string]: never; }>;


export type Login = { login: { userId: string } };

export type PaginatedTodos = { edges: Array<{ node: { title: string, description?: string | null, status: TodoStatus, createdAt: any, updatedAt: any } } | null>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } };

export type Todo = { title: string, description?: string | null, status: TodoStatus, createdAt: any, updatedAt: any };

export type HealthCheckVariables = Exact<{ [key: string]: never; }>;


export type HealthCheck = { healthCheck: { message: string } };

export type TodosVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type Todos = { todos: { edges: Array<{ node: { title: string, description?: string | null, status: TodoStatus, createdAt: any, updatedAt: any } } | null>, pageInfo: { endCursor?: string | null, hasNextPage: boolean } } };

export type AddTodoVariables = Exact<{
  newTodo: NewTodoInput;
}>;


export type AddTodo = { addTodo: { title: string, description?: string | null } };

export const Todo = gql`
    fragment todo on TodoOutput {
  title
  description
  status
  createdAt
  updatedAt
}
    `;
export const PaginatedTodos = gql`
    fragment paginatedTodos on PaginatedTodosOutput {
  edges {
    node {
      ...todo
    }
  }
  pageInfo {
    endCursor
    hasNextPage
  }
}
    ${Todo}`;
export const LoginDocument = gql`
    mutation Login {
  login {
    userId
  }
}
    `;

export function useLogin() {
  return Urql.useMutation<Login, LoginVariables>(LoginDocument);
};
export const HealthCheckDocument = gql`
    query HealthCheck {
  healthCheck {
    message
  }
}
    `;

export function useHealthCheck(options?: Omit<Urql.UseQueryArgs<HealthCheckVariables>, 'query'>) {
  return Urql.useQuery<HealthCheck>({ query: HealthCheckDocument, ...options });
};
export const TodosDocument = gql`
    query Todos($first: Int, $after: String) {
  todos(first: $first, after: $after) {
    ...paginatedTodos
  }
}
    ${PaginatedTodos}`;

export function useTodos(options?: Omit<Urql.UseQueryArgs<TodosVariables>, 'query'>) {
  return Urql.useQuery<Todos>({ query: TodosDocument, ...options });
};
export const AddTodoDocument = gql`
    mutation AddTodo($newTodo: NewTodoInput!) {
  addTodo(newTodo: $newTodo) {
    title
    description
  }
}
    `;

export function useAddTodo() {
  return Urql.useMutation<AddTodo, AddTodoVariables>(AddTodoDocument);
};