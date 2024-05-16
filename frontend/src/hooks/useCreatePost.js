import { useRef, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
export const useCreatePost = () => {
  const imgRef = useRef(null)
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)

  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const queryClient = useQueryClient()
  const {
    mutate: createPost,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ text, img }) => {
      console.log(text, img)
      try {
        const res = await fetch('/api/posts/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text, img }),
        })
        const data = await res.json()
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong')
        }
        return data
      } catch (error) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      setText('')
      setImg(null)
      toast.success('Post created successfully')
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPost({ text, img })
  }
  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImg(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function isArabic(text) {
    const arabicRegex = /[\u0600-\u06FF]/
    return arabicRegex.test(text)
  }

  return {
    text,
    setText,
    img,
    setImg,
    imgRef,
    handleSubmit,
    handleImgChange,
    isArabic,
    authUser,
    isError,
    isPending,
    error,
  }
}
