import React from 'react'

const AlertComp = ({ props }) => {
    return (
        <>
            <div className='alert_outer_div'>
                <h2 className='alert_head'>{props.head}</h2>
                <button className='alert_close_button' onClick={props.closeHandler}><i className="bi bi-x-lg"></i></button>
            </div>
        </>
    )
}

export default AlertComp