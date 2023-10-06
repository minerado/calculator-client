import { Box, CircularProgress, Typography } from '@mui/material'

import Calculator from '../../components/calculator'
import RecordsTable from '../../components/records-table'
import Page from '../../templates/page'

import useCurrentUser from '../../hooks/use-current-user'

const Home = () => {
  const { data: userData, isFetching: isLoadingUser } = useCurrentUser()

  return (
    <Page>
      <Box sx={{ display: 'grid', gap: 4, margin: '32px auto 0', width: 800 }}>
        <Box>
          <Typography variant="h5">Time To Calculate!</Typography>

          <Typography>
            Your Balance:{' '}
            {isLoadingUser ? (
              <Box component="span">
                Calculating... <CircularProgress size={10} />
              </Box>
            ) : (
              userData?.data?.user.balance
            )}
          </Typography>
        </Box>

        <Calculator />

        <RecordsTable />
      </Box>
    </Page>
  )
}

export default Home
