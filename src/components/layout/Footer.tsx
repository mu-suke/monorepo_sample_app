import { Box, Container, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box
      height="4rem"
      // Footerを下部に固定
      width="100%"
      position="absolute"
      bottom="0"
    >
      <Container paddingY="0rem" paddingTop="1rem">
        <Box textAlign="center">
          <Text as="small">© Diverse, Inc.</Text>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
