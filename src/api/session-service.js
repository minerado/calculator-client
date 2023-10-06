import request from './'

export const login = ({ email, password }) =>
  request('POST', `/sessions`, { data: { email, password } })
