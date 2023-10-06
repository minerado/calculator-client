import request from './'

export const getCurrentUser = () => request('GET', `/users/current`)
