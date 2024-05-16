import { formatDistanceToNow, isToday, isYesterday } from 'date-fns'

export const useFormattedDate = () => {
  const formattedDate = (date) => {
    if (isToday(date)) {
      return formatDistanceToNow(date, {
        addSuffix: true,
        includeSeconds: true,
      })
    } else if (isYesterday(date)) {
      return 'Yesterday'
    } else {
      return format(date, 'MMMM d, yyyy')
    }
  }

  return {formattedDate }
}
