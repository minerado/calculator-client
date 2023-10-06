import { useMutation } from 'react-query'

import { deleteRecord } from '../api/record-service'
import { resetQuery } from '../lib/query'

const useDeleteRecord = (opts = {}) =>
  useMutation(deleteRecord, {
    ...opts,
    onSuccess: (...args) => {
      resetQuery(['records'])

      opts?.onSuccess?.(...args)
    },
  })

export default useDeleteRecord
