import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewTodo, Todo } from './models/todo.models'
import { TodoService } from './todo.service'

// Resolverデコレータでresolverを定義
// https://docs.nestjs.com/graphql/resolvers#code-first-resolver
@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  // QueryデコレータでQueryを定義
  // 第一引数にReturnTypeFuncを指定し、型を定義。ここではTodoの配列を指定。
  // 第二引数にオプションとして{ nullable: 'items' }を与えることでから配列を許容する。[Todo]!と同義。
  // デフォルトでは [Todo!]! になる。
  @Query(() => [Todo], { nullable: 'items' })
  findAll() {
    return this.todoService.findAll()
  }

  @Mutation(() => Todo)
  addTodo(@Args('newTodo') newTodo: NewTodo) {
    return this.todoService.create(newTodo)
  }
}
