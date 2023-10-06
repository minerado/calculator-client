import { useMutation } from 'react-query'

import { updateRecord } from '../api/record-service'
import { resetQuery } from '../lib/query'

const useUpdateRecord = (opts = {}) =>
  useMutation(updateRecord, {
    ...opts,
    onSuccess: (...args) => {
      resetQuery(['records'])

      opts?.onSuccess?.(...args)
    },
  })

export default useUpdateRecord
