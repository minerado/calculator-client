import { getGridSingleSelectOperators } from '@mui/x-data-grid'

export const buildRecordTableColumns = ({ getDeleteActions, operations }) =>
  [
    { field: 'id', headerName: 'ID', width: 80 },
    {
      field: 'inserted_at',
      flex: 1,
      headerName: 'Datetime',
      type: 'dateTime',
      width: 90,
    },
    {
      field: 'operation',
      filterOperators: singleSelectFilterOperators,
      filterable: true,
      headerName: 'Operation',
      valueOptions: operations || [],
      type: 'singleSelect',
      width: 120,
    },
    { field: 'cost', headerName: 'Cost', type: 'number' },
    { field: 'result', headerName: 'Result', type: 'number', width: 200 },
    { field: 'user_balance', headerName: 'Balance', type: 'number', width: 70 },
    {
      field: 'actions',
      type: 'actions',
      headerName: '',
      width: 30,
      cellClassName: 'actions',
      getActions: getDeleteActions,
    },
  ]
    .map((row) => (row.filterable ? row : { ...row, filterable: false }))
    .map((row) => (row.sortable ? row : { ...row, sortable: false }))
    .map((row) => (row.hideable ? row : { ...row, hideable: false }))
    .map((row) => (row.manageble ? row : { ...row, manageble: false }))

const singleSelectFilterOperators = getGridSingleSelectOperators().filter(
  (operator) => operator.value === 'is',
)

export const buildRecordTableRows = (records) =>
  records.map((row) => ({
    cost: row.operation.cost,
    id: row.id,
    inserted_at: new Date(row.inserted_at),
    operation: row.operation.type,
    result: row.operation_response.value,
    user_balance: row.user_balance,
  }))
