import { useQuery } from '@tanstack/react-query'
export const useGetNotifications = () => {
  const { data: Notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/notifications')
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
  })

  return { Notifications, isLoading }
}
