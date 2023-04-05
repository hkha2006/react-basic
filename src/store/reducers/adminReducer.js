import actionTypes from '../actions/actionTypes';

const initialState = {
    // isLoggedIn: false,
    // adminInfo: null
    isLoadingGender: false,
    genders: [],
    roles: [],
    positions: []
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

        default:
            return state;
    }
}

export default adminReducer;