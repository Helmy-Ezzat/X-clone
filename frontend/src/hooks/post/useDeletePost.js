import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
export const useDeletePost = (postId) => {
  const queryClient = useQueryClient()
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/posts/${postId}`, {
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

  return { deletePost, isDeleting }
}
