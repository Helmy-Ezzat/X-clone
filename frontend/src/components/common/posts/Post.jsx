import React from 'react'
import { Link } from 'react-router-dom'
import PostHeader from './PostHeader'
import PostContent from './PostContent'
import PostFooter from './PostFooter'
import LoadingSpinner from '../LoadingSpinner'
import { FaTrash } from 'react-icons/fa'
import { useDeletePost } from '../../../hooks/post/useDeletePost'
import { useQuery } from '@tanstack/react-query'

function Post({ post }) {
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const { deletePost, isDeleting } = useDeletePost(post._id)

  const isMyPost = authUser._id === post.user._id
  return (
    <div className="flex gap-2 p-4">
      <Link
        to={`/profile/${post.username}`}
        className="w-8 h-8 rounded-full overflow-hidden"
      >
        <img src={post.user.profileImg || '/avatar-placeholder.png'} alt="" />
      </Link>
      <div className="flex flex-col flex-1">
        <PostHeader post={post} />
        {isMyPost && (
          <span className="flex justify-end flex-1">
            {!isDeleting && (
              <FaTrash
                className="hover:text-red-500 cursor-pointer"
                onClick={deletePost}
              />
            )}
            {isDeleting && <LoadingSpinner size="sm" />}
          </span>
        )}
        <PostContent post={post} />
        <PostFooter post={post} />
      </div>
    </div>
  )
}

export default Post
