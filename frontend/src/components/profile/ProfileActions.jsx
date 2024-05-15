import React from 'react'
import EditProfileModal from './EditProfileModal'
// justify-end px-4 mt-5
function ProfileActions({ isMyProfile, formik }) {
  return (
    <div className="flex flex-col items-end pr-5 mt-5 gap-3 sm:flex-row sm:justify-end">
      {isMyProfile && <EditProfileModal />}
        {(formik.values.coverImg || formik.values.profileImg) && (
          <button
            type="submit"
            className="btn btn-primary btn-sm text-white rounded-full px-4 ml-2"
          >
            Update
          </button>
        )}
      {!isMyProfile && (
        <button className="btn btn-outline btn-sm rounded-full">Follow</button>
      )}
      <button
        className="btn btn-outline btn-sm rounded-full"
        onClick={() =>
          document.getElementById('edit_profile_modal').showModal()
        }
      >
        Edit Profile
      </button>
    </div>
  )
}

export default ProfileActions
