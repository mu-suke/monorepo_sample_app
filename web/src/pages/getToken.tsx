import { Button, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useState } from 'react'
import Layout from '@/components/layout'
import { auth } from '@/libs/firebase'

const GetToken: NextPage = () => {
  const [token, setToken] = useState<string | null>()
  const getToken = () => {
    auth.currentUser
      ?.getIdToken()
      .then(idToken => {
        setToken(idToken)
      })
      .catch(e => {
        console.error('error: ', e)
      })
  }
  const userEmail = auth.currentUser?.email

  if (!token) {
    return (
      <Layout>
        <Text>token is empty</Text>
        <Button onClick={getToken}>更新</Button>
      </Layout>
    )
  }
  return (
    <>
      <Layout>
        <Text>email: {userEmail}</Text>
        <Text>token: {token}</Text>
      </Layout>
    </>
  )
}

export default GetToken
