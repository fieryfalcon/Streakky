import * as React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useMediaQuery } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import WatchIcon from '@mui/icons-material/Watch';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { initializeApp } from "firebase/app";
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../Config/config.js";
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { orange } from '@mui/material/colors';
import { remove } from 'js-cookie';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import { Window } from '@mui/icons-material';
import Cookies from 'universal-cookie';
import { setUser } from '../redux/action';
import { useDispatch } from 'react-redux';
const drawerWidth = 340;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));


const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));

export default function Navbar() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [time, setTime] = React.useState(false);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [selectedTime, setSelectedTime] = useState(dayjs('2022-04-17T15:30'));
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);


    const uid = user.uid;
    console.log(uid)



    const handleTimeChange = (time) => {
        setSelectedTime(time);
        console.log(time.$H + ":" + time.$m);
        const updateUserData = async (uid, field) => {
            const userDocRef = doc(collection(firestore, 'users'), uid);
            try {
                await updateDoc(userDocRef, field);
                console.log('User data updated successfully.');
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        };
        async function getUserData(uid) {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);
            dispatch(setUser(docSnap.data()));
            console.log(user);
            console.log("WORKING");


        }
        updateUserData(uid, { time: time.$H + ":" + time.$m }).then(() => { getUserData(uid); });


        // async function getUserData(uid) {
        //     const docRef = doc(firestore, "users", uid);
        //     const docSnap = await getDoc(docRef);
        //     if (docSnap.exists()) {

        //         const cookie = new Cookies();
        //         cookie.set("user", docSnap.data());
        //         console.log(cookie.get("user") + "   /////   obatined");
        //         dispatch(setUser(docSnap.data()));
        //     } else {
        //         console.log("No such document!");
        //         return null;
        //     }
        // }



    };
    const logout = () => {
        const cookie = new Cookies();
        const user2 = cookie.get("user");
        document.cookie = 'user=' + user2 + '; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        dispatch(setUser(null));
    }
    const timeopen = () => {
        if (open) {
            setTime(true);
        } else {
            setTime(false);
        }
    }
    const timeclose = () => {
        setTime(false);
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        setTime(false);
    };
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:1080px)');
    const drawerWidth = isMobile ? '100%' : isTablet ? "60%" : "30%";
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                sx={{ ...(open && { display: 'none' }) }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <Typography>{user.displayName}</Typography>
                    <img src={user.photoURL} alt="user" style={{ height: '45px', marginLeft: '20px', borderRadius: '50%' }} />

                </DrawerHeader>
                <Divider />
                <Typography>{user.displayName}</Typography>
                <List>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText>
                                About the App
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <WatchIcon />
                            </ListItemIcon>

                            {time ? <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <StaticTimePicker
                                    value={selectedTime}
                                    onChange={handleTimeChange}
                                    onClose={timeclose}
                                    onAccept={handleTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />

                            </LocalizationProvider> : <><ListItemText>
                                Change Day start time
                            </ListItemText><ListItemButton onClick={timeopen}>
                                    <ListItemIcon>
                                        <ManageAccountsIcon />
                                    </ListItemIcon>

                                </ListItemButton></>}


                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <ContactPageIcon />
                            </ListItemIcon>
                            <ListItemText>
                                Contact Us
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                </List>
                {/* <Divider light={true} textAlign='center' variant='middle'><Typography style={{ margintop: "10px" }}>Streak</Typography></Divider> */}
                <Divider />
                <h3>Streaks 🔥</h3>
                {time == false ? <List>
                    <ListItem disablePadding>
                        <ListItemText>
                            <Typography>
                                Ongoing streaks :
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText>
                            <Typography>
                                Broken Streaks :
                            </Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemText>
                            <Typography>
                                Highest Record :
                            </Typography>
                        </ListItemText>
                    </ListItem>
                </List> : <></>}

                <Divider />
                <div>
                    <ColorButton variant="contained" onClick={logout}><Typography>Logout</Typography> <LogoutIcon /></ColorButton>
                </div>




            </Drawer>
        </Box >
    );
}