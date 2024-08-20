import React from 'react'
import '../CSS/isError.css'

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>        <p className="error-description">It might have been moved or deleted, or the URL could be incorrect.</p>
        <a href="/" className="home-button">Return to Home</a>
      </div>
    </div>
  )
}

export default ErrorPage