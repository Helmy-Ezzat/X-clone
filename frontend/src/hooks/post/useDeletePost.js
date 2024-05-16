import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
export const useDeletePost = (post) => {
  const queryClient = useQueryClient()
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const isMyPost = authUser._id === post.user._id

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${post._id}`, {
          method: 'DELETE',
        })
        const data = res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success('Post deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  return { deletePost, isDeleting, isMyPost }
}
