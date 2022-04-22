import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewTodoInput, TodoOutput, TodosInput } from './models/todo.models'
import { TodoService } from './todo.service'

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}
  // QueryデコレータでQueryを定義
  // 第一引数にReturnTypeFuncを指定し、型を定義。ここではTodoの配列を指定。
  // 第二引数にオプションとして{ nullable: 'items' }を与えることでから配列を許容する。[Todo]!と同義。
  // デフォルトでは [Todo!]! になる。
  @Query(() => [TodoOutput], { nullable: 'items' })
  findAll(@Args('todos') todos: TodosInput) {
    return this.todoService.findAll(todos)
  }

  @Mutation(() => TodoOutput)
  addTodo(@Args('newTodo') newTodo: NewTodoInput) {
    return this.todoService.create(newTodo)
  }
}
