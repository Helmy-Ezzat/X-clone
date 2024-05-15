import { useQuery } from '@tanstack/react-query'

export const useProtectedRoute = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        if (data.error) return null
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    retry: false,
  })

  return { data, error, isError, isLoading }
}
