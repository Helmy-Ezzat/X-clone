import { useFormik } from 'formik'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

export const useSignUp = () => {
  // Use useMutation hook to define data mutation call
  const queryClient = useQueryClient()
  const {
    isPending,
    isError,
    error,
    mutate: signUpMutation,
  } = useMutation({
    // Define the main function for the request (mutationFn)
    mutationFn: async (values) => {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to create account')
        console.log(data)
        return data
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    onSuccess: () => {
      toast.success('Account created successfully')
      queryClient.invalidateQueries({ queryKey: ['authUser'] })
    },
  })
  // Use useFormik hook to manage form state and handle form submission
  const formik = useFormik({
    initialValues: { email: '', username: '', fullName: '', password: '' },
    onSubmit: async (values) => {
      await signUpMutation(values) // Execute the mutation upon form submission
    },
  })
  console.log(error)

  return { formik, isError, error, isPending }
}
