import { useFormik } from 'formik'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useLogin = () => {
  // Use useMutation hook to define data mutation call
  const queryClient = useQueryClient()
  const { isPending, isError, error, mutate:loginMutation } = useMutation({
    // Define the main function for the request (mutationFn)
    mutationFn: async (values) => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Something went wrong')
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Login successfully')
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
  })

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      await loginMutation(values) 
    },
  })


  return { formik, isError, error, isPending }
}
