import { MdEdit } from 'react-icons/md'
import { useFormik } from 'formik'
import { useRef } from 'react'

function CoverImageAndProfileAvatar({ user, isMyProfile, formik }) {
  const coverImgRef = useRef(null)
  const profileImgRef = useRef(null)

  return (
    <div className="relative group/cover">
      <img
        src={formik.values.coverImg || user.coverImg || '/cover.png'}
        alt="cover image"
        className="w-full h-52 object-cover"
      />
      {/* Cover image */}
      {isMyProfile && (
        <div
          className="
          absolute top-2 right-4 bg-gray-800 p-2 rounded-full bg-opacity-75
          cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200"
        >
          <MdEdit
            className="w-5 h-5  text-white"
            onClick={() => coverImgRef.current.click()}
          />
          <input
            type="file"
            name="coverImg"
            accept="image/*"
            hidden
            ref={coverImgRef}
            onChange={(e) => {
              const file = e.target.files[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                  formik.setFieldValue('coverImg', reader.result)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
        </div>
      )}

      {/* profile image */}
      <div
        className="
        overflow-hidden
        absolute -bottom-16 left-4 w-32 h-32
        rounded-full"
      >
        <div
          style={{ aspectRatio: '1/1' }} // Ensures the image's aspect ratio matches the specified div's size
          className="
          relative  group/avatar"
        >
          <img
            className="w-full h-full object-cover" // Ensures the image fits proportionally within the div
            src={
              formik.values.profileImg ||
              user.profileImg ||
              '/avatar-placeholder.png'
            }
            alt="profile image"
          />

          <div
            className="
          absolute top-5 right-3 p-1 bg-primary rounded-full
          opacity-0 group-hover/avatar:opacity-100"
          >
            <MdEdit
              className="w-4 h-4 text-white"
              onClick={() => profileImgRef.current.click()}
            />
            <input
              type="file"
              name="profileImg"
              accept="image/*"
              hidden
              ref={profileImgRef}
              onChange={(e) => {
                const file = e.target.files[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = () => {
                    formik.setFieldValue('profileImg', reader.result)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverImageAndProfileAvatar
