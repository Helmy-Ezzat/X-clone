import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { POSTS } from '../../utils/db/dummy'

function UserProfileInfo({ userData }) {
  return (
    <div className="flex gap-10 px-4 py-2 items-center">
      <Link to="/">
        <FaArrowLeft className="w-4 h-4" />
      </Link>
      <div className="flex flex-col">
        <p className="font-bold text-lg">{userData.fullName}</p>
        <span className="text-sm text-slate-500">{POSTS.length}posts</span>
      </div>
    </div>
  )
}

export default UserProfileInfo