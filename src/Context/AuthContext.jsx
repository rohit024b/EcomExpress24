import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      return res.data;
    } catch (error) {
      setIsLoggedIn(false);
      throw error;
    }
  };


  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
