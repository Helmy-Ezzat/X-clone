import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
export const useDeleteNotifications = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/notifications', {
          method: 'DELETE',
        })
        const data = await res.json()

        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success('Notifications deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['notifications'] })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return { deleteNotifications }
}
