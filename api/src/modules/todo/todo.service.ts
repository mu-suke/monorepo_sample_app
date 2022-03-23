import { Injectable, NotFoundException } from '@nestjs/common'
import { Todo, TodoStatus } from './models/todo.models'
import { TodoRepository } from './todo.repository'

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}
  // findAllのみの実装なので一時的に残す
  private todos: Todo[] = [
    {
      title: 'title is here',
      description: 'description is here',
      id: 'a',
      createdAt: new Date(),
      updatedAt: new Date(),
      status: TodoStatus.NEW,
    },
  ]

  // 全件取得のメソッド
  async findAll() {
    return await this.todoRepository.findAll()
  }
  // idを元に一件取得のメソッド
  findOneById(id: string): Todo {
    const result = this.todos.find((todo) => id === todo.id)
    if (!result) {
      // なかったら404エラーを返す。ビルトインのエラーも豊富にあってエラー処理も結構楽
      // https://docs.nestjs.com/exception-filters#built-in-http-exceptions
      throw new NotFoundException()
    }
    return result
  }
}
