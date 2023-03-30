// userReducer.js

const SET_USER = 'SET_USER';

const initialState = {
    user: null,
};


export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};



// const handleClick = () => {
//     // Set the button clicked state to true and hide the time
//     setIsButtonClicked(true);
//     setIsVisible(false);
// };


