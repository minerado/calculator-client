import { useState } from 'react'
import { Box, Card, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import { setToken } from '../../lib/auth'
import { useLogin } from '../../hooks/use-login'

// const useLogin = () => {
//   return (email, password) => {
//     localStorage.setItem('jwt', `${email}-${password}`)

//     window.location.reload()
//   }
// }

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isLoading, mutate: login } = useLogin({
    onSuccess: (res) => {
      setToken(res.data.jwt)

      window.location.reload()
    },
  })

  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Card sx={{ display: 'grid', gap: 2, padding: 2, width: 320 }}>
        <Box sx={{ display: 'grid', gap: 1 }}>
          <Box>
            <Typography variant="h5">Log In</Typography>
          </Box>

          <Box>
            <Typography variant="body1">To start calculating!</Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gap: 3 }}>
          <TextField label="Email..." onChange={(e) => setEmail(e.target.value)} value={email} />

          <TextField
            label="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Box>

        <LoadingButton
          onClick={() => login({ email, password })}
          variant="contained"
          loading={isLoading}
        >
          LogIn
        </LoadingButton>
      </Card>
    </Box>
  )
}

export default Login
