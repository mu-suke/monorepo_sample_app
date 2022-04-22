import { ArgsType, Field, InputType } from '@nestjs/graphql'

@ArgsType()
@InputType()
export class PaginationArgs {
  @Field({ defaultValue: 0 })
  offset: number

  @Field({ defaultValue: 5 })
  limit: number
}
