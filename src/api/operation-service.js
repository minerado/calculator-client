import request from './'

export const listOperations = () => request('GET', `/operations`)
