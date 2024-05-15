import CreatePost from '../components/home/CreatePost'
import Posts from '../components/common/posts/Posts'
import Header from '../components/home/Header'

function HomePage() {
  return (
    <div className="min-h-screen border-r border-gray-700 flex-[4_4_0] mr-auto">
      <Header />
      <CreatePost />
      <Posts />
    </div>
  )
}

export default HomePage
