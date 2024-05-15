import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostFooter from './PostFooter'

function Post({ post }) {
  return (
    <div className="flex gap-2 p-4 border-b border-gray-700 ">
      <Link to={`/profile/${post.username}`} className="w-8 h-8 rounded-full overflow-hidden">
        <img src={post.user.profileImg || '/avatar-placeholder.png'} alt="" />
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
