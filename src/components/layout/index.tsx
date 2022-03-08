import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

const Layout: React.VFC<{
  containerVariant?: 'xs' | 'sm' | 'lg' | 'default'
  children: React.ReactNode
}> = ({ containerVariant = 'default', children }) => {
  return (
    <Box
      // Footerを下部に固定
      minHeight="100vh"
      position="relative"
      // FooterHeight
      paddingBottom="4rem"
    >
      <Header />
      <Container variant={containerVariant}>{children}</Container>
      <Footer />
    </Box>
  )
}

export default Layout
