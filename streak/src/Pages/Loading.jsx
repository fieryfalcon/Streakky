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
import Instructions from '../Components/Instructions';
import Login from '../Components/Login';
import Streaks from '../Components/Streaks';
import About from '../Components/About';
import { Link } from 'react-scroll';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Carousel } from 'react-bootstrap';
import styled from 'styled-components';
import { MarkGithubIcon } from '@primer/octicons-react';
let boy = require('../images/blah.png');
let fire = require('../images/fire.png');
let github = require('../images/git.png');

const Button = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  color: #24292e;
  background-color: #eff3f6;
  border: 1px solid rgba(27, 31, 35, 0.2);
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #e6ebf1;
    border-color: rgba(27, 31, 35, 0.35);
  }
`;

const Icon = styled(MarkGithubIcon)`
  margin-right: 8px;
`;

const GithubButton = ({ href }) => (
    <Button href="https://github.com/fieryfalcon/Streakky" target="_blank">
        <Icon size={19} />
        View on GitHub
    </Button>
);






const LoadingAnimation = () => {


    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const user = useSelector((state) => state.user.user);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    const images = [
        { src: { fire }, alt: 'Image 1' },
        { src: { fire }, alt: 'Image 2' },
        { src: { fire }, alt: 'Image 3' },
    ];

    const goToSlide = (slideNumber) => {
        setCurrentSlide(slideNumber);
    };
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
                                <div id='menu-signedin' style={{ display: 'flex', alignItems: 'center', paddingLeft: "10px" }}>

                                    <h3 id='name'>{user.displayName}</h3>
                                    <Navbar onSlideChange={goToSlide} />
                                </div>
                            </div>
                            <Streaks />
                        </div>
                        <div id="page02">
                            <About />
                            <Instructions />
                        </div>
                        <div id="page03">
                            <div id="github-cat">
                                <div id="github-image"><img src={github} /></div>
                                <div>
                                    <div id='github-text'>Love what you're seeing...Dont hesitate to give a star in Github..!<br /><br />Cheers...🍻</div>
                                    <div id="github-button"><GithubButton /></div>
                                </div>

                            </div>
                            <div id="sudarsan"><b>Made with ❤️ by </b><a href='https://github.com/fieryfalcon' target="_blank">@fieryfalcon</a></div>
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
                                            <Link to="page01" smooth={true}>Home</Link>
                                        </li>
                                        <li className='li-item'>
                                            <Link to="page02" smooth={true}>About</Link>
                                        </li>
                                        <li className='li-item'><Link to="page03" smooth={true}>Github</Link></li>
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
                                    <ul id="unlisted2">
                                        <li> <Link to="page01" smooth={true}>Home</Link></li>
                                        <li> <Link to="page02" smooth={true}>About</Link></li>
                                        <li><Link to="page03" smooth={true}>Github</Link></li>
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
                            <About />
                            <Instructions />
                        </div>
                        <div id="page03">
                            <div id="github-cat">
                                <div id="github-image"><img src={github} /></div>
                                <div>
                                    <div id='github-text'>Love what you're seeing...Dont hesitate to give a star in Github..!<br /><br />Cheers...🍻</div>
                                    <div id="github-button"><GithubButton /></div>
                                </div>

                            </div>
                            <div id="sudarsan"><b>Made with ❤️ by </b><a href='https://github.com/fieryfalcon' target="_blank">@fieryfalcon</a></div>
                        </div>
                    </>
                }

            </>}</>





    )
}

export default LoadingAnimation;