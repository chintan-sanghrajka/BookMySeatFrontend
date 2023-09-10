import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        Cookies.remove('bookMySeatUser');
        Cookies.remove('bookMySeatToken')
        navigate("/")
    }, [navigate])
    return (
        <div>Logout</div>
    )
}

export default Logout