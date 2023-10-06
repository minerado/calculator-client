import { createRecord } from '../api/record-service'

import { useMutation } from 'react-query'
import { resetQuery } from '../lib/query'

const useCreateRecord = (opts = {}) =>
  useMutation(createRecord, {
    onSuccess: (...args) => {
      resetQuery(['records'])

      opts?.onSuccess?.(...args)
    },
  })

export default useCreateRecord
