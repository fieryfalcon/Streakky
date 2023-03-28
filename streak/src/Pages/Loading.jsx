import { React, useEffect, useState } from 'react';
import "../style/Loading.css";
import { setUser } from '../redux/action';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import firebaseConfig from "../Config/config.js";
import { useNavigate, useParams } from 'react-router-dom';
let fire = require('../images/fire.png');



const LoadingAnimation = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

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
        // let timeoutId = setTimeout(() => {
        //     setLoading(true); // set loading to true after 3 seconds
        // }, 3000);

        if (Cookies.get('user')) {
            const user_cookie = Cookies.get('user');
            const parsedValue = JSON.parse(user_cookie);
            console.log(parsedValue.uid);
            getUserData(parsedValue.uid).then((data) => {
                sessionStorage.setItem('user', JSON.stringify(data));
                console.log(data);
            });




            // clearTimeout(timeoutId); // clear the timeout if the process completes before 3 seconds
            setTimeout(() => {
                navigate('/landing');



            }, 2000);
            setTimeout(() => { setLoading(false); }, 10000)
        }
    }, []);




    return (
        <>
            {loading ? <div id='background'>
                <div id='fire2'>
                    <div id='fire_border'>
                        <img id="fire" src={fire} />
                    </div>
                </div>
            </div> : <></>}</>





    )
}

export default LoadingAnimation;