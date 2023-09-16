import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEvent, getMoreEvent } from './../store/eventPage/eventPageAction.js';
import { Container } from 'react-bootstrap';
import HomeDisplay from './../home/HomeDisplay.jsx';
import Cookies from 'js-cookie';
import cycle from './../../media/booking/bookingPage_cycle.PNG';
import scooter from './../../media/booking/bookingPage_scooter.PNG';
import rickshaw from './../../media/booking/bookingPage_rikshaw.PNG';
import car from './../../media/booking/bookingPage_car.PNG';
import sedan from './../../media/booking/bookingPage_sedan.PNG';
import bus from './../../media/booking/bookingPage_bus.PNG';
import { bookTicket } from './../store/booking/bookingAction.js';
import NavLogo from './../navbar/NavLogo.jsx';
import NavCat from './../navbar/NavCat.jsx';
import AlertComp from './../common/AlertComp.jsx';
import PaymentComp from './../payment/PaymentComp.jsx';

const EventPage = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const dispatch = useDispatch();
    const [book, setBook] = useState(false);
    const [vehicle, setVehicle] = useState(cycle);
    const [noSeat, setNoSeat] = useState(1);
    const [showAlert, setShowAlert] = useState(false)
    const seatArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const limit = 4;
    useEffect(() => {
        dispatch(getEvent(eventId))
    }, [dispatch, eventId])

    const event = useSelector(state => state.eventPage.event)

    useEffect(() => {
        dispatch(getMoreEvent(event.genre))
    }, [event, dispatch])

    let moreEvents = useSelector(state => state.eventPage.moreEvents)

    moreEvents = moreEvents.filter((element) => {
        return element._id !== event._id
    })

    const bookTicketHandler = () => {
        if (Cookies.get('bookMySeatToken')) {
            setBook(true)
        }
        else {
            navigate("/login")
        }
    }

    const setVehileVar = (seat) => {
        if (seat === 1) {
            setVehicle(cycle)
        }
        else if (seat === 2) {
            setVehicle(scooter)
        }
        else if (seat === 3) {
            setVehicle(rickshaw)
        }
        else if (seat === 4) {
            setVehicle(car)
        }
        else if (seat === 5 || seat === 6 || seat === 7) {
            setVehicle(sedan)
        }
        else if (seat === 8 || seat === 9 || seat === 10) {
            setVehicle(bus)
        }
    }

    const seatClickHandler = (seat) => {
        setNoSeat(seat)
        setVehileVar(seat)
    }

    const payHandler = (payment_id) => {
        const user = JSON.parse(Cookies.get('bookMySeatUser'))
        dispatch(bookTicket({
            eventId: event._id,
            totalTickets: noSeat,
            totalPrice: noSeat * event.ticketPrice,
            userId: user._id,
            paymentId: payment_id
        }))
        setBook(false)
        setShowAlert(true)
    }

    const alertCloseHandler = () => {
        setShowAlert(false)
        setBook(false)
    }

    return (
        <>
            <NavLogo />
            <NavCat />
            {showAlert && <AlertComp props={{ head: "Tickets Booked Successfully", closeHandler: alertCloseHandler }} />}
            <div className={book === true ? 'event_page_container_div' : ''}>
                <div className='event_page_back'>
                    <div className='event_back_image_div'>
                        <img src={`http://localhost:8001/uploads/events/${event.eventImage}`} alt="" className='w-100 h-100' />
                    </div>
                    <div className='event_back_shadow_div_right'></div>
                    <div className='event_back_shadow_div_left'></div>
                    <div className='event_main_div'>
                        <div className='event_main_image_div'>
                            <img src={`http://localhost:8001/uploads/events/${event.eventImage}`} alt="" className='h-100 w-100' />
                        </div>
                        <div className='event_main_info_div'>
                            <h2 className='event_main_name font_roboto'>{event.name}</h2>

                            <p className='event_main_para font_roboto'><i className="bi bi-star-fill me-2" style={{ color: "#df354d" }}></i>{event.rating}/5</p>

                            <p className='event_main_para_sec'><i className="bi bi-camera-video me-2" style={{ color: "#df354d" }}></i>{event.genre}</p>

                            <p className='event_main_para_sec'><i className="bi bi-geo-alt me-2" style={{ color: "#df354d" }}></i>{event.venue}</p>

                            <p className='event_main_para_sec'><i className="bi bi-calendar3 me-2" style={{ color: "#df354d" }}></i>{event.date}</p>

                            <p className='event_main_para_sec'><i className="bi bi-alarm me-2" style={{ color: "#df354d" }}></i>{event.time}</p>

                            {event.availableTicket > 0 ? <button className='book_now_button' onClick={bookTicketHandler}>Book Now</button> : <p className='housefull_msg'><i className="bi bi-house-check-fill me-2"></i>House Full</p>}
                        </div>
                    </div>
                </div >
                <div>
                    <Container>
                        <div className='event_page_section_div'>
                            <h2 className='event_page_about_head font_roboto'>About</h2>
                            <p className='event_page_about_description font_roboto'>{event.description}</p>
                        </div>
                        <div className='event_page_section_div'>
                            <h2 className='event_page_about_head font_roboto mb-4'>Explore More in {event.genre}</h2>
                            <HomeDisplay props={{ eventList: moreEvents, location: false }} />
                        </div>
                    </Container>
                </div>
                {
                    book && <div className='event_page_dark_div'>
                        <div className='booking_outer_div'>
                            <button className='booking_close' onClick={() => setBook(false)}><span className="material-symbols-outlined close">
                                close
                            </span></button>
                            <h3 className='booking_head font_roboto'>How Many Seats?</h3>
                            <div className='booking_vehicle_div'>
                                <img src={vehicle} alt="" className='booking_vehicle' />
                            </div>
                            <div className='booking_seat_div'>
                                {
                                    seatArr.map((seat, index) => {
                                        return <button className={noSeat === seat ? 'booking_seat_button font_roboto booking_seat_active_button' : 'booking_seat_button font_roboto'} key={index}
                                            onClick={() => seatClickHandler(seat)}
                                        >{seat}</button>
                                    })
                                }
                            </div>
                            <div className='booking_details_div'>
                                <p className='booking_price font_roboto'>Rs. {event.ticketPrice * noSeat}.00</p>
                                {event.availableTicket >= noSeat ? <p className='booking_status available'>Available</p> : <p className='booking_status not_available'>Not Available</p>}
                                {
                                    // event.availableTicket >= noSeat && <button className='booking_pay_button button_filled' onClick={payHandler}>Book and Pay</button>
                                    event.availableTicket >= noSeat && <PaymentComp props={{ totalPrice: event.ticketPrice * noSeat, payHandler: payHandler }} />
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default EventPage