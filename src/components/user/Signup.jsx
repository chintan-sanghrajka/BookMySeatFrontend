import React, { useState, useReducer, useEffect } from 'react';
import InputTags from './../common/InputTags.jsx';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../common/helper.js';
import ProgressBar from './../common/ProgressBar.jsx';

const Signup = () => {
    const [data, setData] = useState({})
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const initialValue = {
        noFirstName: false,
        noLastName: false,
        noUserName: false,
        existingUserName: false,
        noEmailId: false,
        invalidEmailId: false,
        noPassword: false,
        invalidPassword: false,
        noRePassword: false,
        noSamePassword: false,
        noAddress: false,
        noContact: false,
        invalidContact: false,
    }
    const [loadingWidth, setLoadingWidth] = useState("0")
    const [progress, setProgress] = useState(true)

    const reducer = (state, action) => {
        switch (action.type) {
            case "noFirstName":
                return {
                    ...state,
                    noFirstName: action.payload,
                }
            case "noLastName":
                return {
                    ...state,
                    noLastName: action.payload,
                }
            case "noUserName":
                return {
                    ...state,
                    noUserName: action.payload,
                }
            case "existingUserName":
                return {
                    ...state,
                    existingUserName: action.payload,
                }
            case "noEmailId":
                return {
                    ...state,
                    noEmailId: action.payload,
                }
            case "noPassword":
                return {
                    ...state,
                    noPassword: action.payload,
                }
            case "invalidEmailId":
                return {
                    ...state,
                    invalidEmailId: action.payload,
                }
            case "invalidPassword":
                return {
                    ...state,
                    invalidPassword: action.payload,
                }
            case "noRePassword":
                return {
                    ...state,
                    noRePassword: action.payload,
                }
            case "noSamePassword":
                return {
                    ...state,
                    noSamePassword: action.payload,
                }
            case "noAddress":
                return {
                    ...state,
                    noAddress: action.payload,
                }
            case "noContact":
                return {
                    ...state,
                    noContact: action.payload,
                }
            case "invalidContact":
                return {
                    ...state,
                    invalidContact: action.payload,
                }
            case "reset":
                return {
                    state: initialValue
                }
            default:
                return state;
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        setProgress(true)
    }, [data])

    const [state, dispatch] = useReducer(reducer, initialValue);

    const submitHandler = async () => {
        dispatch({ type: "reset" })
        if (data.firstname === undefined || data.firstname === "") {
            dispatch({ type: "noFirstName", payload: true })
        }
        else if (data.lastname === undefined || data.lastname === "") {
            dispatch({ type: "noLastName", payload: true })
        }
        else if (data.username === undefined || data.username === "") {
            dispatch({ type: "noUserName", payload: true })
        }
        else if (data.emailid === undefined || data.emailid === "") {
            dispatch({ type: "noEmailId", payload: true })
        }
        else if (data.contact === undefined || data.contact === "") {
            dispatch({ type: "noContact", payload: true })
        }
        else if (data.address === undefined || data.address === "") {
            dispatch({ type: "noAddress", payload: true })
        }
        else if (data.password === undefined || data.password === "") {
            dispatch({ type: "noPassword", payload: true })
        }
        else if (data.confirmPassword === undefined || data.confirmPassword === "") {
            dispatch({ type: "noRePassword", payload: true })
        }
        else {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(data.emailid)) {
                dispatch({ type: "invalidEmailId", payload: true })
            }
            else if (!/^\d{10}$/.test(data.contact)) {
                dispatch({ type: "invalidContact", payload: true })
            }
            else if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/.test(data.password)) {
                dispatch({ type: "invalidPassword", payload: true })
            }
            else if (data.password !== data.confirmPassword) {
                dispatch({ type: "noSamePassword", payload: true })
            }
            else {
                setLoadingWidth("70%")
                await axios.post(`${BASE_URL}check-user/`, {
                    userName: data.username,
                    emailId: data.emailid,
                }).then(async (res) => {
                    if (res.data.status) {
                        setMsg("");
                        await axios.post(`${BASE_URL}add-user/`, {
                            firstName: data.firstname,
                            lastName: data.lastname,
                            userName: data.username,
                            emailId: data.emailid,
                            password: data.password,
                            contact: data.contact,
                            role: 2,
                            address: data.address,
                        }).then((res) => {
                            navigate('/login');
                        }).catch(error => console.log(error.message))
                    }
                    else {
                        setProgress(false)
                        setMsg(res.data.message)
                        setLoadingWidth("0")
                        setProgress(false)
                    }
                }).catch(err => console.log(err.message))
            }
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
                    <Row>
                        <Col className='col-md-6 col-12'>
                            <InputTags props={{ type: "text", name: "firstname", placeholder: "First Name", heading: "First Name", changeHandler: onChangeHandler }} />
                            {state.noFirstName && <p className='error_msg'>Please enter first name</p>}
                        </Col>
                        <Col className='col-md-6 col-12'>
                            <InputTags props={{ type: "text", name: "lastname", placeholder: "Last Name", heading: "Last Name", changeHandler: onChangeHandler }} />
                            {state.noLastName && <p className='error_msg'>Please enter last name</p>}
                        </Col>
                    </Row>
                    <InputTags props={{ type: "text", name: "username", placeholder: "Username", heading: "Username", changeHandler: onChangeHandler }} />
                    {state.noUserName && <p className='error_msg'>Please enter username</p>}
                    {state.existingUserName && <p className='error_msg'>Username already exists</p>}
                    <InputTags props={{ type: "text", name: "emailid", placeholder: "Email Id", heading: "Email ID", changeHandler: onChangeHandler }} />
                    {state.noEmailId && <p className='error_msg'>Please enter email id</p>}
                    {state.invalidEmailId && <p className='error_msg'>Please enter a valid email id</p>}
                    <InputTags props={{ type: "number", name: "contact", placeholder: "Contact No", heading: "Contact", changeHandler: onChangeHandler }} />
                    {state.noContact && <p className='error_msg'>Please enter Contact Number</p>}
                    {state.invalidContact && <p className='error_msg'>Invalid Contact Number</p>}

                    <InputTags props={{ type: "text", name: "address", placeholder: "Address", heading: "Address", changeHandler: onChangeHandler }} />
                    {state.noAddress && <p className='error_msg'>Please enter Address</p>}

                    <InputTags props={{ type: "password", name: "password", placeholder: "Password", heading: "Password", changeHandler: onChangeHandler }} />
                    {state.noPassword && <p className='error_msg'>Please enter password</p>}
                    {state.invalidPassword && <p className='error_msg'>Password should be more than 6 char and should contain 1 letter, number and special char</p>}
                    <InputTags props={{ type: "password", name: "confirmPassword", placeholder: "Confirm Password", heading: "Confirm Password", changeHandler: onChangeHandler }} />
                    {state.noRePassword && <p className='error_msg'>Please re-enter password</p>}
                    {state.noSamePassword && <p className='error_msg'>Please enter same password</p>}
                    <p className='error_msg'>{msg}</p>
                    <div className='d-flex justify-content-between mt-4'>
                        <button className='button_outline font_roboto' onClick={() => { navigate("/login") }}><i className="bi bi-x-lg me-2"></i>Cancel</button>
                        <button className="button_filled font_roboto" onClick={submitHandler}><i className="bi bi-plus-square me-2"></i>Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup