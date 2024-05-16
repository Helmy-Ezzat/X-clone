import React from 'react'
import { Link } from 'react-router-dom'
import { useFormattedDate } from '../../../hooks/useFormattedDate'

function PostHeader({ post }) {
  const { formattedDate } = useFormattedDate()
  const formattedDateResult = formattedDate(new Date(post.createdAt))
  return (
    <div className="flex flex-col items-start gap-1 md:flex-row md:items-center">
      <Link to={`/profile/${post.username}`} className="font-bold">
        {post.user.fullName}
      </Link>
      <span className="text-gray-500 flex gap-1 text-sm">
        <Link className="font-bold">@{post.user.username}</Link>
        <span>.</span>
        <span>{formattedDateResult}</span>
      </span>
    </div>
  )
}

export default PostHeader
