import { Box } from '@mui/material'

import Calculator from '../../components/calculator'
import RecordsTable from '../../components/records-table'
import Page from '../../templates/page'

const Home = () => {
  return (
    <Page>
      <Box sx={{ display: 'grid', gap: 4, margin: '32px auto 0', width: 800 }}>
        <Calculator />

        <RecordsTable />
      </Box>
    </Page>
  )
}

export default Home
