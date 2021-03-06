import {
  Flex,
  Box,
  Stack,
  Link,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { signInWithEmailAndPassword } from '@firebase/auth'
import { NextPage } from 'next'
import React from 'react'
import { auth } from '@/libs/firebase'
import LoginForm from '@/presentationals/login/LoginForm'
import { LoginParams } from '@/presentationals/login/types/LoginParams'

const Login: NextPage = () => {
  const apiLogin = async (params: LoginParams) => {
    try {
      await signInWithEmailAndPassword(auth, params.email, params.password)
      console.log('success')
    } catch (e) {
      console.log('error: ', e)
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <LoginForm apiLogin={apiLogin} />
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login
