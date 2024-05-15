import { useFormik } from 'formik'
import Posts from '../components/common/posts/Posts'
import CoverImageAndProfileAvatar from '../components/profile/CoverImageAndProfileAvatar'
import ProfileActions from '../components/profile/ProfileActions'
import UserNotFoundError from '../components/profile/UserNotFoundError'
import UserProfileDetails from '../components/profile/UserProfileDetails'
import UserProfileHeader from '../components/profile/UserProfileHeader'
import { useState } from 'react'

function ProfilePage() {
  const [feedType, setFeedType] = useState('posts')
  const isMyProfile = true
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
      {!false && !user && <UserNotFoundError />}
      <div className="flex flex-col">
        {!false && user && (
          <>
            <UserProfileHeader user={user} />
            <CoverImageAndProfileAvatar
              isMyProfile={isMyProfile}
              user={user}
              formik={formik}
            />
            <ProfileActions isMyProfile={isMyProfile} formik={formik} />
            <UserProfileDetails user={user} />
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
            <Posts feedType={feedType} />
          </>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
