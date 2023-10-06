import { useCallback, useMemo, useState } from 'react'
import { Card } from '@mui/material'
import { DataGrid, GridActionsCellItem, getGridSingleSelectOperators } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

import useDeleteRecord from '../../hooks/use-delete-record'
import useOperations from '../../hooks/use-operations'
import useRecords from '../../hooks/use-records'

const DEFAULT_PAGE_SIZE = 5

const singleSelectFilterOperators = getGridSingleSelectOperators().filter(
  (operator) => operator.value === 'is',
)

const buildRecordColumns = ({ onDelete, operations }) =>
  [
    { field: 'id', headerName: 'ID', width: 70 },
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
    { field: 'result', headerName: 'Result', type: 'number', width: 320 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => onDelete(id)}
            color="inherit"
          />,
        ]
      },
    },
  ]
    .map((row) => (row.filterable ? row : { ...row, filterable: false }))
    .map((row) => (row.sortable ? row : { ...row, sortable: false }))
    .map((row) => (row.hideable ? row : { ...row, hideable: false }))
    .map((row) => (row.manageble ? row : { ...row, manageble: false }))

const mapSingleSelectFilters = (filters = []) =>
  filters.reduce((acc, filter) => ({ ...acc, [`${filter.field}`]: filter.value }), {})

const RecordsTable = () => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: DEFAULT_PAGE_SIZE })
  const [query, setQuery] = useState({})

  const { data: operations, isLoading: isLoadingOperations } = useOperations()

  const { data, isLoading, isFetching } = useRecords(
    {
      filters: mapSingleSelectFilters(query.filterModel?.items),
      pagination: { page: paginationModel.page + 1, page_size: paginationModel.pageSize },
    },
    { keepPreviousData: true },
  )
  const { isLoading: isDeleting, mutate: deleteRecord } = useDeleteRecord()

  const onFilterChange = useCallback((filterModel) => setQuery({ filterModel }), [])

  const records = data?.data?.records ?? []
  const recordsTotal = useMemo(() => {
    return data?.data?.total ?? 0
  }, [data?.data?.total])

  const columns = useMemo(
    () =>
      buildRecordColumns({
        onDelete: (id) => deleteRecord({ id }),
        operations: operations?.data?.operations?.map((op) => op.type),
      }),
    [deleteRecord, operations?.data?.operations],
  )

  const rows = records.map((row) => ({
    id: row.id,
    inserted_at: new Date(row.inserted_at),
    operation: row.operation.type,
    result: row.operation_response.value,
  }))

  return (
    <Card sx={{ minHeight: 200 }}>
      <DataGrid
        columns={columns}
        disableRowSelectionOnClick
        filterMode="server"
        loading={isLoading || isFetching || isDeleting || isLoadingOperations}
        onFilterModelChange={onFilterChange}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[DEFAULT_PAGE_SIZE, 7]}
        paginationModel={paginationModel}
        paginationMode="server"
        rows={rows}
        rowCount={recordsTotal}
        sx={{ justifyContent: 'space-between' }}
      />
    </Card>
  )
}

export default RecordsTable
