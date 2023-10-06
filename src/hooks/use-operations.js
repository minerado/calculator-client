import { useQuery } from 'react-query'

import { listOperations } from '../api/operation-service'

const useOperations = (opts = {}) => useQuery(['operations'], () => listOperations(), opts)

export default useOperations
