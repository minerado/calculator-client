import { listOperations } from '../api/operation-service'

import { useQuery } from 'react-query'

const useOperations = (opts = {}) => useQuery(['operations'], () => listOperations(), opts)

export default useOperations
