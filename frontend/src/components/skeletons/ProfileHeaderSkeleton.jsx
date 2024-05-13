import React from 'react'

function ProfileHeaderSkeleton() {
  return (
    <div className="flex flex-col gap-1 w-full my-3 p-4">
      <div className="skeleton h-4 w-12 rounded-full"></div>
      <div className="skeleton h-4 w-16 rounded-full"></div>
      <div className="skeleton h-40 w-full relative">
        <div className="skeleton h-20 w-20 border rounded-full absolute -bottom-10 left-3"></div>
      </div>
      <div className="skeleton h-6 w-24 rounded-full mt-4 ml-auto"></div>
      <div className="skeleton h-4 w-14 rounded-full mt-4"></div>
      <div className="skeleton h-4 w-1/3 rounded-full"></div>
    </div>
  )
}

export default ProfileHeaderSkeleton
