import { MdOutlineMail } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { MdPassword } from 'react-icons/md'
import { MdDriveFileRenameOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
import XSvg from '../components/svgs/X'
import { useSignUp } from '../hooks/auth/useSignUp'

const SignUpPage = () => {
  const { formik, error, isError, isPending } = useSignUp()
  return (
    <div className="max-w-screen-xl mx-auto flex h-screen px-10">
      <div className="flex-1 hidden lg:flex items-center justify-center">
        <XSvg className="fill-white lg:w-2/3" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="lg:w-2/3 mx-auto md:mx-20 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2 w-full">
            <XSvg className="w-24 lg:hidden fill-white" />
            <h1 className="text-4xl font-semibold text-white">Join today</h1>
          </div>

          {formik.errors.email && (
            <p className="text-xs text-red-500 -m-1">{formik.errors.email}</p>
          )}
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
            />
          </label>

          <div className="flex gap-4 flex-wrap">
            <div className="flex-1">
              {formik.errors.username && (
                <p className="text-xs text-red-500">{formik.errors.username}</p>
              )}
              <label className="input input-bordered rounded flex items-center gap-2 mt-1">
                <FaUser />
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                  type="text"
                  className="grow "
                  placeholder="Username"
                  name="username"
                />
              </label>
            </div>
            <div className="flex-1">
              {formik.errors.fullName && (
                <p className="text-xs text-red-500">{formik.errors.fullName}</p>
              )}
              <label className="input input-bordered rounded flex items-center gap-2  mt-1">
                <MdDriveFileRenameOutline />
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.fullName}
                  type="text"
                  className="grow"
                  placeholder="Full Name"
                  name="fullName"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            {formik.errors.password && (
              <p className="text-xs text-red-500 ">{formik.errors.password}</p>
            )}
            <label className="input input-bordered rounded flex items-center gap-2">
              <MdPassword />
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                type="password"
                className="grow"
                placeholder="Password"
                name="password"
              />
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary rounded-full text-white w-fit"
          >
            {isPending ? <span className="loading" /> : 'Sign up'}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-white md:text-lg">Already have an account?</p>
          <Link to={'/login'} className="text-blue-500 text-md">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
export default SignUpPage
