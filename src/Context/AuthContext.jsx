import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutRequested, setLogoutRequested] = useState(false);

  const login = async (email, password) => {
    //   try {
    //     const res = await fetch('https://reqres.in/api/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ email, password }),
    //     });

    //     if (!res.ok) {
    //       throw new Error('Invalid email or password');
    //     }

    //     const data = await res.json();
    //     setIsLoggedIn(true);
    //     return data;
    //   } catch (error) {
    //     setIsLoggedIn(false);
    //     throw error;
    //   }
    // };
    try {
      const res = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      if (res.status !== 200) {
        throw new Error('Invalid email or password');
      }

      setIsLoggedIn(true);
      setLogoutRequested(false);
      return res.data;
    } catch (error) {
      setIsLoggedIn(false);
      throw error;
    }
  };
  const requestLogout = () => {
    setLogoutRequested(true);
  };


  const logout = () => {
    setIsLoggedIn(false);
    setLogoutRequested(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutRequested, login, requestLogout, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext