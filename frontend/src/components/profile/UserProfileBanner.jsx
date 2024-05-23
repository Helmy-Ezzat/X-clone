import { MdEdit } from 'react-icons/md'
import EditProfileModal from './EditProfileModal'
import { useHandleFileChange } from '../../hooks/useHandleFileChange'
import { useFollow } from '../../hooks/user/useFollow'
import { useQuery } from '@tanstack/react-query'

function UserProfileBanner({ userData }) {
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const isMyProfile = authUser?._id === userData?._id

  const {
    fileInputRef,
    imageUpdateFormik,
    handleFileChange,
    handleEditClick,
    isPending,
  } = useHandleFileChange()
  const { follow, isPendingFollow } = useFollow()
  const amIFollowing = authUser?.following.includes(userData._id)
  return (
    <div>
      <>
        <div className="relative group/cover">
          {/* Cover image */}
          <img
            src={
              imageUpdateFormik.values.coverImg ||
              userData.coverImg ||
              '/cover.png'
            }
            alt="cover image"
            className="w-full h-52 object-cover"
          />
          {isMyProfile && (
            <div className="absolute top-2 right-4 bg-gray-800 p-2 rounded-full bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200">
              <MdEdit
                className="w-5 h-5  text-white"
                onClick={() => handleEditClick('coverImg')}
              />
            </div>
          )}
          {/* profile image */}
          <div className="overflow-hidden absolute -bottom-16 left-4 w-32 h-32 rounded-full">
            <div
              style={{ aspectRatio: '1/1' }} // Ensures the image's aspect ratio matches the specified div's size
              className="relative  group/avatar"
            >
              <img
                className="w-full h-full object-cover" // Ensures the image fits proportionally within the div
                src={
                  imageUpdateFormik.values.profileImg ||
                  userData.profileImg ||
                  '/avatar-placeholder.png'
                }
                alt="profile image"
              />
              {isMyProfile && (
                <div className="absolute top-5 right-3 p-1 bg-primary rounded-full opacity-0 group-hover/avatar:opacity-100">
                  <MdEdit
                    className="w-4 h-4 text-white"
                    onClick={() => handleEditClick('profileImg')}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <form
          onSubmit={imageUpdateFormik.handleSubmit}
          className="flex justify-end p-2"
        >
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {isMyProfile &&
            (imageUpdateFormik.values.coverImg ||
              imageUpdateFormik.values.profileImg) && (
              <button
                type="submit"
                className="btn btn-primary btn-sm text-white rounded-full px-4 ml-2"
              >
                {isPending ? 'Loading...' : 'Update'}
              </button>
            )}
        </form>
      </>
      <div className="flex flex-col items-end pr-5 mt-5 gap-3 sm:flex-row sm:justify-end">
        {isMyProfile && (
          <>
            <EditProfileModal />
            <button
              type="submit"
              className="btn btn-outline btn-sm rounded-full"
              onClick={() =>
                document.getElementById('edit_profile_modal').showModal()
              }
            >
              Edit Profile
            </button>
          </>
        )}
        {!isMyProfile && (
          <button
            onClick={() => follow(userData._id)}
            className="btn btn-outline btn-sm rounded-full"
          >
            {isPendingFollow && 'Loading...'}
            {!isPendingFollow && amIFollowing && 'Unfollow'}
            {!isPendingFollow && !amIFollowing && 'follow'}
          </button>
        )}
      </div>
    </div>
  )
}

export default UserProfileBanner
