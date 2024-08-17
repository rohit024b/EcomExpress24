import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';

const Navbar = () => {
  const { isLoggedIn, requestLogout } = useContext(AuthContext);

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
      path: isLoggedIn ? "/login" : "/login",
      name: isLoggedIn ? "Logout" : "Login",
      onClick: isLoggedIn ? requestLogout : null,
    },
  ];
    const active = {
        color: "white",
        // textDecoration: '6px underline #10696B',
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
                justifyContent: 'space-around',
                top: '0',
                margin: '0',
                padding: '0',
                backgroundColor:'#893CAA',
                alignItems: 'center',
            }}>
                <h3>EcomExpress</h3>
                <div style={{
                    display: 'flex',
                    gap: '90px'
                }}>
                    {Links.map((el) => {
                        return (
                            <NavLink
                                style={({ isActive }) => isActive ? active : inactive}
                                onClick={el.onClick}
                                // className={({ isActive }) => isActive ? 'active' : 'default'}
                                to={el.path} key={el.name}>
                                {el.name}

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