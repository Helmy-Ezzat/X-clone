import LoadingSpinner from '../LoadingSpinner'
import { FaTrash } from 'react-icons/fa'
import { useDeletePost } from '../../../hooks/post/useDeletePost'

function DeletePost({post}) {
  const { deletePost, isDeleting, isMyPost } = useDeletePost(post)

  return (
    <>
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
    </>
  )
}

export default DeletePost
