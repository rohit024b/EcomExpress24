import React from 'react'
import { Link, NavLink } from 'react-router-dom'


const Navbar = () => {

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
            path: "/login",
            name: "Login"
        },
    ]

    const active = {
        color: "red",
        textDecoration: 'none'
    }
    const inactive = {
        color: 'black',
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
                backgroundColor: 'lightblue',
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

export default Navbar

