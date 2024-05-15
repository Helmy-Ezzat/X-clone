import { Link } from 'react-router-dom'
import { USERS_FOR_RIGHT_PANEL } from '../../utils/db/dummy.js'
import RightPanelSkeleton from '../skeletons/RightPanelSkeleton.jsx'

function RightPanel() {
  const isLoading = false
  return (
    <div className="hidden lg:block my-4 mx-2">
      <div className="bg-[#16181c] p-4 rounded-md sticky top-2">
        <p className="font-bold">Who to follow</p>
        <div className="flex flex-col gap-4">
          {isLoading && (
            <>
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
              <RightPanelSkeleton />
            </>
          )}
          {!isLoading && (
            <>
              {USERS_FOR_RIGHT_PANEL.map((user,idx) => (
                <Link
                key={idx}
                  to={`/profile/${user.username}`}
                  className="flex items-center justify-center gap-4"
                >
                  <div className="flex gap-2 items-center">
                    <div className="w-8 rounded-full">
                      <img src={user.profileImg} alt="" />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-semibold tracking-tight truncate w-24">
                        {user.fullName}
                      </span>
                      <span className="text-sm text-slate-500">
                        {user.username}
                      </span>
                    </div>
                  </div>

                  <button className="btn btn-sm bg-white text-black hover:bg-white hover:opacity-90 rounded-full">
                    Follow
                  </button>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default RightPanel
