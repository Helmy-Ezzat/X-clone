import React from 'react'
import { FaLink } from 'react-icons/fa6'

function UserProfileDetails({ userData }) {
  
  return (
    <div className="mt-14 flex flex-col gap-4 px-4">
      <div className="flex flex-col">
        <span className="font-bold text-lg">{userData.fullName}</span>
        <span className="text-sm text-slate-500">{userData.username}</span>
        <span className="text-sm my-1">{userData.bio}</span>
      </div>

      {userData.link && (
        <div className="flex items-center gap-2">
          <FaLink className="w-3 h-3 text-slate-500" />
          <a
            className="text-sm text-blue-500 hover:underline"
            href="https://www.youtube.com/@Keramn.Studio"
          >
            https://www.youtube.com/@Keramn.Studio
          </a>
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex gap-1 items-center">
          <span className="font-bold text-xs">{userData.following.length}</span>
          <span className="text-slate-500 text-xs">Following</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="font-bold text-xs">{userData.followers.length}</span>
          <span className="text-slate-500 text-xs">Followers</span>
        </div>
      </div>
    </div>
  )
}

export default UserProfileDetails