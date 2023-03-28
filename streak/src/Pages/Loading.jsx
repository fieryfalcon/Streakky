import { React, useEffect, useState } from 'react';
import "../style/Loading.css";
import { setUser } from '../redux/action';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../Config/config.js";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
// import Login from '../Components/Login';
let fire = require('../images/fire.png');




const LoadingAnimation = () => {


    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const user = useSelector((state) => state.user.user);
    console.log('Redux state:', user);

    async function getUserData(uid) {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            console.log("No such document!");
            return null;
        }
    }

    const navigate = useNavigate();

    useEffect(() => {

        if (Cookies.get('user')) {
            const user_cookie = Cookies.get('user');
            const parsedValue = JSON.parse(user_cookie);
            console.log(parsedValue.uid);
            getUserData(parsedValue.uid).then((data) => {
                sessionStorage.setItem('user', JSON.stringify(data));
                dispatch(setUser(data));
                console.log(user)
            });
        } else {
            dispatch(setUser(null));
            console.log(user)
        }




        // clearTimeout(timeoutId); // clear the timeout if the process completes before 3 seconds
        setTimeout(() => {

            setLoading(false);
        }, 5000);

    }, []);




    return (
        <>
            {loading ? <div id='background'>
                <div id='fire2'>
                    <div id='fire_border'>
                        <img id="fire" src={fire} />
                    </div>
                </div>
            </div> : <>
                {user !== null ? <><h1>Hey you are {user.displayName}</h1><Navbar /></> : <><h1>Hey you are not logged in</h1></>}

            </>}</>





    )
}

export default LoadingAnimation;