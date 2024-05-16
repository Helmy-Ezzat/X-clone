import { CiImageOn } from 'react-icons/ci'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { IoCloseSharp } from 'react-icons/io5'
import { useCreatePost } from '../../hooks/post/useCreatePost'


function CreatePost() {
  const {
    authUser,
    imgRef,
    handleSubmit,
    handleImgChange,
    text,
    setText,
    img,
    setImg,
    isArabic,
    isError,
    isPending,
    error,
  } = useCreatePost()

  return (
    <div className="flex items-start gap-4 m-3 bg-gray-900 overflow-hidden shadow-xl p-4 rounded-md">
      <div className="w-8 rounded-full overflow-hidden">
        <img src={authUser.profileImg || '/avatar-placeholder.png'} alt="" />
      </div>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
        <textarea
          className="input bg-slate-800 w-full p-1 rounded-full text-lg resize-none border-none focus:outline-none  border-gray-800 "
          placeholder="what is happening?"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
          dir={isArabic(text) ? 'rtl' : 'ltr'}
        ></textarea>

        {img && (
          <div className="relative w-75 mx-auto">
            <IoCloseSharp
              className="
          bg-gray-800 w-5 h-5 rounded-full text-white
          absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setImg(null)
                imgRef.current.value = null
              }}
            />

            <img
              src={img}
              alt=""
              className=" w-full h-73 mx-auto object-contain rounded"
            />
          </div>
        )}

        <div className="flex justify-between items-center border-t border-t-gray-700 py-2">
          <div className="flex gap-1 items-center">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={imgRef}
              onChange={handleImgChange}
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
            {isPending ? <span className="loading" /> : 'Post'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreatePost
