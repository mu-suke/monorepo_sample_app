import '@/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import type { AppProps } from 'next/app'
import { urqlClient } from '@/utils/urql-client'
import { Provider } from 'urql'

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
