import { useCallback, useMemo, useState } from 'react'
import { Card } from '@mui/material'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'

import useDeleteRecord from '../../hooks/use-delete-record'
import useOperations from '../../hooks/use-operations'
import useRecords from '../../hooks/use-records'
import { buildRecordTableColumns, buildRecordTableRows } from '../../modules/record-table'

const DEFAULT_PAGE_SIZE = 5

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

  const recordsTotal = useMemo(() => data?.data?.total ?? 0, [data?.data?.total])

  const columns = useMemo(
    () =>
      buildRecordTableColumns({
        getDeleteActions: ({ id }) => {
          return [
            <GridActionsCellItem
              key={id}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => deleteRecord({ id })}
              color="inherit"
            />,
          ]
        },
        operations: operations?.data?.operations?.map((op) => op.type),
      }),
    [deleteRecord, operations?.data?.operations],
  )

  const rows = useMemo(() => buildRecordTableRows(data?.data?.records ?? []), [data?.data?.records])

  return (
    <Card sx={{ minHeight: 200 }}>
      <DataGrid
        columns={columns}
        disableRowSelectionOnClick
        filterMode="server"
        loading={isLoading || isFetching || isDeleting || isLoadingOperations}
        onFilterModelChange={onFilterChange}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[DEFAULT_PAGE_SIZE, 10, 15]}
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
