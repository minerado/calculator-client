import { useMutation, useQuery, QueryClient } from 'react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const resetQuery = (id) => queryClient.invalidateQueries(id)

export { useMutation, useQuery }
