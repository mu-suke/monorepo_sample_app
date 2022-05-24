import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  NewTodoInput,
  PaginatedTodosOutput,
  TodoOutput,
} from './model/todo.model'
import { TodoService } from './todo.service'

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => PaginatedTodosOutput)
  todos(
    @Args('first', { type: () => Int, defaultValue: 10 }) first: number,
    @Args('after', { nullable: true }) after: string
  ): Promise<PaginatedTodosOutput> {
    const args = { first, after }
    return this.todoService.paginatedTodos(args)
  }

  @Mutation(() => TodoOutput)
  addTodo(@Args('newTodo') newTodo: NewTodoInput) {
    return this.todoService.create(newTodo)
  }
}
