import { Injectable } from '@nestjs/common'
import { FirebaseService } from '@/libs/firebase/firebase.service'
import { Todo } from '@/modules/todo/models/todo.models'

@Injectable()
export class TodoRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll() {
    const todos: Todo[] = await this.firebaseService
      .firestore()
      .collection('todos')
      .get()
      .then(result =>
        result.docs.map(todo => {
          return {
            id: todo.id,
            title: todo.data().title,
            description: todo.data().description,
            createdAt: todo.data().createdAt.toDate(),
            updatedAt: todo.data().updatedAt.toDate(),
            status: todo.data().status,
          }
        })
      )
    return todos
  }
}
