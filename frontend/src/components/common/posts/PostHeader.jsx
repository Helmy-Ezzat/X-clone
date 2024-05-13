import React from 'react'
import { Link } from 'react-router-dom'

function PostHeader({post}) {
  return (
    <div className="flex gap-2 items-center">
      <Link>{post.user.fullName}</Link>
      <span className="text-gray-700 flex gap-1 text-sm">
        <Link>@{post.user.username}</Link>
        <span>.</span>
        <span>1h</span>
      </span>
    </div>
  )
}

export default PostHeader