import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react'
import { NextPage } from 'next'
import ReactMarkdown from 'react-markdown'
import Layout from '@/components/layout'
import { useTodoQuery } from '@/generated/graphql'

const Todo: NextPage = () => {
  const [result] = useTodoQuery()

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
        <Accordion allowMultiple>
          {todos?.map((todo, index) => {
            return (
              <>
                <AccordionItem>
                  <AccordionButton key={index}>
                    <Box flex={'1'} textAlign={'left'}>
                      {todo?.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    <ReactMarkdown>{todo?.description || ''}</ReactMarkdown>
                  </AccordionPanel>
                </AccordionItem>
              </>
            )
          })}
        </Accordion>
      </Layout>
    </>
  )
}

export default Todo
