import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { Todo } from './models/todo.models'

@Injectable()
export class TodoRepository {
  async findAll() {
    const todos: Todo[] = await admin
      .firestore()
      .collection('todos')
      .get()
      .then((result) =>
        result.docs.map((todo) => {
          return {
            id: todo.id,
            title: todo.data().title,
            description: todo.data().description,
            createdAt: todo.data().createdAt.toDate(),
            updatedAt: todo.data().updatedAt.toDate(),
            status: todo.data().status,
          }
        }),
      )
    return todos
  }
}
