import React, { useState, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { BASE_URL } from './../common/helper.js';

const GoogleLoginComp = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [bannedUser, setBannedUser] = useState(false)
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (profile.verified_email) {
            addUser()
        }
    }, [user, profile])

    const addUser = async () => {
        // console.log(profile)
        await axios.post(`${BASE_URL}google-login`, {
            firstName: profile.given_name,
            lastName: profile.family_name,
            userName: profile.name,
            emailId: profile.email,
            password: profile.id,
        }).then((res) => {
            if (res.data.id === 5) {
                setBannedUser(true)
            } else {
                Cookies.set('bookMySeatUser', JSON.stringify(res.data.user), { expires: 1 });
                Cookies.set('bookMySeatToken', res.data.token, { expires: 1 });
                navigate('/')
            }
        }).catch((error) => console.log(error))
    }

    useEffect(
        () => {
            if (user) {
                setBannedUser(false)
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    return (
        <>
            {bannedUser && <p className='error_msg text-center'>Your Account is Suspended. Kindly, Contact Support.</p>}
            <button className='button_outline long_button' onClick={() => login()}><i className="bi bi-google me-2"></i>Sign in with Google</button>
        </>
    )
}

export default GoogleLoginComp
