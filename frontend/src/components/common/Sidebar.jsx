import XSvg from '../svgs/X'

import { MdHomeFilled } from 'react-icons/md'
import { IoNotifications } from 'react-icons/io5'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BiLogOut } from 'react-icons/bi'
import { useLogout } from '../../hooks/authHooks/useLogout'
import { useQuery } from '@tanstack/react-query'

function Sidebar() {
  const { error, isError, isPending, logoutMutation } = useLogout()
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  return (
    <div className="w-18 max-w-52 md:flex-[2_2_0]">
      <div className="sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full">
        <Link to={'/'} className="flex justify-center md:justify-start">
          <XSvg className="px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900" />
        </Link>
        <ul>
          <li className="flex justify-center md:justify-normal">
            <Link
              to={'/'}
              className="
            flex items-center gap-3
             hover:bg-stone-900 rounded-full py-2 pl-2 pr-4
             max-w-fit cursor-pointer"
            >
              <MdHomeFilled className="w-8 h-8" />
              <span className="text-lg hidden md:block">Home</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-normal">
            <Link
              to={'/notifications'}
              className="
            flex items-center gap-3
             hover:bg-stone-900 rounded-full py-2 pl-2 pr-4
             max-w-fit cursor-pointer"
            >
              <IoNotifications className="w-6 h-6" />
              <span className="text-lg hidden md:block">Notifications</span>
            </Link>
          </li>
          <li className="flex justify-center md:justify-normal">
            <Link
              to={`/profile/${authUser?.username}`}
              className="
            flex items-center gap-3
             hover:bg-stone-900 rounded-full py-2 pl-2 pr-4
             max-w-fit cursor-pointer"
            >
              <FaUser className="w-6 h-6" />
              <span className="text-lg hidden md:block">Profile</span>
            </Link>
          </li>
        </ul>
        {authUser && (
          <Link
            to={`/profile/${authUser.username}`}
            className="mt-auto mb-10 flex gap-2 items-center hover:bg-[#181818] rounded-full px-4 py-2 max-w-fit cursor-pointer transition-all duration-300"
          >
            <div className="avatar hidden md:inline-flex">
              <div className="w-8 rounded-lg">
                <img
                  src={authUser?.profileImg || 'avatar-placeholder.png'}
                  alt=""
                />
              </div>
            </div>
            <div className="flex justify-center flex-1">
              <div className="hidden md:block">
                <p className="text-white font-bold text-sm w-20 truncate">
                  {authUser?.fullName}
                </p>
                <p className="text-slate-500 text-sm">{authUser?.username}</p>
              </div>
              <BiLogOut
                className="w-5 h-5 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  logoutMutation()
                }}
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Sidebar
