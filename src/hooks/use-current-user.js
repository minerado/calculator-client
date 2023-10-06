import { useQuery } from 'react-query'

import { getCurrentUser } from '../api/user-service'

const useCurrentUser = (opts = {}) => useQuery(['users', 'current'], () => getCurrentUser(), opts)

export default useCurrentUser
