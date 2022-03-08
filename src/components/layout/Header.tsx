import { Box, Container, Link } from '@chakra-ui/react'
import React from 'react'

const Header = () => {
  return (
    <Container variant="lg" paddingY="0rem" height="4rem">
      <Box paddingTop="6px">
        <Link href={'/'}>ここにロゴを置く</Link>
      </Box>
    </Container>
  )
}

export default Header
