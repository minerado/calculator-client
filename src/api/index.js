import http from 'axios'

import { getToken } from '../lib/auth'

const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1'
const HOST = import.meta.env.VITE_API_HOST || 'http://localhost:4000'

const client = (version) => {
  const token = getToken()
  const baseURL = `${HOST}/api/${version}`
  const headers = token ? { common: { Authorization: `Bearer ${token}` } } : {}

  return http.create({ baseURL, headers })
}

const request = async (method, url, options = {}) =>
  client(API_VERSION)({ method, url, cache: { ignoreCache: true }, ...options })

export default request
