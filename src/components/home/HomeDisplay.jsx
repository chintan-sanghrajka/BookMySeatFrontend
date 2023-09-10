import React from 'react'
import { Row, Col } from 'react-bootstrap';
import EventCard from './../event/EventCard.jsx';

const HomeDisplay = ({ props }) => {
    return (
        <>
            <Row className='mx-5'>
                {props.eventList.map((event, index) => {
                    return <Col className='col-lg-3 col-md-4 col-12' key={index}>
                        <EventCard props={{ name: event.name, image: event.eventImage, rating: event.rating, genre: event.genre, venue: event.venue, showLocation: props.location, id: event._id }} />
                    </Col>
                })}
            </Row>
        </>
    )
}

export default HomeDisplay