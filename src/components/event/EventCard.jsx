import React from 'react'
import { useNavigate } from 'react-router-dom'

const EventCard = ({ props }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className='event_image_rating_div' onClick={() => navigate(`/event-page/${props.id}`)}>
                <div className='event_image_div'>
                    <img src={`http://localhost:8001/uploads/events/${props.image}`} alt="" className='event_image' />
                </div>
                <div className='event_rating_div'>
                    <p className='event_rating font_roboto'><i className="bi bi-star-fill me-2" style={{ color: "#df354d" }}></i>{props.rating}/5</p>
                </div>
            </div>
            <div className='event_info_div mb-4'>
                <h3 className="event_name font_roboto">{props.name}</h3>
                {!props.showLocation && <h4 className='event_rating font_roboto'>{props.genre}</h4>}
                {props.showLocation && <h4 className='event_rating font_roboto'>{props.venue}</h4>}
            </div >
        </>
    )
}

export default EventCard