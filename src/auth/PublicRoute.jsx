import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import NavLogo from './../components/navbar/NavLogo.jsx'
import NavCat from '../components/navbar/NavCat.jsx'

const PublicRoute = () => {
    const auth = Cookies.get('bookMySeatToken') || '';

    return (
        <>
            {
                !auth ?
                    <>
                        <NavLogo />
                        <NavCat />
                        <Outlet />

                    </>
                    : <Navigate to='/home' />
            }
        </>
    )
}

export default PublicRoute
