import XSvg from '../components/svgs/X'
import { MdOutlineMail } from 'react-icons/md'
import { MdPassword } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

const LoginPage = () => {
  const { formik, isError, error, isPending } = useLogin()
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
            className="btn btn-primary rounded-full text-white w-fit"
          >
            {isPending ? <span className="loading" /> : 'Login'}
          </button>
          {isError && <p className="text-red-500">Something went wrong</p>}
        </form>
        <div className="flex items-center gap-2 mt-4">
          <p className="text-white md:text-lg">Don`t have an account?</p>
          <Link to={'/signup'} className="text-blue-500 text-md">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
