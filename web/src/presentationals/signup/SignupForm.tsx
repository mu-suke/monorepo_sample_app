import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { InputGroup, InputRightElement } from '@chakra-ui/input'
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import FormRow from '@/components/forms/FormRow'
import { SignupParams } from '@/presentationals/signup/types/signupParams'

const SignupForm: React.VFC<{ apiSignup: (params: SignupParams) => void }> = ({
  apiSignup,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const validations = yup.object().shape({
    email: yup
      .string()
      .email('メールアドレスを正しく入力してください')
      .required('メールアドレスを入力してください'),
    password: yup.string().required('パスワードを入力してください'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupParams>({
    resolver: yupResolver(validations),
  })

  return (
    <>
      <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'} width={'md'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
            <Stack spacing={4}>
              <form
                onSubmit={handleSubmit(async params => {
                  await apiSignup(params)
                })}
              >
                <FormRow id={'email'} label={'Email address'} errors={errors}>
                  <Input type="email" {...register('email')} />
                </FormRow>
                <FormRow id={'password'} label={'Password'} errors={errors}>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      {...register('password')}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword(showPassword => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormRow>
                <Stack spacing={10} pt={2}>
                  <Button
                    type={'submit'}
                    isLoading={isSubmitting}
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Sign up
                  </Button>
                </Stack>
              </form>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default SignupForm
