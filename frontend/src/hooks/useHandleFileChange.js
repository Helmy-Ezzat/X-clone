import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { useUpdateUserProfile } from './user/useUpdateUserProfile'

export const useHandleFileChange = () => {
  const { updateProfile,isPending } = useUpdateUserProfile()
  const [activeInput, setActiveInput] = useState(null)
  const fileInputRef = useRef(null)
  const imageUpdateFormik = useFormik({
    initialValues: {
      coverImg: '',
      profileImg: '',
    },
    onSubmit: async (values) => {
      try {
        await updateProfile(values)
        imageUpdateFormik.setFieldValue('coverImg', null)
        imageUpdateFormik.setFieldValue('profileImg', null)
      } catch (error) {
        console.log(error.message)
      }
    },
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (activeInput === 'coverImg') {
          imageUpdateFormik.setFieldValue('coverImg', reader.result)
        } else if (activeInput === 'profileImg') {
          imageUpdateFormik.setFieldValue('profileImg', reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditClick = (inputType) => {
    setActiveInput(inputType)
    fileInputRef.current.click()
  }

  return {
    activeInput,
    setActiveInput,
    fileInputRef,
    imageUpdateFormik,
    handleFileChange,
    handleEditClick,
    isPending,
  }
}
