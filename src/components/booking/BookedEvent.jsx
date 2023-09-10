import React from 'react'
import { BASE_URL } from './../common/helper.js'

const BookedEvent = ({ props }) => {
    return (
        <>
            <div className='booking_main_div'>
                <div className='booking_event_div'>
                    <div className='booking_event_image_div'>
                        <img className='w-100 h-100' src={`${BASE_URL}uploads/events/${props.event.eventImage}`} alt="" />
                    </div>
                    <div className='booking_event_details_div'>
                        <h2 className='booking_event_head font_roboto'>{props.event.name}</h2>
                        <p className='booking_event_para font_roboto'><i className="bi bi-geo-alt me-2" style={{ color: "#df354d" }}></i>{props.event.venue}</p>
                        <p className='booking_event_para font_roboto'><i className="bi bi-calendar3 me-2" style={{ color: "#df354d" }}></i>{props.event.date}</p>
                        <p className='booking_event_para font_roboto'><i className="bi bi-alarm me-2" style={{ color: "#df354d" }}></i>{props.event.time}</p>
                    </div>
                </div>
                <div className='booking_ticket_div'>
                    <div className='booking_ticket_seat_div'>
                        <h3 className='booking_ticket_no'>{props.event.totalTickets}</h3>
                        <p className='booking_event_para font_roboto text-center'>Tickets</p>
                    </div>
                    <div className='booking_ticket_price_div'>
                        <h4 className='booking_ticket_price font_roboto'>Total: {props.event.totalPrice}.00</h4>
                        <button className='button_filled d-block ms-auto' onClick={() => props.cancelHandler(props.event._id, props.event.totalTickets)}>Cancel</button>
                    </div>
                    <div className='booking_show_div left'></div>
                    <div className='booking_show_div right'></div>
                </div>
            </div>
        </>
    )
}

export default BookedEvent