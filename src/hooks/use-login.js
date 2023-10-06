import { useMutation } from 'react-query'

import { login } from '../api/session-service'

export const useLogin = (opts = {}) => useMutation(login, opts)
