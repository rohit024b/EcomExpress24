import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('isLoggedIn');
    return saved ? JSON.parse(saved) : false;
  });

  const navigate = useNavigate();
  const handleCardClick = (id) => {
    navigate(`/productDetails/${id}`)
  }
  const [logoutRequested, setLogoutRequested] = useState(false);
  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);
  const login = async (email, password) => {
    try {
      const res = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });

      if (res.status === 200) {
        setIsLoggedIn(true);
        setLogoutRequested(false);
        return res.data;
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setIsLoggedIn(false);
      throw error;
    }
  };
  const requestLogout = () => {
    setLogoutRequested(true);
  };


  const logout = () => {
    setLogoutRequested(false);
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };
  const handleAddToCart = (id) => {
    // console.log(id)
    navigate(`/cart/${id}`)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logoutRequested, login, requestLogout, logout, handleCardClick, handleAddToCart }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext

