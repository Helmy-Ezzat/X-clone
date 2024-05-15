import React from 'react'
import { Link } from 'react-router-dom'

function PostHeader({ post }) {
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const formattedDate = new Date(post.createdAt).toLocaleString('en-US', options)

  return (
    <div className="flex flex-col items-start gap-1 md:flex-row md:items-center">
      <Link to={`/profile/${post.username}`} className="font-bold">
        {post.user.fullName}
      </Link>
      <span className="text-gray-500 flex gap-1 text-sm">
        <Link className="font-bold">@{post.user.username}</Link>
        <span>.</span>
        <span>{formattedDate}</span>
      </span>
    </div>
  )
}

export default PostHeader
