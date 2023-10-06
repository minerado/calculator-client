import { login } from '../api/session-service'

import { useMutation } from 'react-query'

export const useLogin = (opts = {}) => useMutation(login, opts)
