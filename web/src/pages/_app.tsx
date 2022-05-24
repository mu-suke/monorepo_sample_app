import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { Provider } from 'urql'
import { urqlClient } from '@/libs/urql/urql-client'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={urqlClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}
export default MyApp
