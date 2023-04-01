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
import Login from '../Components/Login';
import Streaks from '../Components/Streaks';
import { Link } from 'react-scroll';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
let boy = require('../images/blah.png');
let fire = require('../images/fire.png');




const LoadingAnimation = () => {


    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
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



    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsOpen(open);
    };
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
                {user !== null ?
                    <>
                        <div id="page01">
                            <div id="navbar2">
                                <div id="logo">
                                    <img src={fire} id="fire-image-logo" />
                                    <h1>Streakky</h1>
                                </div>
                                <div id='menu-signedin'>
                                    <Navbar />
                                </div>
                            </div>
                            <Streaks />
                        </div>

                    </>
                    :
                    <>
                        <div id="page01">
                            <div id="navbar2">
                                <div id="logo">
                                    <img src={fire} id="fire-image-logo" />
                                    <h1>Streakky</h1>


                                </div>


                                <div id="nav">
                                    <IconButton onClick={toggleDrawer(true)} style={{ height: "40px", width: '40px' }}>
                                        <div class="menu-icon">
                                            <span class="bar"></span>
                                            <span class="bar"></span>
                                            <span class="bar"></span>
                                        </div>
                                    </IconButton>
                                    <ul id='unlisted1'>
                                        <li className='li-item'>
                                            <Link to="page02" smooth={true}>Home</Link>
                                        </li>
                                        <li className='li-item'>
                                            <Link to="page03" smooth={true}>About</Link>
                                        </li>
                                        <li className='li-item'><a href="#">Contact</a></li>
                                        <li className='li-item'>
                                            <Login />
                                        </li>

                                    </ul>

                                </div>
                                <SwipeableDrawer
                                    anchor="right"
                                    open={isOpen}
                                    onClose={toggleDrawer(false)}
                                    onOpen={toggleDrawer(true)}
                                >
                                    <ul>
                                        <li> <Link to="page02" smooth={true}>Home</Link></li>
                                        <li> <Link to="page03" smooth={true}>About</Link></li>
                                        <li><Link to="page03" smooth={true}>About</Link></li>
                                        <li>
                                            <Login />
                                        </li>
                                    </ul>

                                </SwipeableDrawer>

                            </div>
                            <div id="hero-section">
                                <div id='hero-container'>
                                    <div id='text'>
                                        Make every day count with healthy habits.
                                    </div>
                                    <div id='text2'>
                                        "Ready to take control of your life? Start building healthy habits
                                        today and make every day count. Sign in now to get started
                                    </div>
                                    <div id='google-container'>
                                        <Login />
                                    </div>

                                </div>
                                <div id='hero-container2'>
                                    <img src={boy} />
                                </div>

                            </div>

                        </div>
                        <div id="page02">
                            hfhwegfyfee
                        </div>
                        <div id="page03">
                            hfhwegfyfeedfhhfyttfutuvhgy
                        </div>
                    </>
                }

            </>}</>





    )
}

export default LoadingAnimation;