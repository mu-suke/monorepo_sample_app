import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class HealthCheck {
  @Field()
  message: string

  constructor(message: string) {
    this.message = message
  }
}
