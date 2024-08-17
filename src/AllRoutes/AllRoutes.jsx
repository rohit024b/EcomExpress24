import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Cart from '../Pages/Cart'
import Contact from '../Pages/Contact'
import Login from '../Pages/Login'
import ProdDetails from '../Pages/ProdDetails'
import Admin from '../Pages/Admin'
import ErrorPage from '../Pages/ErrorPage'
import Navbar from '../Components/Navbar'
import Products from '../Pages/Products'
import PrivateRoutes from './PrivateRoutes'

const AllRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cart/:id' element={<PrivateRoutes><Cart /></PrivateRoutes>} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login />} />
                <Route path='/productDetails/:id' element={<PrivateRoutes>
                    <ProdDetails />
                    </PrivateRoutes>} />
                <Route path='/masaiAdmin' element={<Admin />} />
                <Route path='/products' element={<PrivateRoutes>
                    <Products />
                    </PrivateRoutes>} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default AllRoutes