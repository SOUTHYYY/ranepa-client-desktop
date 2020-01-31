
const initialState = {
    pins: [
        {
            id: 1,
            latitude: 56.3081,
            longitude: 43.9863
        },
        {
            id: 2,
            latitude: 56.3181,
            longitude: 43.9763
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