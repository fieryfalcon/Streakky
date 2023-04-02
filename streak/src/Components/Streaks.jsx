import React, { useEffect, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { Troubleshoot } from '@mui/icons-material';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../Config/config.js";
import { makeStyles } from '@material-ui/core/styles';
import { useSwipeable } from 'react-swipeable';

import AddIcon from '@mui/icons-material/Add';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import "../style/Components.css";
import Divider from '@mui/material/Divider';
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const useStyles = makeStyles({
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

function App({ data }) {
    const user = useSelector((state) => state.user.user);
    const [tasks, setTasks] = useState(user.dos);
    const [streaks, setStreaks] = useState(user.dosCount);
    const [streaked, setStreaked] = useState(user.doStreaked);
    const [newTask, setNewTask] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [display, setDisplay] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    const [tasks2, setTasks2] = useState(user.donts);
    const [streaks2, setStreaks2] = useState(user.dontsCount);
    const [streaked2, setStreaked2] = useState(user.dontStreaked);
    const [newTask2, setNewTask2] = useState("");
    const [showInput2, setShowInput2] = useState(false);
    const [display2, setDisplay2] = useState(true);
    const [isVisible2, setIsVisible2] = useState(false);


    const [pageIndex, setPageIndex] = useState(0);

    const handleSwipe = (delta) => {
        setPageIndex((prevIndex) => prevIndex + delta);
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe(1),
        onSwipedRight: () => handleSwipe(-1),
    });

    const updateUserData = async (uid, field) => {
        const userDocRef = doc(collection(firestore, 'users'), uid);
        try {
            await updateDoc(userDocRef, field);
            console.log('User data updated successfully.');
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    function checkTime(givenTime) {
        // Get the current time
        const currentTime = new Date();
        let isConditionMet = false;

        // Split the given time into hours and minutes
        const [givenHours, givenMinutes] = givenTime.split(':');

        // Create a new date object with the given time
        const targetTime = new Date();
        targetTime.setHours(givenHours);
        targetTime.setMinutes(givenMinutes);


        if (currentTime.getTime() == targetTime.getTime() && !isConditionMet) {
            console.log(currentTime.getTime(), targetTime.getTime());
            // If the current time is greater than or equal to the given time, then the button has been clicked
            updateUserData(user.uid, { doStreaked: [0, 0, 0] });
            setStreaked([0, 0, 0]);



        }
        isConditionMet = true;




    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            checkTime(user.time);


        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, [user.time]);



    function shiftAndReplace(arr, index) {
        if (index < 0 || index >= arr.length) {
            throw new Error('Invalid index');
        }
        for (let i = index; i < arr.length - 1; i++) {
            arr[i] = arr[i + 1];
        }
        arr[arr.length - 1] = 0;
        return arr;
    }

    const handleincrement = (index) => {


        const newStreaks = [...streaks];
        newStreaks[index] = newStreaks[index] + 1;
        const newStreaked = [...streaked];
        newStreaked[index] = 1;
        setStreaked(newStreaked);
        setStreaks(newStreaks);
        setIsVisible(false);
        console.log(streaked + "this ")





    }

    const handleincrement2 = (index) => {


        const newStreaks2 = [...streaks2];
        newStreaks2[index] = newStreaks2[index] + 1;
        const newStreaked2 = [...streaked2];
        newStreaked2[index] = 1;
        setStreaked2(newStreaked2);
        setStreaks2(newStreaks2);
        setIsVisible2(false);
        console.log(streaked2 + "this ")





    }



    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setNewTask2(event.target.value);
        console.log(newTask2)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTasks([...tasks, newTask]);
        setNewTask("");
        console.log(tasks)
        setShowInput(false);
    };
    const handleSubmit2 = (event) => {
        event.preventDefault();
        setTasks2([...tasks2, newTask2]);
        setNewTask2("");
        console.log(tasks2)
        setShowInput2(false);
    };

    const handleDelete = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);

        const newStreaks = [...streaks];
        shiftAndReplace(newStreaks, index);
        console.log(newStreaks);
        setStreaks(newStreaks);



    };
    const handleDelete2 = (index) => {
        const newTasks2 = [...tasks2];
        newTasks2.splice(index, 1);
        setTasks2(newTasks2);

        const newStreaks2 = [...streaks2];
        shiftAndReplace(newStreaks2, index);
        console.log(newStreaks2);
        setStreaks(newStreaks2);



    };

    const handleAddClick = () => {
        setShowInput(true);
    };
    const handleAddClick2 = () => {
        setShowInput2(true);
    };

    const handleCancelClick = () => {
        setShowInput(false);
    };
    const handleCancelClick2 = () => {
        setShowInput2(false);
    };

    useEffect(() => {
        updateUserData(user.uid, { dos: tasks });
    }, [tasks]);

    useEffect(() => {
        updateUserData(user.uid, { doStreaked: streaked });
    }, [streaked]);

    useEffect(() => {
        updateUserData(user.uid, { dosCount: streaks });
    }, [streaks]);
    useEffect(() => {
        updateUserData(user.uid, { donts: tasks2 });
    }, [tasks2]);

    useEffect(() => {
        updateUserData(user.uid, { dontStreaked: streaked2 });
    }, [streaked2]);

    useEffect(() => {
        updateUserData(user.uid, { dontsCount: streaks2 });
    }, [streaks2]);

    useEffect(() => {
        if (tasks2.length < 5) {
            setDisplay2(true);
        } else {
            setDisplay2(false);

        }

        console.log(streaks2)
        console.log(tasks2);
    });
    useEffect(() => {
        if (tasks.length < 5) {
            setDisplay(true);
        } else {
            setDisplay(false);

        }

        console.log(streaks)
        console.log(tasks);
    });
    return (

        <>
            <div id='table-combined' >
                <div id="table">

                    {showInput ? (
                        <form onSubmit={handleSubmit}>
                            <div id='table-topic-search'>
                                <TextField
                                    label="Enter a new task within 120 chars"
                                    value={newTask}
                                    required
                                    onChange={handleInputChange}
                                    inputProps={{ maxLength: 120 }}
                                    style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px", backgroundColor: "white", width: "30%" }}
                                />

                                <button type="submit" id='button1'>Add a Habit to monitor</button>
                                <button onClick={handleCancelClick} id='button1'>Cancel</button>
                            </div>


                        </form>
                    ) : (
                        <>
                            {display ? (
                                <div id='table-topic-nosearch'><h1>Habits to build</h1>
                                    <a onClick={handleAddClick} id="button1">Add a new Habit</a>
                                </div>
                            ) : (
                                <>

                                    <div id='table-topic-nosearch'><h1>Habits to build</h1>
                                        <Button variant="disabled" color="primary" onClick={handleAddClick} id="button1">
                                            Limit reached cant add further
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <List>
                        {tasks.map((task, index) => {

                            return (
                                <ListItem key={index} id="task-container">
                                    <div id='task-text'><ListItemText id='task-text' primary={task} style={{ width: "100%" }} /></div>
                                    <div id='task-streak'>
                                        {streaked[index] === 0 ? (<div id='list-streak-button'><ListItemText primary={streaks[index]} /><button onClick={() => handleincrement(index)}>
                                            💥
                                        </button></div>) : <div id='list-streak-button'><ListItemText primary={streaks[index]} /><Button variant="disabled" color="primary">
                                            💥
                                        </Button></div>}</div>
                                    <div id='task-delete'>
                                        <IconButton edge="end" onClick={() => handleDelete(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <Divider />


                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <div id="table">

                    {showInput2 ? (
                        <form onSubmit={handleSubmit2}>
                            <div id='table-topic-search2'>
                                <TextField
                                    label="Enter a new task within 120 chars"
                                    value={newTask2}
                                    required
                                    onChange={handleInputChange2}
                                    inputProps={{ maxLength: 120 }}
                                    style={{ marginTop: "20px", marginLeft: "20px", marginBottom: "10px", backgroundColor: "white", width: "30%" }}

                                />

                                <button type="submit" id='button3'>Add a Habit to monitor</button>
                                <button onClick={handleCancelClick2} id='button3'>Cancel</button>
                            </div>


                        </form>
                    ) : (
                        <>
                            {display2 ? (
                                <div id='table-topic-nosearch2'><h1>Habits to break</h1>
                                    <a onClick={handleAddClick2} id="button3">Add a new Habit</a>
                                </div>
                            ) : (
                                <>

                                    <div id='table-topic-nosearch2'><h1>Habits to break</h1>
                                        <Button variant="disabled" color="primary" onClick={handleAddClick2} id="button3">
                                            Limit reached cant add further
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                    <List>
                        {tasks2.map((task, index) => {

                            return (
                                <ListItem key={index} id="task-container">
                                    <div id='task-text'><ListItemText id='task-text' primary={task} style={{ width: "100%" }} /></div>
                                    <div id='task-streak'>
                                        {streaked2 && streaked2[index] === 0 ? (
                                            <div id='list-streak-button'>
                                                <ListItemText primary={streaks2 && streaks2[index]} />
                                                <button onClick={() => handleincrement2(index)}>
                                                    💥
                                                </button>
                                            </div>
                                        ) : (
                                            <div id='list-streak-button'>
                                                <ListItemText primary={streaks2 && streaks2[index]} />
                                                <Button variant="disabled" color="primary">
                                                    💥
                                                </Button>
                                            </div>
                                        )}</div>
                                    <div id='task-delete'>
                                        <IconButton edge="end" onClick={() => handleDelete2(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                    <Divider />


                                </ListItem>
                            );
                        })}
                    </List>
                </div>

            </div>
        </>




    );
}

export default App;
