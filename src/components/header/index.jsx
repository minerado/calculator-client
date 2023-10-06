import { Box, Button, Typography } from '@mui/material'
import { removeToken } from '../../lib/auth'

const Header = () => {
  return (
    <Box sx={{ borderBottom: '1px solid #444', height: 72 }}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'space-between',
          margin: 'auto',
          width: 720,
        }}
      >
        <Box>
          <Typography>Calculator</Typography>
        </Box>

        <Box>
          <Button
            onClick={() => {
              removeToken()

              window.location.reload()
            }}
          >
            Sign Out
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
