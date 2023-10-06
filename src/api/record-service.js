import request from './'

export const createRecord = ({ operation_id, operation_params }) =>
  request('POST', `/records`, { data: { operation_id, operation_params } })

export const deleteRecord = ({ id }) => request('DELETE', `/records/${id}`)

export const listRecords = (params = {}) => request('GET', `/records`, { params })

export const updateRecord = ({ id, ...data }) => request('PATCH', `/records/${id}`, { data })
