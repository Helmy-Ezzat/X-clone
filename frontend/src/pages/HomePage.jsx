import CreatePost from '../components/home/CreatePost'
import Posts from '../components/common/posts/Posts'
import Header from '../components/home/Header'
import { useState } from 'react'

function HomePage() {
  const [feedType, setFeedType] = useState('forYou')
  return (
    <div className="min-h-screen border-r border-gray-700 flex-[4_4_0] mr-auto">
      <Header feedType={feedType} setFeedType={setFeedType}/>
      <CreatePost />
      <Posts feedType={feedType} />
    </div>
  )
}

export default HomePage
