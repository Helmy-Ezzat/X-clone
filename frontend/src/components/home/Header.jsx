function Header({ feedType, setFeedType }) {
  return (
    <div className="flex w-full border-b border-gray-700 sticky top-0 bg-black">
      <div
        className={
          'flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative'
        }
        onClick={() => setFeedType('forYou')}
      >
        For you
        {feedType === 'forYou' && (
          <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
        )}
      </div>
      <div
        className="flex justify-center flex-1 p-3 hover:bg-secondary transition duration-300 cursor-pointer relative"
        onClick={() => setFeedType('following')}
      >
        Following
        {feedType === 'following' && (
          <div className="absolute bottom-0 w-10  h-1 rounded-full bg-primary"></div>
        )}
      </div>
    </div>
  )
}

export default Header
