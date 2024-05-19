import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import toast from 'react-hot-toast'

export const useCommentPost = (post) => {
  const queryClient = useQueryClient()

  const { mutate: commentPost, isPending } = useMutation({
    mutationFn: async (values) => {
      try {
        const res = await fetch(`/api/posts/comment/${post._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({text:values.comment}),
        })
        const data = await res.json()
        if (!res.ok) throw Error(data.error || 'Something went wrong')
        console.log(data)
        return data
      } catch (error) {
        console.log(error)
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toast.success('Comment posted successfully')
      formik.setFieldValue('comment', '')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const formik = useFormik({
    initialValues: { comment: '' },
    validationSchema: Yup.object({
      comment: Yup.string().required('Text field is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values)
      try {
        await commentPost(values)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setSubmitting(false)
      }
    },
  })

  return { formik }
}
