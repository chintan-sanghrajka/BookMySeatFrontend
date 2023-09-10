import React, { useState, useEffect } from 'react';
import InputTags from './../common/InputTags.jsx';
import { BASE_URL } from './../common/helper.js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './../common/ProgressBar.jsx';

const LoginPageOTP = () => {
    const [data, setData] = useState({});
    const [otp, setOTP] = useState(false)
    const [noUsername, setNoUsername] = useState(false)
    const [noOTP, setNoOTP] = useState(false);
    const [invalidUser, setInvalidUser] = useState(false)
    const [invalidOTP, setInvalidOTP] = useState(false)
    const navigate = useNavigate();
    const [loadingWidth, setLoadingWidth] = useState("0")
    const [progress, setProgress] = useState(true)
    const [bannedUser, setBannedUser] = useState(false)

    useEffect(() => {
        setProgress(true)
    }, [data])

    const onChangeHandler = (event) => {
        const { name, value } = event.target
        setData({ ...data, [name]: value })
    }

    const generateOTP = async () => {
        setNoUsername(false)
        setInvalidUser(false)
        setNoOTP(false)
        setInvalidOTP(false)
        setBannedUser(false)
        if (data.username === undefined || data.username === "") {
            setNoUsername(true)
        }
        else {
            setLoadingWidth("70%")
            await axios.post(`${BASE_URL}login`, { userName: data.username, password: "", action: "otp" })
                .then(async (res) => {
                    if (res.data.id === 1) {
                        setInvalidUser(true);
                        setLoadingWidth("0")
                        setProgress(false)
                    }
                    else if (res.data.id === 5) {
                        setBannedUser(true)
                        setLoadingWidth("0")
                        setProgress(false)
                    }
                    else {
                        setOTP(true);
                        setLoadingWidth("0")
                        setProgress(false)
                    }
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
    }

    const submitHandler = async () => {
        setNoUsername(false)
        setInvalidUser(false)
        setNoOTP(false)
        setInvalidOTP(false)
        if (data.otp === undefined || data.otp === "") {
            setNoOTP(true)
        }
        else {
            setLoadingWidth("70%")
            await axios.post(`${BASE_URL}login-otp`, { userName: data.username, userOTP: data.otp }).then((res) => {
                if (res.data.id === 3) {
                    setInvalidOTP(true)
                    setLoadingWidth("0")
                    setProgress(false)
                }
                else {
                    Cookies.set('bookMySeatUser', JSON.stringify(res.data.user), { expires: 1 });
                    Cookies.set('bookMySeatToken', res.data.token, { expires: 1 });
                    navigate("/");
                }
            }).catch(error => console.log(error.message))
        }
    }

    return (
        <>
            {progress && <ProgressBar loadingWidth={loadingWidth} />}
            <div className='login_main_div'>
                <div className='hi_div'>
                    <h2 className='hi_message'>Hi, Guest</h2>
                </div>
                <div className='input_tag_div mt-5'>
                    <InputTags props={{ type: "text", name: "username", placeholder: "Username", heading: "Username", changeHandler: onChangeHandler }} />
                    {noUsername && <p className='error_msg'>Enter Username</p>}
                    {invalidUser && <p className='error_msg'>User not found</p>}
                    {bannedUser && <p className='error_msg'>Your Account is Suspended. Kindly, Contact Support.</p>}
                    {otp && <InputTags props={{ type: "number", name: "otp", placeholder: "OTP", heading: "OTP", changeHandler: onChangeHandler }} />}
                    {otp && <p>Note: OTP will be valid for 5 minute.</p>}
                    {noOTP && <p className='error_msg'>Enter OTP</p>}
                    {invalidOTP && <p className='error_msg'>Invalid OTP</p>}
                    <div className='d-flex justify-content-between mt-4'>
                        <button className='button_filled' onClick={generateOTP}>Generate OTP</button>
                        {otp && <button className='button_filled' onClick={submitHandler}><i className="bi bi-box-arrow-in-right me-2"></i>Login</button>}
                    </div>
                    <button className='button_outline mt-3' onClick={() => navigate('/login')}><i className="bi bi-x-lg me-2"></i>Cancel</button>
                </div>
            </div>
        </>
    )
}

export default LoginPageOTP