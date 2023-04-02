import React, { useState, useEffect } from 'react';
import "../style/Components.css";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
const STEPS = [
    "Create a habit that you want to include in your life and a habit that you want to break.",
    "Set the day start time in the settings or menu icon to match your daily routine.",
    "Come back to the app every day when your day is complete to add a streak for the habits you have kept up with.",
    "If you miss a day, you can delete the streak, but try not to do that.",
    "Watch as your streaks grow and feel motivated to continue building healthy habits in your life.",
    "Repeat this process daily to build a consistent routine and see long-term improvements in your well-being.",
    "Enjoy the benefits of maintaining streaks and achieving your goals with our app!",
    "Download our app today and start building lasting habits."
];

const Instructions = () => {
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(currentStep => (currentStep + 1) % STEPS.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const handlePrev = () => {
        setCurrentStep(currentStep => (currentStep - 1 + STEPS.length) % STEPS.length);
    };

    const handleNext = () => {
        setCurrentStep(currentStep => (currentStep + 1) % STEPS.length);
    };

    return (

        <div id='instruction'><button onClick={handlePrev}>
            <ChevronLeftIcon />
        </button><div id='instructions-text'>{STEPS[currentStep]}</div><button onClick={handleNext}>
                <ChevronRightIcon />
            </button>
        </div>


    );
};

export default Instructions;
