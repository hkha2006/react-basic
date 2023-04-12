import actionTypes from '../actions/actionTypes';

const initialState = {
    // isLoggedIn: false,
    // adminInfo: null
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            // đánh dấu xem đã load dữ liệu xong chưa
            state.isLoadingGender = true
            // console.log('start gender', state)
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            state.isLoadingGender = false
            return {
                ...state,
            }

        // position
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = []
            return {
                ...state,
            }

        // role
        case actionTypes.FETCH_ROLEID_SUCCESS:
            state.roles = action.data
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLEID_FAILED:
            state.roles = []
            return {
                ...state,
            }

        // get all user
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            console.log('failed');
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = []
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDoctors
            return {
                ...state
            }

        case actionTypes.ALL_TOP_DOCTORS_FAILED:
            state.allDoctors = []
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;