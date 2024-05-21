import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
export const useGetUserProfile = (username) => {
  const {
    data: userData,
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
  })

  useEffect(() => {
    refetch()
  }, [username, refetch])

  return { userData, isLoading, refetch, isRefetching }
}
