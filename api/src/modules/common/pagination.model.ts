import { Type } from '@nestjs/common'
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string

  @Field()
  hasNextPage: boolean
}

export type Edge<T> = {
  cursor: string | null
  node: T
}

type IPaginatedType<T> = {
  pageInfo: PageInfo
  edges: Edge<T>[]
}

@InputType()
export class PaginatedInput {
  @Field(() => Int, { defaultValue: 10 })
  first: number

  @Field({ nullable: true })
  after?: string
}

/**
 * 受け取った型をnodeの型に指定
 * @see https://docs.nestjs.com/graphql/resolvers#generics
 */
export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field({ nullable: true })
    cursor: string

    @Field(() => classRef)
    node: T
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field()
    pageInfo: PageInfo

    @Field(() => [EdgeType], { nullable: 'items' })
    edges: EdgeType[]
  }
  return PaginatedType as Type<IPaginatedType<T>>
}

export const createPaginatedData = <T>(
  first: number,
  paginatedData: T[],
  cursorField: keyof T
) => {
  const hasNextPage = paginatedData.length > first
  let endCursor: string | undefined
  let endCursorType: string

  if (hasNextPage) {
    // 1件多く取得しているので配列末尾のユーザーを削除する
    const lastData = paginatedData.pop()
    if (lastData) {
      const endCursorObject = lastData[cursorField]
      if (endCursorObject instanceof Date) {
        endCursor = endCursorObject.toISOString()
        endCursorType = 'Date'
      }
    }
  }

  const pageInfo: PageInfo = {
    endCursor: endCursor,
    hasNextPage: hasNextPage,
  }

  const edges = paginatedData.map(data => {
    const cursorObject = data[cursorField]
    if (endCursorType === 'Date' && cursorObject instanceof Date) {
      return { cursor: cursorObject.toISOString(), node: data }
    } else {
      return { cursor: null, node: data }
    }
  })

  return { pageInfo, edges }
}
