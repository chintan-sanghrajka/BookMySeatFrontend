import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getEventList } from './../store/eventList/eventListAction.js';
import { Container } from 'react-bootstrap';
import HomeDisplay from './../home/HomeDisplay.jsx';
import NavLogo from './../navbar/NavLogo.jsx';
import NavCat from './../navbar/NavCat.jsx';

const EventsList = () => {
    const dispatch = useDispatch();
    const { reqType, argument } = useParams();
    const [page, setPage] = useState(10);
    useEffect(() => {
        dispatch(getEventList({ reqType, argument, page }))
    }, [dispatch, reqType, argument, page])
    const eventList = useSelector(state => state.eventList.eventsList)
    // const handleScroll = () => {
    //     console.log("Hii")
    //     if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
    //         return;
    //     }
    //     setPage(page + 2)
    //     dispatch(getEventList({ categoryId, page }))
    // };

    useEffect(() => {
        // window.addEventListener('scroll', handleScroll);
        // return () => window.removeEventListener('scroll', handleScroll);
        setPage(10)
    }, []);
    return (
        <>
            <NavLogo />
            <NavCat />
            <Container>
                {eventList.length === 0 && <p className='no_activity_message'>No Events, Explore other Categories</p>}
                {eventList.length !== 0 && <h2 className='page_head font_roboto'>Top Results,</h2>}
                <HomeDisplay props={{ eventList: eventList, location: false }} />
            </Container>
        </>
    )
}

export default EventsList