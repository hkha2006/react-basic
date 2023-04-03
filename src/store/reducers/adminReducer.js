import actionTypes from '../actions/actionTypes';

const initialState = {
    // isLoggedIn: false,
    // adminInfo: null
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fire gender', action);
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.data
            console.log('check fetch gender', copyState)
            return {
                ...copyState,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;