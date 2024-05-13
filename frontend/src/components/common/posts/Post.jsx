import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostFooter from './PostFooter'

function Post({ post }) {
  return (
    <div className="flex gap-2 p-4 border-b border-gray-700">
      <Link className="w-8">
        <img src={post.user.profileImg} alt="" />
      </Link>
      <div className="flex flex-col flex-1">
        <PostHeader post={post} />
        <PostContent post={post} />
        <PostFooter post={post} />
      </div>
    </div>
  )
}

export default Post
