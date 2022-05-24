import { Injectable } from '@nestjs/common'
import { NewTodoInput, TodoOutput, TodoStatus } from './model/todo.model'
import { TodoRepository } from './todo.repository'
import { createPaginatedData } from '@/modules/common/pagination.model'
import { PaginatedTodosInput } from '@/modules/todo/model/todo.model'

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {}

  // 全件取得のメソッド
  async paginatedTodos(paginatedTodosInput: PaginatedTodosInput) {
    const { first, after } = paginatedTodosInput

    const fetchTodos = async () => {
      const firstForHasNext = first + 1
      if (!after) {
        return await this.repo.findTodos(firstForHasNext)
      }

      const convertedCursor = new Date(after)
      return await this.repo.findPaginatedTodos(
        firstForHasNext,
        convertedCursor
      )
    }

    const todos = await fetchTodos()

    return createPaginatedData(first, todos, 'createdAt')
  }

  async create(data: NewTodoInput) {
    const todo: TodoOutput = {
      ...data,
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return await this.repo.create(todo)
  }
}
