import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useGetPosts = ( feedType ) => {
  const getPostEndpoint = () => {
    switch (feedType) {
      case 'forYou':
        return '/api/posts/all'
      case 'following':
        return '/api/posts/following'
      default:
        return '/api/posts/all'
    }
  }
  const POST_ENDPOINT = getPostEndpoint()
  const {
    data: posts,
    refetch,
    isLoading,isRefetching
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT)
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
  }, [feedType, refetch])

  return { posts, isLoading,isRefetching }
}
