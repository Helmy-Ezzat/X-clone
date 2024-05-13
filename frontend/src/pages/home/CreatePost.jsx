import { CiImageOn } from 'react-icons/ci'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { useRef, useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import { useFormik } from 'formik'
function CreatePost() {
  const imgRef = useRef(null)
  const data = {
    profileImg: '/lap.jpg',
  }

  // Formik hook
  const formik = useFormik({
    initialValues: { text: '', imgPost: '' },
    // validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <div className="flex items-start gap-4 border-b border-gray-700 p-4 ">
      <div className="w-8 h-full border">
        <img src={data.profileImg} alt="" />
        <h1>Test</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col gap-2"
      >
        <textarea
          className="textarea w-full p-0 text-lg resize-none border-none focus:outline-none  border-gray-800"
          placeholder="what is happening?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.text}
          name="text"
        ></textarea>
        {formik.values.imgPost && 
        
        <div className="relative w-75 mx-auto">
          {formik.values.imgPost && 
          <IoCloseSharp
          className="
          bg-gray-800 w-5 h-5 rounded-full text-white
          absolute top-2 right-2 cursor-pointer"
          onClick={() => {
            formik.setFieldValue('imgPost', null)
            imgRef.current.value = null
          }}
          />
        }
          <img
            src={formik.values.imgPost}
            alt=""
            className=" w-full h-73 mx-auto object-contain rounded"
          />
        </div>
        }

        <div className="flex justify-between items-center border-t border-t-gray-700 py-2">
          <div className="flex gap-1 items-center">
            <input
              type="file"
              name="imgPost"
              accept="image/*"
              ref={imgRef}
              hidden
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    formik.setFieldValue('imgPost', reader.result)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
            <CiImageOn
              className="fill-primary w-6 h-6 cursor-pointer"
              onClick={() => {
                imgRef.current.click()
              }}
            />
            <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-sm text-white px-4 rounded-full"
          >
            Post
          </button>
        </div>
        {/* {isError && <div className="text-red-500">Something went wrong</div>} */}
      </form>
    </div>
  )
}

export default CreatePost
