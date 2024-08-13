import React from 'react'
import '../CSS/home.css'
import { ClipLoader } from 'react-spinners'

const IsLoading = () => {
    // className='spinner'
    //  size={'50'}
  return (
    <div  >
        <ClipLoader speedMultiplier={1.5} color='red' />
    </div>
  )
}

export default IsLoading