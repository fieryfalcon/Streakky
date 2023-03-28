
const initialState = {
    isLoading: true
};

// Define the loading reducer function
const loadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOADING':
            // Return a new state object with the isLoading flag set to the action payload
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

export default loadingReducer;
