import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import * as admin from 'firebase-admin'
import { PaginationArgs } from '@/models/pagination/pagination'
import { Paginated, PaginatedInput } from '@/modules/common/pagination.model'

export enum TodoStatus {
  NEW,
  IN_PROGRESS,
  COMPLETE,
}
// enumを使用する際は registerEnumType でenumを登録しなくてはならない
// https://docs.nestjs.com/graphql/unions-and-enums#enums
registerEnumType(TodoStatus, {
  name: 'TodoStatus',
})

export type TodoOutputProps = {
  title: string
  description: string
  status: number
  createdAt: admin.firestore.Timestamp
  updatedAt: admin.firestore.Timestamp
}

@ObjectType()
export class TodoOutput {
  @Field()
  title: string

  @Field({ nullable: true })
  description: string

  @Field(() => TodoStatus)
  status: TodoStatus

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date

  constructor(props: TodoOutputProps) {
    this.title = props.title
    this.description = props.description
    this.status = props.status
    this.createdAt = props.createdAt.toDate()
    this.updatedAt = props.updatedAt.toDate()
  }
}

@InputType()
export class NewTodoInput {
  @Field()
  title: string

  @Field()
  description: string
}

@InputType()
export class TodosInput extends PaginationArgs {}

@ObjectType()
export class PaginatedTodosInput extends PaginatedInput {}

@ObjectType()
export class PaginatedTodosOutput extends Paginated(TodoOutput) {}
