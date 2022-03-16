import { useQuery } from '@apollo/client'
import {
  Box,
  CircularProgress,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import Layout from '@/components/layout'
import { TodoDocument, TodoQuery } from '@/generated/graphql'

const CodeGenTest: NextPage = () => {
  const { data } = useQuery<TodoQuery>(TodoDocument)

  if (!data) {
    return (
      <Layout containerVariant={'lg'}>
        <Box display={'flex'} justifyContent={'center'}>
          <CircularProgress isIndeterminate color="teal.500" />
        </Box>
      </Layout>
    )
  }

  const result = data.findAll.map(val => (val ? val : undefined))

  return (
    <>
      <Layout containerVariant={'lg'}>
        <Box>
          <UnorderedList>
            {result.map(val => {
              return (
                <>
                  <ListItem>{val?.id}</ListItem>
                  <ListItem>{val?.title}</ListItem>
                  <ListItem>{val?.description}</ListItem>
                </>
              )
            })}
          </UnorderedList>
        </Box>
      </Layout>
    </>
  )
}

export default CodeGenTest
