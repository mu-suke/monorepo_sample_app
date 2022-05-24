import { NextPage } from 'next'
import Layout from '@/components/layout'
import { useAddTodo } from '@/generated/graphql'
import TodoForm from '@/presentationals/todo/TodoForm'
import { TodoParams } from '@/presentationals/todo/types/todoParams'

const AddTodo: NextPage = () => {
  const [, addTodo] = useAddTodo()
  const apiAddTodo = (params: TodoParams) => {
    addTodo({ newTodo: params }).then(newTodo => {
      console.log('newTodo: ', newTodo)
    })
  }

  return (
    <>
      <Layout>
        <TodoForm apiAddTodo={apiAddTodo} />
      </Layout>
    </>
  )
}
export default AddTodo
