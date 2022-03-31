import { Injectable } from '@nestjs/common'
import { NewTodo, Todo, TodoStatus } from './models/todo.models'
import { TodoRepository } from './todo.repository'

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  // 全件取得のメソッド
  async findAll() {
    return await this.todoRepository.findAll()
  }

  async create(data: NewTodo) {
    const todo: Todo = {
      ...data,
      status: TodoStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    return await this.todoRepository.create(todo)
  }
}
