import React, { children, createContext, useState } from 'react'

export const AuthContext = createContext();


export const AuthContextProvider = ({children}) => {


    const [isLoggedin, setIsLoggedIn] = useState(false)
    
    
    return (
    <AuthContext.Provider value={{setIsLoggedIn, isLoggedin}}>
        {children}
    </AuthContext.Provider>
  )
}
