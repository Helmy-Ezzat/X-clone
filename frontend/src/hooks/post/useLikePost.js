import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
export const useLikePost = (post) => {
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const isLiked = post.likes.includes(authUser._id)
  
  const queryClient = useQueryClient()
  const { mutate: likePost, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/like/${post._id}`, {
          method: 'POST',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(['posts'], (oldData) => {
        return oldData.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: updatedLikes }
          }
          return p
        })
      })
    },
    onError: (error) => {
      console.log(error)
      toast.error(error.message)
    },
  })

  const handleLikePost = () => {
    if (isPending) return
    likePost()
  }

  return { isPending, isLiked, likePost, handleLikePost }
}
