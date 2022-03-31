import { ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { NextPage } from 'next'
import Layout from '@/components/layout'
import { useTodoQuery } from '@/generated/graphql'

const Todo: NextPage = () => {
  const [result] = useTodoQuery()

  if (!result.data) {
    return <Text>Error Occurred</Text>
  }

  const todos = result.data.findAll
  return (
    <>
      <Layout>
        <UnorderedList>
          {todos.map((todo, index) => {
            return <ListItem key={index}>{todo?.title}</ListItem>
          })}
        </UnorderedList>
      </Layout>
    </>
  )
}

export default Todo
