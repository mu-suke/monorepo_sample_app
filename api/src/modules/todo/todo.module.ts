import { Module } from '@nestjs/common'
import { TodoRepository } from '@/modules/todo/todo.repository'
import { TodoResolver } from '@/modules/todo/todo.resolver'
import { TodoService } from '@/modules/todo/todo.service'

@Module({
  providers: [TodoService, TodoResolver, TodoRepository],
})
export class TodoModule {}
