import React, { useState } from 'react'
import axios from 'axios';
import { BASE_URL } from './../common/helper.js'

const PaymentComp = ({ props }) => {

    const [data, setData] = useState({})

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = "https://checkout.razorpay.com/v1/checkout.js"
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    const displayRazorPay = async () => {
        // const res = await loadRazorpay()

        await loadRazorpay()

        await axios.post(`${BASE_URL}razorpay`, { totalPrice: props.totalPrice }).then((res) => {
            setData(res.data)
            // console.log(res.data)
        }).catch((error) => console.log(error))

        var options = {
            key: "rzp_test_kqxw13RjPF3iB6",
            amount: props.totalPrice * 100,
            currency: "INR",
            name: "BookMySeat",
            description: "Test Transaction",
            order_id: data.id,
            handler: function (response) {
                props.payHandler(response.razorpay_payment_id);
            },
            prefill: {
                name: "Chintan Sanghrajka",
                email: "sanghrajka.chintan@gmail.com",
                contact: "8369874596",
            },
            notes: {
                address: "BookMySeat Corporate Office",
            },
            theme: {
                color: '#f84464',
            }
        }
        let paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return (
        <>
            <button className='booking_pay_button button_filled' onClick={displayRazorPay}>Book and Pay Rs. {props.totalPrice}.00</button>
        </>
    )
}

export default PaymentComp