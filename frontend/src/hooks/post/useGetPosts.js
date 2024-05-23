import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useGetPosts = (feedType, userData) => {
  const getPostEndpoint = () => {
    console.log(feedType)
    switch (feedType) {
      case 'forYou':
        return '/api/posts/all'
      case 'following':
        return '/api/posts/following'
      case 'posts':
        return `/api/posts/user/${userData?.username}`
      case 'likes':
        return `/api/posts/likes/${userData?._id}`
      default:
        return '/api/posts/all'
    }
  }
  const POST_ENDPOINT = getPostEndpoint()
  const {
    data: posts,
    refetch,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      try {
        const res = await fetch(POST_ENDPOINT)
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
          console.log(data);
        return data
      } catch (error) {
        console.log(error.message);
        throw new Error(error)
      }
    },
  })

  return { posts, isLoading, isRefetching, refetch }
}
