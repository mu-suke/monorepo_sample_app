import { Button, Checkbox, Input, Link, Stack } from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormRow from '@/components/forms/FormRow'
import { LoginParams } from '@/presentationals/login/types/LoginParams'

const LoginForm: React.VFC<{ apiLogin: (params: LoginParams) => void }> = ({
  apiLogin,
}) => {
  const validations = yup.object().shape({
    email: yup
      .string()
      .email('メールアドレスの形式に沿って入力してください')
      .required('メールアドレスを入力してください'),
    password: yup.string().required('パスワードを入力してください'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>({
    resolver: yupResolver(validations),
  })

  return (
    <form
      onSubmit={handleSubmit((params: LoginParams) => {
        apiLogin(params)
      })}
    >
      <FormRow id={'email'} label={'Email address'} errors={errors}>
        <Input {...register('email')} />
      </FormRow>
      <FormRow id={'password'} label={'Password'} errors={errors}>
        <Input {...register('password')} type="password" />
      </FormRow>
      <Stack spacing={10}>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          align={'start'}
          justify={'space-between'}
        >
          <Checkbox>Remember me</Checkbox>
          <Link color={'blue.400'}>Forgot password?</Link>
        </Stack>
        <Button
          type={'submit'}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Sign in
        </Button>
      </Stack>
    </form>
  )
}

export default LoginForm
