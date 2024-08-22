import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
console.log('hihihih')
  const {isLoggedIn} = useContext(AuthContext)
  console.log(isLoggedIn)
  if(!isLoggedIn){
    return <Navigate to={'/login'}/>
  }
  return children
}
export default PrivateRoutes