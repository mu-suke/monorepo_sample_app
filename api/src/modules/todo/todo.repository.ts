import { Injectable } from '@nestjs/common'
import { FirebaseService } from '@/libs/firebase/firebase.service'
import { TodoOutput } from '@/modules/todo/models/todo.models'

@Injectable()
export class TodoRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async findAll() {
    const todos: TodoOutput[] = await this.firebaseService
      .firestore()
      .collection('todos')
      .get()
      .then(result =>
        result.docs.map(todo => {
          return {
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

  async create(todo: TodoOutput) {
    return this.firebaseService
      .firestore()
      .collection('todos')
      .add(todo)
      .then(data => {
        return data.get().then(todo => {
          return {
            title: todo.data()?.title,
            description: todo.data()?.description,
            createdAt: todo.data()?.createdAt.toDate(),
            updatedAt: todo.data()?.updatedAt.toDate(),
            status: todo.data()?.status,
          }
        })
      })
  }
}
