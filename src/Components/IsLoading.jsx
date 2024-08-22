import React from 'react'
import '../CSS/home.css'
import { ClipLoader } from 'react-spinners'

const IsLoading = () => {

  return (
    <div className='spinner'>
        <ClipLoader size={60} speedMultiplier={1.5} color='red' />
    </div>
  )
}

export default IsLoading