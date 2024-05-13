import { useFormik } from 'formik'
import React from 'react'

function EditProfileModal() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      bio: '',
      link: '',
      newPassword: '',
      currentPassword: '',
    },
    // validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })

  return (
    <>
      <button
        className="btn btn-outline btn-sm rounded-full"
        onClick={() =>
          document.getElementById('edit_profile_modal').showModal()
        }
      >
        Edit Profile
      </button>
      <dialog className="modal" id="edit_profile_modal">
        <div className="modal-box border border-gray-700 rounded-md shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                type="text"
                name="username"
                placeholder="User Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                name="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.link}
                type="text"
                className="input flex-1 border border-gray-700 rounded p-2 input-md"
                placeholder="link"
                name="link"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.currentPassword}
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
              />
            </div>
            <textarea
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bio}
              type="text"
              name="bio"
              placeholder="Bio"
              className="flex-1 input border border-gray-700 rounded p-2 input-md textarea resize-none"
            ></textarea>
            <button
              type="submit"
              className="btn btn-primary btn-sm text-white rounded-full"
            >
              Update
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
