import React from 'react'
import EditProfileModal from './EditProfileModal'

function ProfileActions({ isMyProfile, formik }) {
  return (
    <div className="flex justify-end px-4 mt-5">
      {isMyProfile && <EditProfileModal/>}
      {!isMyProfile && (
        <button className="btn btn-outline btn-sm rounded-full">Follow</button>
      )}
      {(formik.values.coverImg || formik.values.profileImg) && (
        <button type='submit' className="btn btn-primary btn-sm text-white rounded-full px-4 ml-2">
          Update
        </button>
      )}
    </div>
  )
}

export default ProfileActions