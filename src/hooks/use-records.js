import { useQuery } from 'react-query'

import { listRecords } from '../api/record-service'

const useRecords = (params = {}, opts = {}) =>
  useQuery(['records', params], () => listRecords(params), opts)

export default useRecords
