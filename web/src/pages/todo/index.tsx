import { ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { NextPage } from 'next'
import Layout from '@/components/layout'
import { useTodoQuery } from '@/generated/graphql'

const Todo: NextPage = () => {
  const [result] = useTodoQuery({
    variables: { todos: { offset: 4, limit: 10 } },
  })

  if (result.error) {
    return <Text>Error Occurred</Text>
  }

  if (result.fetching) {
    return <Text>Loading...</Text>
  }

  const todos = result.data?.findAll
  return (
    <>
      <Layout>
        <UnorderedList>
          {todos?.map((todo, index) => {
            return <ListItem key={index}>{todo?.title}</ListItem>
          })}
        </UnorderedList>
      </Layout>
    </>
  )
}

export default Todo
