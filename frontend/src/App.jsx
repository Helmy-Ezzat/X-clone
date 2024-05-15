import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/home/Sidebar'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import NotificationPage from './pages/NotificationPage'
import ProfilePage from './pages/ProfilePage'
import RightPanel from './components/home/RightPanel'
import { Toaster } from 'react-hot-toast'
import LoadingSpinner from './components/common/LoadingSpinner'
import { useProtectedRoute } from './hooks/useProtectedRoute'

function App() {
  const { data: authUser, isLoading } = useProtectedRoute()
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  return (
    <>
      {/* container application */}
      <div className="flex max-w-6xl mx-auto">
        {authUser && <Sidebar />}
        <Routes>
          <Route
            path="/login"
            element={!authUser ? <LoginPage /> : <Navigate to={'/'} />}
          />
          <Route
            path="/signup"
            element={!authUser ? <SignUpPage /> : <Navigate to={'/'} />}
          />
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to={'/login'} />}
          />
          <Route
            path="/notifications"
            element={
              authUser ? <NotificationPage /> : <Navigate to={'/login'} />
            }
          />
          <Route
            path="/profile/:username"
            element={authUser ? <ProfilePage /> : <Navigate to={'/login'} />}
          />
        </Routes>
        {authUser && <RightPanel />}
        <Toaster />
      </div>
    </>
  )
}

export default App
