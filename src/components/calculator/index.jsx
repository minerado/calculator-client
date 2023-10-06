import { useState } from 'react'
import toast from 'react-hot-toast'
import {
  Box,
  Card,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import useCreateRecord from '../../hooks/use-create-record'
import useCurrentUser from '../../hooks/use-current-user'
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

const Calculator = () => {
  const { data: userData } = useCurrentUser()

  const { isLoading: isCreatingRecord, mutate: createRecord } = useCreateRecord({
    onError: (err) => toast.error(err?.response?.data?.message),
  })
  const { data: operationsData, isLoading: isLoadingOperations } = useOperations()

  const operations = operationsData?.data?.operations ?? []

  const [operationId, setOperationId] = useState('')
  const [params, setParams] = useState({ param_1: '', param_2: '' })

  const selectedOperation = operations.find((o) => o.id === operationId)

  const operationParamsCount = OPERATION_PARAMS_MAP[selectedOperation?.type] || 0
  const paramsArray = operationParamsCount ? range(0, operationParamsCount) : []

  const hasBalance = selectedOperation?.cost <= userData?.data?.user.balance

  const buttonLabel = () => {
    if (!selectedOperation) return 'Choose an operation'

    if (!hasBalance) return 'No Funs to Pay for this Operation 😢'

    return `Submit for ${selectedOperation?.cost} money`
  }

  return (
    <Card sx={{ padding: 4 }}>
      {isLoadingOperations ? (
        <Box sx={{ display: 'grid', gap: 2 }}>
          <Skeleton variant="rounded" height={56} />

          <Skeleton variant="rounded" height={42} />
        </Box>
      ) : (
        <FormControl fullWidth sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography>Select the operation</Typography>
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
                  {operation.type} - {operation.cost}
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
            disabled={!selectedOperation || !hasBalance}
            loading={isCreatingRecord}
            onClick={() => createRecord({ operation_id: operationId, operation_params: params })}
            variant="contained"
            size="large"
          >
            {buttonLabel()}
          </LoadingButton>
        </FormControl>
      )}
    </Card>
  )
}

export default Calculator
