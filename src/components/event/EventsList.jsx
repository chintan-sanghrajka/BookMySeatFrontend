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

    useEffect(() => {
        dispatch(getEventList({ reqType, argument }))
    }, [reqType, argument])
    const eventList = useSelector(state => state.eventList.eventsList)

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