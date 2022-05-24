import { Injectable } from '@nestjs/common'
import { FirebaseService } from '@/libs/firebase/firebase.service'
import { TodoOutput, TodoOutputProps } from '@/modules/todo/model/todo.model'
import { FieldPath } from '@/utils/firebase'

const converter = <T>(): FirebaseFirestore.FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirebaseFirestore.QueryDocumentSnapshot<T>) =>
    snap.data(),
})

@Injectable()
export class TodoRepository {
  constructor(private readonly firebase: FirebaseService) {}

  async findTodos(first: number) {
    const snapshot = await this.firebase
      .firestore()
      .collection('todos')
      .orderBy('createdAt' as FieldPath<TodoOutput>, 'desc')
      .limit(first)
      .withConverter(converter<TodoOutputProps>())
      .get()

    return snapshot.docs.map(doc => new TodoOutput(doc.data()))
  }

  async findPaginatedTodos(first: number, after: Date) {
    const snapshot = await this.firebase
      .firestore()
      .collection('todos')
      .orderBy('createdAt' as FieldPath<TodoOutput>, 'desc')
      .startAt(after)
      .withConverter(converter<TodoOutputProps>())
      .get()

    return snapshot.docs.map(doc => new TodoOutput(doc.data()))
  }

  async create(todo: TodoOutput) {
    return this.firebase
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
