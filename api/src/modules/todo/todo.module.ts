import { Module } from '@nestjs/common'
import { TodoRepository } from './todo.repository'
import { TodoResolver } from './todo.resolver'
import { TodoService } from './todo.service'

@Module({
  imports: [TodoRepository],
  providers: [TodoService, TodoResolver, TodoRepository],
})
export class TodoModule {}
