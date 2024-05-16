import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useLogout = () => {
  const queryClient = useQueryClient()

  const {
    isPending,
    isError,
    error,
    mutate: logoutMutation,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch('/api/auth/logout', {
          method: 'POST',
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
  })

  return { isPending, isError, error, logoutMutation }
}
