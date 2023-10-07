import { useMutation, useQuery, QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const resetQuery = (id) => queryClient.invalidateQueries(id)

export const parseErrors = (err) => {
  const error = err?.response?.data?.error
  const errors = err?.response?.data?.errors

  if (error) return error

  return (
    errors &&
    Object.keys(errors)
      .map((k) => errors[k])
      .flat()
  )
}

export { useMutation, useQuery }
