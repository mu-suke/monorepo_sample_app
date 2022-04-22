import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql'
import { PaginationArgs } from '@/models/pagination/pagination'

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

// ObjectTypeデコレータを使用することで、定義したmodelを元にschemaが自動生成される
@ObjectType()
export class TodoOutput {
  // ここはString型で良いのでReturnTypeFuncを引数に与えない
  @Field()
  title: string

  // nullを許容するためオプションを指定
  // オプションを指定しない限り、nullは許容されない（String!型になる）
  @Field({ nullable: true })
  description: string

  // GraphQLに存在しない型(TodoStatus)を指定する場合は、ReturnTypeFuncを引数に与える
  @Field(() => TodoStatus)
  status: TodoStatus

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
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
