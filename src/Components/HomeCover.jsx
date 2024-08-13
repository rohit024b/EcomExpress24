import React from 'react'
import '../CSS/home.css'
import {   useNavigate } from 'react-router-dom'

const HomeCover = () => {

  const navigate = useNavigate()
  const handleClick=()=>{
    navigate('/products')
  }


  return (
    <div style={{
      width:'100%',
      height:'95vh',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
        <div className='msgOnLeft'>
          <b>NEW ARRIVALS ONLY</b>
          <h1>new 👋 <br /> collections <br /> for everyone</h1>
          <button onClick={handleClick}>Latest Collections  -<i className="arrow right"></i> </button>
        </div>
        <div className='msgOnLeft' >
          <img width={'800px'} src="https://blog.vmake.ai/wp-content/uploads/2023/10/1.png" alt="coverImage" />
        </div>
    </div>
  )
}

export default HomeCover