import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useUpdateUserProfile } from '../../hooks/user/useUpdateUserProfile'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditProfileModal() {
  const { username: paramUsername } = useParams()
  const navigate = useNavigate()
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  // console.log(authUser)
  const { isPending, updateProfile } = useUpdateUserProfile()
  const profileUpdateFormik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      bio: '',
      link: '',
      newPassword: '',
      currentPassword: '',
    },
    onSubmit: async (values) => {
      try {
        await updateProfile(values)
        navigate(`/profile/${values.username}`)
      } catch (error) {
        console.log(error.message)
      }
    },
  })

  useEffect(() => {
    if (authUser) {
      profileUpdateFormik.setFieldValue('fullName', authUser.fullName)
      profileUpdateFormik.setFieldValue('username', authUser.username)
      profileUpdateFormik.setFieldValue('email', authUser.email)
      profileUpdateFormik.setFieldValue('link', authUser.link)
      profileUpdateFormik.setFieldValue('bio', authUser.bio)
      profileUpdateFormik.setFieldValue('currentPassword', '')
      profileUpdateFormik.setFieldValue('newPassword', '')
    }
  }, [authUser])

  return (
    <>
      <dialog className="modal" id="edit_profile_modal">
        <div className="modal-box border border-gray-700 rounded-md shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form
            onSubmit={profileUpdateFormik.handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-2">
              <input
                onChange={profileUpdateFormik.handleChange}
                onBlur={profileUpdateFormik.handleBlur}
                value={profileUpdateFormik.values.fullName}
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                onChange={profileUpdateFormik.handleChange}
                onBlur={profileUpdateFormik.handleBlur}
                value={profileUpdateFormik.values.username}
                type="text"
                name="username"
                placeholder="User Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                onChange={profileUpdateFormik.handleChange}
                onBlur={profileUpdateFormik.handleBlur}
                value={profileUpdateFormik.values.email}
                type="email"
                name="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                onChange={profileUpdateFormik.handleChange}
                onBlur={profileUpdateFormik.handleBlur}
                value={profileUpdateFormik.values.link}
                type="text"
                className="input flex-1 border border-gray-700 rounded p-2 input-md"
                placeholder="link"
                name="link"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                onChange={profileUpdateFormik.handleChange}
                onBlur={profileUpdateFormik.handleBlur}
                value={profileUpdateFormik.values.currentPassword}
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                onChange={profileUpdateFormik.handleChange}
                onBlur={profileUpdateFormik.handleBlur}
                value={profileUpdateFormik.values.newPassword}
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>
            <textarea
              onChange={profileUpdateFormik.handleChange}
              onBlur={profileUpdateFormik.handleBlur}
              value={profileUpdateFormik.values.bio}
              type="text"
              name="bio"
              placeholder="Bio"
              className="flex-1 input border border-gray-700 rounded p-2 input-md textarea resize-none"
            ></textarea>

            <button
              type="submit"
              className="btn btn-primary btn-sm text-white rounded-full"
            >
              {isPending ? 'Loading...' : 'Update'}
            </button>
          </form>
          <form method="dialog">
            <button className="btn btn-sm mt-5 rounded-full btn-accent">
              Close
            </button>
          </form>
        </div>
      </dialog>
    </>
  )
}

export default EditProfileModal
