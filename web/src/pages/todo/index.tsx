import { Button, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useCallback, useState } from 'react'
import { useClient } from 'urql'
import Layout from '@/components/layout'
import { TodoOutput, TodosDocument, useTodos } from '@/generated/graphql'

const Todo: NextPage = () => {
  const graphqlClient = useClient()
  const [result, executeQuery] = useTodos({
    variables: { first: 3, after: null },
  })

  const refetch = useCallback(() => {
    executeQuery({ requestPolicy: 'network-only' })
  }, [executeQuery])

  const [fetchingMore, setFetchingMore] = useState<boolean>(false)

  const pageInfo = result.data?.todos.pageInfo
  const todos = result.data?.todos.edges.map(edge => edge?.node) as TodoOutput[]

  const fetchMore = useCallback(() => {
    if (!result.data || !pageInfo?.endCursor) {
      return
    }
    setFetchingMore(true)

    graphqlClient
      .query(TodosDocument, { first: 2, after: pageInfo.endCursor })
      .toPromise()
      .then(todo => {
        console.log({ todo })
        setFetchingMore(false)
      })
  }, [graphqlClient, result, setFetchingMore, pageInfo?.endCursor])

  if (result.error) {
    return <Text>Error Occurred</Text>
  }

  if (result.fetching) {
    return <Text>Loading...</Text>
  }

  return (
    <>
      <Layout>
        <UnorderedList>
          {todos?.map((todo, index) => {
            return <ListItem key={index}>{todo?.title}</ListItem>
          })}
        </UnorderedList>
        <Button onClick={refetch}>Refetch</Button>
        <Button
          disabled={!pageInfo?.hasNextPage}
          onClick={fetchMore}
          isLoading={fetchingMore}
        >
          Fetch more
        </Button>
      </Layout>
    </>
  )
}

export default Todo
