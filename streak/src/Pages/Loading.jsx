import { React, useEffect } from 'react';
import "../style/Loading.css";
import { setUser } from '../redux/action';
import { useDispatch } from 'react-redux';
import Cookies from "cookie-js";
let fire = require('../images/fire.png');





const LoadingAnimation = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const cookieValue = "sudarsan";
        dispatch(setUser(cookieValue));

        console.log(dispatch(setUser(cookieValue)));
    }, []);


    return (

        <div id='fire2'>
            <div id='fire_border'>
                <img id="fire" src={fire} />
            </div>
        </div>




    )
}

export default LoadingAnimation;