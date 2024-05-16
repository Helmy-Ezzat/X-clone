import Post from './Post'
import PostSkeleton from '../../skeletons/PostSkeleton'
import { POSTS } from '../../../utils/db/dummy'
import { useGetPosts } from '../../../hooks/post/useGetPosts'

function Posts({ feedType }) {
  const { posts, isLoading, isRefetching } = useGetPosts(feedType)

  return (
    <>
      {isLoading && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      {!isLoading && posts?.length === 0 && (
        <p className="text-center my-4">No posts in this tab. switch😓</p>
      )}
      {!isLoading && posts && (
        <>
          {posts.map((post) => (
            <div
              key={post._id}
              className="m-3 rounded-md overflow-hidden bg-gray-900 shadow-xl"
            >
              <Post post={post} />
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default Posts
