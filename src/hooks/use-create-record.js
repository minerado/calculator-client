import { useMutation } from 'react-query'

import { createRecord } from '../api/record-service'
import { resetQuery } from '../lib/query'

const useCreateRecord = (opts = {}) =>
  useMutation(createRecord, {
    ...opts,
    onSuccess: (...args) => {
      resetQuery(['records'])
      resetQuery(['users', 'current'])

      opts?.onSuccess?.(...args)
    },
  })

export default useCreateRecord
