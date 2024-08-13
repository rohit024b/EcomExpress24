import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const Links = [
    { 
      path: "/", 
      name: "Home" 
    },
    { 
      path: "/cart:id", 
      name: "Cart" 
    },
    { 
      path: "/contact", 
      name: "Contact" 
    },
    {
      path: isLoggedIn ? "/" : "/login",
      name: isLoggedIn ? "Logout" : "Login",
      onClick: isLoggedIn ? logout : null,
    },
  ];

  const active = { color: "red", textDecoration: 'none' };
  const inactive = { color: 'black', textDecoration: 'none' };

  return (
    <div className='navbar' 
    style={{ display: 'flex', 
             justifyContent: 'space-around', 
             backgroundColor: 'lightblue', 
             alignItems: 'center' 
          }}>
      <h3>EcomExpress</h3>
      <div style={{ display: 'flex', gap: '90px' }}>
        {Links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            style={({ isActive }) => (isActive ? active : inactive)}
            onClick={link.onClick}
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navbar;