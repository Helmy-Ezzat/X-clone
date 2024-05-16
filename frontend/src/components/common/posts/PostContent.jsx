import React from 'react'
<<<<<<< HEAD
import { useCreatePost } from '../../../hooks/post/useCreatePost'
=======
import { useCreatePost } from '../../../hooks/useCreatePost'
>>>>>>> 428979f0cd4cea420ff8e9704f86ab0425585a20

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