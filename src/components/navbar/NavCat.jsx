import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useSelector, useDispatch } from 'react-redux';
import { getCategories } from './../store/home/homeActions.js'

const NavCat = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = Cookies.get('bookMySeatToken')

    const iconArray = [
        <span className="material-symbols-outlined navcat_icon">
            album
        </span>,
        <span className="material-symbols-outlined navcat_icon">
            theater_comedy
        </span>,
        <span className="material-symbols-outlined navcat_icon">
            Stream
        </span>,
        <span className="material-symbols-outlined navcat_icon">
            sports_cricket
        </span>
    ]

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const categories = useSelector(state => state.home.categories)
    return (
        <>
            <div className='navcat_container_div'>
                <div className='navcat_outer_div'>
                    {categories.length !== 0 && categories.map((cat, index) => {
                        return cat.status === 1 && <div key={index} onClick={() => navigate(`/events/cat/${cat._id}`)} className='navcat_inner_div'>
                            {iconArray[index]}
                            <span className='navcat_head font_roboto'>{cat.name}</span>
                        </div>
                    })}
                    {token && <div className='navcat_inner_div' onClick={() => navigate('/my-booking')}>
                        <span className="material-symbols-outlined navcat_icon">
                            confirmation_number
                        </span>
                        <span className='navcat_head font_roboto'>My Booking</span>
                    </div>}
                </div>
            </div>
        </>
    )
}

export default NavCat