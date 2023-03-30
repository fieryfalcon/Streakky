import React, { useEffect, useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { Troubleshoot } from '@mui/icons-material';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../Config/config.js";
import AddIcon from '@mui/icons-material/Add';
import WhatshotRoundedIcon from '@mui/icons-material/WhatshotRounded';
import { collection, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

function App() {
    const user = useSelector((state) => state.user.user);
    const [tasks, setTasks] = useState(user.dos);
    const [streaks, setStreaks] = useState(user.dosCount);
    const [streaked, setStreaked] = useState(user.doStreaked);
    const [newTask, setNewTask] = useState("");
    const [showInput, setShowInput] = useState(false);
    const [display, setDisplay] = useState(true);
    const app = initializeApp(firebaseConfig);
    const [isVisible, setIsVisible] = useState(false);
    const firestore = getFirestore(app);

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

        // Split the given time into hours and minutes
        const [givenHours, givenMinutes] = givenTime.split(':');

        // Create a new date object with the given time
        const targetTime = new Date();
        targetTime.setHours(givenHours);
        targetTime.setMinutes(givenMinutes);


        if (currentTime.getTime() == targetTime.getTime()) {
            console.log(currentTime.getTime(), targetTime.getTime());
            // If the current time is greater than or equal to the given time, then the button has been clicked
            updateUserData(user.uid, { doStreaked: [0, 0, 0] });
            setStreaked([0, 0, 0]);

        }
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



    const handleInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTasks([...tasks, newTask]);
        setNewTask("");
        console.log(tasks)
        setShowInput(false);
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

    const handleAddClick = () => {
        setShowInput(true);
    };

    const handleCancelClick = () => {
        setShowInput(false);
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
        if (tasks.length < 3) {
            setDisplay(true);
        } else {
            setDisplay(false);

        }

        console.log(streaks)
        console.log(tasks);
    });
    return (
        <div>
            <h1>Daily tasks check</h1>
            {showInput ? (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Enter a new task"
                        value={newTask}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Add Task
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                        Cancel
                    </Button>
                </form>
            ) : (
                <>
                    {display ? (
                        <Button variant="contained" color="primary" onClick={handleAddClick}>
                            Add Task
                        </Button>
                    ) : (
                        <Button variant="disabled" color="primary" onClick={handleAddClick}>
                            Add Task
                        </Button>
                    )}
                </>
            )}
            <List>
                {tasks.map((task, index) => {

                    return (
                        <ListItem key={index}>

                            <ListItemText primary={task} />
                            <ListItemText primary={streaks[index]} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" onClick={() => handleDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>
                                {streaked[index] === 0 ? (<Button variant="contained" color="primary" onLoad onClick={() => handleincrement(index)}>
                                    ADD
                                </Button>) : <><Button variant="disabled" color="primary">
                                    ADD
                                </Button></>}



                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
}

export default App;
