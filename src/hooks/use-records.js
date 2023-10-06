import { listRecords } from '../api/record-service'

import { useQuery } from 'react-query'

const useRecords = (params = {}, opts = {}) =>
  useQuery(['records', params], () => listRecords(params), opts)

export default useRecords
