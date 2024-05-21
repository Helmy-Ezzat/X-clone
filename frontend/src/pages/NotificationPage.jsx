import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { FaHeart, FaUser } from 'react-icons/fa'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useGetNotifications } from '../hooks/notifications/useGetNotifications'
import { useDeleteNotifications } from '../hooks/notifications/useDeleteNotifications'

function NotificationPage() {
  const { Notifications, isLoading } = useGetNotifications()
  const { deleteNotifications } = useDeleteNotifications()

  return (
    <div className="min-h-screen border-r border-l border-gray-700 flex-[4_4_0]">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <p className="font-bold">Notifications</p>
        <div className="dropdown dropdown-end">
          <div role="button" tabIndex={0} className="m-1">
            <IoSettingsOutline className="w-4" />
          </div>
          <ul
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            tabIndex={0}
          >
            <li>
              <a onClick={deleteNotifications}>Delete all notifications</a>
            </li>
          </ul>
        </div>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center h-full ">
          <LoadingSpinner size={'lg'} />
        </div>
      )}
      {Notifications?.length === 0 && (
        <div className="text-center p-4 font-bold">No notifications 🤔</div>
      )}
      {Notifications?.map((notification) => (
        <div className="border-b border-gray-700" key={notification._id}>
          <div className="flex gap-2 p-4">
            {notification.type === 'follow' && (
              <FaUser className="w-7 h-7 text-primary" />
            )}
            {notification.type === 'like' && (
              <FaHeart className="w-7 h-7 text-red-700" />
            )}
            <Link
              to={`/profile/${notification.from.username}`}
              className="flex gap-1"
            >
              <div className="w-8 rounded-full overflow-hidden">
                <img
                  src={
                    notification.from.profileImg || '/avatar-placeholder.png'
                  }
                  alt=""
                />
              </div>
              <div className="flex gap-1">
                <span className="font-bold">@{notification.from.username}</span>
                {notification.type === 'follow'
                  ? 'followed you'
                  : 'liked your post'}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NotificationPage
