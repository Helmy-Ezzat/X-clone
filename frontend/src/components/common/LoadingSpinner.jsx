import React from 'react'

function LoadingSpinner({ size = 'md' }) {
  const sizeClass = `loading-${size}`
  return (
    <span className={`loading loading-spinner ${sizeClass}`}>
      LoadingSpinner
    </span>
  )
}

export default LoadingSpinner
