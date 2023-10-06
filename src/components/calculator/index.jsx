import { useState } from 'react'
import { Box, Card, FormControl, MenuItem, Select, Skeleton, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import useCreateRecord from '../../hooks/use-create-record'
import useOperations from '../../hooks/use-operations'
import { range } from '../../lib/functional'

const OPERATION_PARAMS_MAP = {
  addition: 2,
  subtraction: 2,
  multiplication: 2,
  division: 2,
  square_root: 1,
  random_string: 0,
}

const getOperationParamsCount = (operations, operationId) => {
  if (!operations) return 0

  const operation = operations.find((o) => o.id === operationId)

  return OPERATION_PARAMS_MAP[operation?.type]
}

const Calculator = () => {
  const { isLoading: isCreatingRecord, mutate: createRecord } = useCreateRecord()
  const { data: operationsData, isLoading: isLoadingOperations } = useOperations()

  const operations = operationsData?.data?.operations ?? []

  const [operationId, setOperationId] = useState('')
  const [params, setParams] = useState({ param_1: '', param_2: '' })

  const operationParamsCount = getOperationParamsCount(operations, operationId)
  const paramsArray = operationParamsCount ? range(0, operationParamsCount) : []

  return (
    <Card sx={{ padding: 4 }}>
      {isLoadingOperations ? (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Skeleton variant="rounded" height={56} />

          <Skeleton variant="rounded" height={42} />
        </Box>
      ) : (
        <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {!!operations.length && (
            <Select
              displayEmpty
              onChange={(e) => setOperationId(e.target.value)}
              value={operationId}
            >
              <MenuItem value="">
                <em>Select Operation</em>
              </MenuItem>

              {operations.map((operation) => (
                <MenuItem key={operation.id} value={operation.id}>
                  {operation.type}
                </MenuItem>
              ))}
            </Select>
          )}

          {!!paramsArray.length && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {paramsArray.map((n, index) => (
                <TextField
                  key={n}
                  placeholder={`Param ${index + 1}`}
                  onChange={(e) => setParams({ ...params, [`param_${index + 1}`]: e.target.value })}
                  sx={{ flex: 1 }}
                  type="number"
                />
              ))}
            </Box>
          )}

          <LoadingButton
            size="large"
            onClick={() => createRecord({ operation_id: operationId, operation_params: params })}
            loading={isCreatingRecord}
            variant="contained"
          >
            Submit
          </LoadingButton>
        </FormControl>
      )}
    </Card>
  )
}

export default Calculator
