import { deleteRecord } from '../api/record-service'

import { useMutation } from 'react-query'
import { resetQuery } from '../lib/query'

const useDeleteRecord = (opts = {}) =>
  useMutation(deleteRecord, {
    onSuccess: (...args) => {
      resetQuery(['records'])

      opts?.onSuccess?.(...args)
    },
  })

export default useDeleteRecord
