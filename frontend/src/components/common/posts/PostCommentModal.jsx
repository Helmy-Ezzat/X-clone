import React from 'react'
import PostContent from './PostContent'
import { useCommentPost } from '../../../hooks/post/useCommentPost'

function PostCommentModal({ post }) {
  const { formik } = useCommentPost(post)
  return (
    <dialog className="modal" id={`comments_modal${post._id}`}>
      <div className="modal-box rounded border border-gray-600">
        <PostContent post={post} />
        <h3 className="font-bold text-lg mb-4">Comments</h3>
        <div className="flex flex-col gap-3 max-h-60 overflow-auto">
          {post.comments.length === 0 && (
            <p className="text-sm text-slate-500">
              No comments yet, Be the first one
            </p>
          )}
          {post.comments.map((comment, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="w-8 rounded-full">
                <img src={comment.user.profileImg} alt="" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="font-bold">{comment.user.fullName}</span>
                  <span className="text-gray-700 text-sm">
                    @{comment.user.username}
                  </span>
                </div>
                <div className="text-sm">{comment.text}</div>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex gap-2 items-center mt-4 border-t pt-2 border-gray-600"
        >
          <textarea
            name="comment"
            className="textarea bg-gray-800 w-full p-1 rounded text-md resize-none border focus:outline-none"
            placeholder="Add a comment..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.comment}
          ></textarea>
          <button
            type="submit"
            className="btn btn-primary btn-sm text-white px-4 rounded-full"
          >
            Post
          </button>
        </form>
      </div>
      <form className="modal-backdrop" method="dialog">
        <button className="outline-none">close</button>
      </form>
    </dialog>
  )
}

export default PostCommentModal
