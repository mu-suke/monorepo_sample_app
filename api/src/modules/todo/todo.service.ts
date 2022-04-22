import { Injectable } from '@nestjs/common'
import {
  NewTodoInput,
  TodoOutput,
  TodosInput,
  TodoStatus,
} from './models/todo.models'
import { TodoRepository } from './todo.repository'

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  // 全件取得のメソッド
  async findAll(todosInput: TodosInput) {
    const todosRaw = await this.todoRepository.findAll()
    return todosRaw.slice(todosInput.offset, todosInput.limit)
  }

  async create(data: NewTodoInput) {
    const todo: TodoOutput = {
      ...data,
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return await this.todoRepository.create(todo)
  }
}
