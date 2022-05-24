import { Button, Input, Textarea } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormRow from '@/components/forms/FormRow'
import { TodoParams } from '@/presentationals/todo/types/todoParams'

const TodoForm: React.VFC<{ apiAddTodo: (params: TodoParams) => void }> = ({
  apiAddTodo,
}) => {
  const validations = yup.object().shape({
    title: yup.string().required('タイトルを入力してください'),
    description: yup.string().required('説明を入力してください'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TodoParams>({
    resolver: yupResolver(validations),
  })
  return (
    <form
      onSubmit={handleSubmit((params: TodoParams) => {
        apiAddTodo(params)
      })}
    >
      <FormRow id={'title'} label={'タイトル'} errors={errors} isRequired>
        <Input {...register('title')} />
      </FormRow>
      <FormRow id={'description'} label={'説明'} errors={errors} isRequired>
        <Textarea {...register('description')} />
      </FormRow>
      <Button isLoading={isSubmitting} type={'submit'}>
        登録する
      </Button>
    </form>
  )
}

export default TodoForm
