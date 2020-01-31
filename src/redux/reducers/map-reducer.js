
const initialState = {
    pins: [
        {
            id: 1,
            latitude: 56.3081,
            longitude: 43.9863
        }
    ],
}


const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_NEW_PIN':
            return {
                ...state,
            }

        default:
            return state
    }
}


export default mapReducer