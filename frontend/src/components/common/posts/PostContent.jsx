import React from 'react'
import { useCreatePost } from '../../../hooks/post/useCreatePost'


function PostContent({post}) {
    const {isArabic} = useCreatePost()
  return (
    <div className="flex flex-col gap-3 overflow-hidden">
      <span className="text-sm" dir={isArabic(post.text) ? 'rtl' : 'ltr'}>
        {post.text}
      </span>
      {post.img && (
        <img
          src={post.img}
          alt=""
          className="w-full"
        />
      )}
    </div>
  )
}

export default PostContent