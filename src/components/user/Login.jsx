import React, { useEffect, useState } from 'react';
import InputTags from './../common/InputTags.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../common/helper.js';
import Cookies from 'js-cookie';
import ProgressBar from './../common/ProgressBar.jsx';
import GoogleLoginComp from './GoogleLoginComp.jsx';

const Login = () => {
    const [data, setData] = useState({})
    const navigate = useNavigate()
    const [noUsername, setNoUsername] = useState(false)
    const [invalidUsername, setInvalidUsername] = useState(false)
    const [noPassword, setNoPassword] = useState(false)
    const [invalidPassword, setInvalidPassword] = useState(false)
    const [loadingWidth, setLoadingWidth] = useState("0")
    const [progress, setProgress] = useState(true)
    const [bannedUser, setBannedUser] = useState(false)

    useEffect(() => {
        setProgress(true)
    }, [data])

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }
    const submitHandler = () => {
        setNoUsername(false)
        setNoPassword(false)
        setInvalidUsername(false)
        setInvalidPassword(false)
        setBannedUser(false)
        if (data.username === undefined || data.username === "") {
            setNoUsername(true)
        }
        else if (data.password === undefined || data.password === "") {
            setNoPassword(true)
        }
        else if (data.username !== undefined && data.password !== undefined) {
            setLoadingWidth("70%")
            axios.post(`${BASE_URL}login/`, { userName: data.username, password: data.password, action: "password" }
            ).then((res) => {
                // console.log(res.data)
                if (res.data.id === 1) {
                    setInvalidUsername(true)
                    setLoadingWidth("0")
                    setProgress(false)
                }
                else if (res.data.id === 2) {
                    setInvalidPassword(true)
                    setLoadingWidth("0")
                    setProgress(false)
                }
                else if (res.data.id === 5) {
                    setBannedUser(true)
                    setLoadingWidth("0")
                    setProgress(false)
                }
                else {
                    Cookies.set('bookMySeatUser', JSON.stringify(res.data.user), { expires: 1 });
                    Cookies.set('bookMySeatToken', res.data.token, { expires: 1 });
                    navigate('/')
                }
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    return (
        <>
            {progress && <ProgressBar loadingWidth={loadingWidth} />}
            <div className='login_main_div'>
                <div className='hi_div'>
                    <h2 className='hi_message'>Hi, Guest</h2>
                </div>
                <div className='input_tag_div my-5'>
                    <InputTags props={{ type: "text", name: "username", placeholder: "Username", heading: "Username", changeHandler: onChangeHandler }} />
                    {noUsername && <p className='error_msg'>Please enter username</p>}
                    {invalidUsername && <p className='error_msg'>Invalid Username</p>}
                    <InputTags props={{ type: "password", name: "password", placeholder: "Password", heading: "Password", changeHandler: onChangeHandler }} />
                    {noPassword && <p className='error_msg'>Please enter password</p>}
                    {invalidPassword && <p className='error_msg'>Invalid Password</p>}
                    {bannedUser && <p className='error_msg'>Your Account is Suspended. Kindly, Contact Support.</p>}
                    <div className='d-flex justify-content-between mt-4'>
                        <button className='button_outline' onClick={() => { navigate("/signup") }}><i className="bi bi-plus-square me-2"></i>Sign Up</button>
                        <button className='button_filled font_roboto' onClick={submitHandler}><i className="bi bi-box-arrow-in-right me-2"></i>Continue</button>
                    </div>
                    <h2 className='or_tag'>OR</h2>
                    <GoogleLoginComp />
                    <button className='button_outline long_button' onClick={() => { navigate("/login-with-OTP") }}>Login with OTP</button>
                </div>
            </div>
        </>
    )
}

export default Login