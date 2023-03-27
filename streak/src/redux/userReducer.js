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


