import PostSkeleton from '../../skeletons/PostSkeleton'
import { useGetPosts } from '../../../hooks/post/useGetPosts'
import Post from '../posts/Post'
import { useEffect } from 'react'
function Posts({ feedType, userData }) {
  const { posts, isLoading, refetch } = useGetPosts(feedType, userData)

    useEffect(() => {
      refetch()
    }, [feedType, refetch,userData?.username])
console.log(userData?._id);
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
