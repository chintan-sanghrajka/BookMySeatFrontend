import React from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Search from './Search.jsx';

const NavLogo = () => {
    const navigate = useNavigate();
    const token = Cookies.get('bookMySeatToken')
    return (
        <>
            <div className='nav_logo_outer_div'>
                <div className='nav_logo_side_div'>
                    <h1 className='nav_logo_logo font_roboto' onClick={() => navigate('/')}>BookMySeat</h1>
                </div>
                <div className='nav_logo_side_div nav_logo_side_div_2'>
                    {!token && <button className='button_filled' onClick={() => navigate('/login')}>Get Started</button>}
                    {token && <button className='button_filled' onClick={() => navigate('/logout')}>Logout</button>}
                </div>

                <div className='nav_logo_center_div'>
                    <Search />
                </div>
            </div>
        </>
    )
}

export default NavLogo