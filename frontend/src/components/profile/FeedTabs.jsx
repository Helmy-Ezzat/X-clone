import React from 'react'

function FeedTabs({ feedType, setFeedType }) {
  console.log(feedType);
  return (
    <div className="flex w-full border-b border-gray-700 mt-4">
      <div
        className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 relative cursor-pointer"
        onClick={() => setFeedType('posts')}
      >
        Posts
        {feedType === 'posts' && (
          <div className="absolute bottom-0 w-10 h-1 rounded-full bg-primary" />
        )}
      </div>
      <div
        className="flex justify-center flex-1 p-3 text-slate-500 hover:bg-secondary transition duration-300 relative cursor-pointer"
        onClick={() => setFeedType('likes')}
      >
        Likes
        {feedType === 'likes' && (
          <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary" />
        )}
      </div>
    </div>
  )
}

export default FeedTabs
