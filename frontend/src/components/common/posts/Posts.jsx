import Post from "./Post"
import PostSkeleton from '../../skeletons/PostSkeleton'
import { POSTS } from "../../../utils/db/dummy"


function Posts() {
  const isLoading = false
  return (
    <>
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {!isLoading && POSTS?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. switch😓</p>
      )}
      {!isLoading && POSTS && (
        <>
          {POSTS.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </>
      )}
    </>
  )
}

export default Posts
