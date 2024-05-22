import Posts from '../components/common/posts/Posts'
import UserProfileDetails from '../components/profile/UserProfileDetails'
import UserProfileInfo from '../components/profile/UserProfileInfo'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import FeedTabs from '../components/profile/FeedTabs'
import { useGetUserProfile } from '../hooks/user/useGetUserProfile'
import { useParams } from 'react-router-dom'
import UserProfileBanner from '../components/profile/UserProfileBanner'
import ProfileHeaderSkeleton from '../components/skeletons/ProfileHeaderSkeleton'

function ProfilePage() {
  const { username } = useParams()
  const [feedType, setFeedType] = useState('posts')
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const { userData, isLoading, refetch, isRefetching } =
    useGetUserProfile(username)
  const isMyProfile = authUser?._id === userData?._id
  

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 ">
      {isLoading && <ProfileHeaderSkeleton />}
      {!isLoading && !userData && (
        <p className="text-center text-lg mt-4">User not found</p>
      )}
      {!isLoading && userData && (
        <div className="flex flex-col">
          <UserProfileInfo userData={userData} />
          <UserProfileBanner userData={userData} isMyProfile={isMyProfile}/>
          <UserProfileDetails userData={userData} />
          <FeedTabs feedType={feedType} setFeedType={setFeedType} />
          <Posts feedType={feedType} />
        </div>
      )}
    </div>
  )
}

export default ProfilePage
