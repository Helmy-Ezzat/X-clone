import { useFormik } from 'formik'
import Posts from '../components/common/posts/Posts'
import CoverImageAndProfileAvatar from '../components/profile/CoverImageAndProfileAvatar'
import ProfileActions from '../components/profile/ProfileActions'
import UserNotFoundError from '../components/profile/UserNotFoundError'
import UserProfileDetails from '../components/profile/UserProfileDetails'
import UserProfileHeader from '../components/profile/UserProfileHeader'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import FeedTabs from '../components/profile/FeedTabs'
import { useGetUserProfile } from '../hooks/user/useGetUserProfile'
import { useParams } from 'react-router-dom'

function ProfilePage() {
  const { username } = useParams()
  const [feedType, setFeedType] = useState('posts')
  const { data: authUser } = useQuery({ queryKey: ['authUser'] })
  const { userData, isLoading, refetch, isRefetching } = useGetUserProfile(username)
  const isMyProfile = authUser?._id === userData?._id
  const user = {
    _id: '1',
    fullName: 'John Doe',
    username: 'johndoe',
    profileImg: '/avatars/boy2.png',
    coverImg: '/cover.png',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    link: 'https://youtube.com/@asaprogrammer_',
    following: ['1', '2', '3'],
    followers: ['1', '2', '3'],
  }
  // Formik hook
  const formik = useFormik({
    initialValues: { coverImg: '', profileImg: '' },
    // validationSchema,
    onSubmit: (e) => {
      console.log(e.target.files[0])
    },
  })

  return (
    <div className="flex-[4_4_0] border-r border-gray-700 ">
      {false && <ProfileHeaderSkeleton />}
      {!false && !userData && <UserNotFoundError />}
      {!false && userData && (
        <div className="flex flex-col">
          <UserProfileHeader userData={userData} />
          <CoverImageAndProfileAvatar
            userData={userData}
            isMyProfile={isMyProfile}
            formik={formik}
          />
          <ProfileActions isMyProfile={isMyProfile} formik={formik} />
          <UserProfileDetails userData={userData} />
          <FeedTabs feedType={feedType} setFeedType={setFeedType} />
          <Posts feedType={feedType} />
        </div>
      )}
    </div>
  )
}

export default ProfilePage
