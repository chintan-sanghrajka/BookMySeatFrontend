import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTickets, cancelTickets } from './../store/booking/bookingAction';
import { Container } from 'react-bootstrap';
import BookedEvent from './BookedEvent';
import AlertComp from './../common/AlertComp.jsx'
import Cookies from 'js-cookie';
// import ProgressBar from './ProgressBar.jsx';

const MyBooking = () => {
    const dispatch = useDispatch()
    // const [loadingWidth, setLoadingWidth] = useState("0")
    // const [progress, setProgress] = useState(true)

    const [showAlert, setShowAlert] = useState(false)

    const user = JSON.parse(Cookies.get('bookMySeatUser'))

    useEffect(() => {

        dispatch(getTickets(user._id))
    }, [dispatch, showAlert, user._id])

    const bookings = useSelector(state => state.booking.bookingList)

    const closeAlertHandler = () => {
        setShowAlert(false)
    }

    const cancelHandler = (bookingId, totalTickets) => {
        // const user = JSON.parse(Cookies.get('bookmyseat_user'))
        dispatch(cancelTickets({ bookingId: bookingId, totalTickets: totalTickets }))
        dispatch(getTickets(user._id))
        setShowAlert(true)
    }

    return (
        <>
            {/* {progress && <ProgressBar loadingWidth={loadingWidth} />} */}
            <Container>
                {bookings.length === 0 && <p className='no_activity_message'>No Booking, Explore Latest Movies and shows</p>}
                {showAlert && <AlertComp props={{ head: "Tickets Cancelled Successfully", closeHandler: closeAlertHandler }} />}
                {
                    bookings.length !== 0 && bookings.map((event, index) => {
                        return <BookedEvent key={index} props={{ event: event, cancelHandler: cancelHandler }} />
                    })
                }
            </Container>
        </>
    )
}

export default MyBooking