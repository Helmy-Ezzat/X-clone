import XSvg from '../../../components/svgs/X'
import { MdOutlineMail } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const LoginPage = () => {
  // Form submission handler
  const handleSubmit = async (values) => {
    try {
    } catch (error) {}
  }
  // Formik hook
  const formik = useFormik({
    initialValues: {
      username: '',

      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(10, 'Name must not exceed 10 characters')
        .required('Name is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must not exceed 20 characters')
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    }),
    onSubmit: handleSubmit,
  })
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="fill-white lg:w-2/3" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-2/3 mx-auto md:mx-20 flex flex-col gap-4"
        >
          <XSvg className="w-24 lg:hidden fill-white" />
          <h1 className="text-4xl font-semibold text-white">Let`s go.</h1>
          {formik.errors.username && (
            <p className="text-xs text-red-500 -m-1">
              {formik.errors.username}
            </p>
          )}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="text"
              className="grow"
              placeholder="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
          </label>
          {formik.errors.password && (
            <p className="text-xs text-red-500 -m-1">
              {formik.errors.password}
            </p>
          )}

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          <button
            type="submit"
            className="btn btn-primary rounded-full text-white"
          >
            Login
          </button>
          {/* {isError && <p className="text-red-500">Something went wrong</p>} */}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-white text-lg">
            {"Don't "}Already have an account?
          </p>
          <Link to={'/signup'}>
            <button className="btn btn-primary rounded-full text-white btn-outline w-full">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
