import { NextPage } from 'next'
import Layout from '@/components/layout'
import { Text } from '@chakra-ui/react'
import { useHealthCheckQuery } from '@/generated/graphql'

const HealthCheck: NextPage = () => {
  // HealthCheck APiの呼び出し
  const [result] = useHealthCheckQuery()

  if (!result.data) {
    return <Text>Error Occurred</Text>
  }

  const message = result.data.healthCheck.message

  return (
    <>
      <Layout containerVariant={'lg'}>
        <Text>{message}</Text>
      </Layout>
    </>
  )
}

export default HealthCheck
