import React, { useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, requestLogout } = useContext(AuthContext);

  const { id } = useParams()

  const Links = [
    { 
      path: "/", 
      name: "Home" 
    },
    { 
      path: "/products", 
      name: "Products" 
    },
    { 
      path: "/contact", 
      name: "Contact" 
    },
    {
      path: isLoggedIn ? "/login" : "/login",
      name: isLoggedIn ? "Logout" : "Login",
      onClick: isLoggedIn ? requestLogout : null,
    },
    { 
      path: `/cart/${id}`, 
      name: "Cart" 
    },
  ];
    const active = {
        color: "white",
        textDecoration: '5.2px underline white',
    }
    const inactive = {
        color: 'white',
        textDecoration: 'none'
    }

    return (
        <>
            <div className='navbar' style={{
                display: 'flex',
                width:'100%',
                justifyContent: 'space-around',
                top: '0',
                margin: '0',
                padding: '0',
                backgroundColor:'#893CAA',
                alignItems: 'center',
                position:'fixed'
            }}>
                <img width={'200px'} height={'55px'} style={{
                  objectFit:'contain'
                }} src="https://i.imgur.com/lTXSW2L.png" alt="logo" />
                <div style={{
                    display: 'flex',
                    gap: '90px'
                }}>
                    {Links.map((el) => {
                        return (
                            <NavLink
                                style={({ isActive }) => isActive ? active : inactive}
                                onClick={el.onClick}
                                to={el.path} key={el.name}>
                                {
                                  el.name==='Cart' ?  el.name : el.name
                                }

                            </NavLink>
                        )
                    })
                    }
                </div>
            </div>
        </>
    )
}
export default Navbar;