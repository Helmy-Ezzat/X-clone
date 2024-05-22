import React from 'react'
import { Link } from 'react-router-dom'
import UserDetails from './UserDetails'
import PostContent from './PostContent'
import PostFooter from './PostFooter'

import DeletePost from './DeletePost'

function Post({ post }) {
  return (
    <div className="flex gap-2 p-4">
      <Link
        to={`/profile/${post.user.username}`}
        className="w-8 h-8 rounded-full overflow-hidden"
      >
        <img src={post.user.profileImg || '/avatar-placeholder.png'} alt="" />
      </Link>
      <div className="flex flex-col flex-1">
        <div className="flex mb-3">
          <UserDetails post={post} />
          <DeletePost post={post} />
        </div>
        <PostContent post={post} />
        <PostFooter post={post} />
      </div>
    </div>
  )
}

export default Post
