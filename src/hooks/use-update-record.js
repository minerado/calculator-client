import { updateRecord } from '../api/record-service'

import { useMutation } from 'react-query'
import { resetQuery } from '../lib/query'

const useUpdateRecord = (opts = {}) =>
  useMutation(updateRecord, {
    onSuccess: (...args) => {
      resetQuery(['records'])

      opts?.onSuccess?.(...args)
    },
  })

export default useUpdateRecord
