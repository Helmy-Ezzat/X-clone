import React from 'react'
import { BiRepost } from 'react-icons/bi'
import { FaRegBookmark, FaRegComment, FaRegHeart } from 'react-icons/fa'
import PostCommentModal from './PostCommentModal'
import { useLikePost } from '../../../hooks/post/useLikePost'
import LoadingSpinner from '../LoadingSpinner'
import { useQuery } from '@tanstack/react-query'

function PostFooter({ post }) {
  const { isPending,isLiked, handleLikePost } = useLikePost(post)

 
  return (
    <div className="flex justify-between items-center mt-3 px-4 border-t border-gray-700">
      {/* Like */}
      <div
        onClick={handleLikePost}
        className="group flex gap-1 items-center cursor-pointer"
      >
        {isPending && <LoadingSpinner size="sm" />}
        {!isLiked && !isPending && (
          <FaRegHeart className="w-4 h-4 cursor-pointer text-slate-500 group-hover:text-pink-500" />
        )}
        {isLiked && !isPending && (
          <FaRegHeart className="w-4 h-4 cursor-pointer text-pink-500" />
        )}

        <span
          className={`text-sm  group-hover:text-pink-500 ${
            isLiked ? 'text-pink-500' : 'text-slate-500'
          }`}
        >
          {post.likes.length}
        </span>
      </div>
      {/* Comment */}
      <div
        className="group flex gap-1 items-center cursor-pointer"
        onClick={() =>
          document.getElementById('comments_modal' + post._id).showModal()
        }
      >
        <FaRegComment className="w-4 h-4 text-slate-500 group-hover:text-sky-400" />
        <span className="text-sm text-slate-500 group-hover:text-sky-400">
          {post.comments.length}
        </span>
      </div>
      <PostCommentModal post={post} />
      {/* Repost */}
      <div className="group flex gap-1 items-center  cursor-pointer">
        <BiRepost className="w-6 h-6 text-slate-500 group-hover:text-green-500" />
        <span className="text-sm text-slate-500 group-hover:text-green-500">
          0
        </span>
      </div>
      {/* Bookmark */}
      <div className="">
        <FaRegBookmark className="w-4 h-4 text-slate-500 cursor-pointer" />
      </div>
    </div>
  )
}

export default PostFooter
