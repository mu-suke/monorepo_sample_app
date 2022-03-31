import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Auth {
  @Field()
  userId: string
}

@ObjectType()
export class AuthTest {
  @Field()
  message: string

  constructor(message: string) {
    this.message = message
  }
}
