import Header from '../../components/header'

import { Box } from '@mui/material'

const Page = ({ children }) => {
  return (
    <Box>
      <Header />

      <Box>{children}</Box>
    </Box>
  )
}

export default Page
