import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql'

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
export class Todo {
  // schame上、ID型にしたいため、ReturnTypeFuncを引数に与える
  // ReturnTypeFuncを引数に与えない場合、idの型はString型になる
  @Field(() => ID)
  id: string

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
