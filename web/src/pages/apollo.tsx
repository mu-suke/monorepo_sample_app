import { gql } from '@apollo/client'
import { ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
import Layout from '@/components/layout'
import client from '@/utils/apollo-client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Apollo: NextPage<{ countries: any }> = ({ countries }) => {
  return (
    <>
      <Layout containerVariant={'lg'}>
        <Text>Apollo Page</Text>
        <UnorderedList>
          {countries &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            countries.map((country: any, index: number) => (
              <ListItem key={index}>
                {country.code} - {country.emoji}
              </ListItem>
            ))}
        </UnorderedList>
      </Layout>
    </>
  )
}

export default Apollo

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  })

  return {
    props: {
      countries: data.countries.slice(0, 4),
    },
  }
}
