import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers, deleteUserService, editUserService } from '../../services/userService';
import { toast } from 'react-toastify';


//gender
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('gender')
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            }
            else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log(error)
        }
    }

}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

// position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('position')
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            }
            else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log(error)
        }
    }

}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

// Role

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('role')
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            }
            else {
                dispatch(fetchRoleFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log(error)
        }
    }

}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLEID_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLEID_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            console.log('check user redux: ', data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess(res.data))
                dispatch(fetchAllUsersStart())
                toast.success("Success!!!")
            }
            else {
                dispatch(createUserFailed())
            }
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log(error)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})

export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers('all')
            if (res && res.errCode === 0) {
                //săp xếp danh sách theo thứ tự gần nhất
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }
            else {
                dispatch(fetchAllUsersFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log(error)
        }
    }

}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success("Delete user success!!!")
            }
            else {
                dispatch(deletesUserFailed())
                toast.error("Delete user failed!!!")

            }
        } catch (error) {
            dispatch(deletesUserFailed())
            console.log(error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deletesUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

// cập nhật user
export const updateUser = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess())
                dispatch(fetchAllUsersStart())
                toast.success("Update user success!!!")
            }
            else {
                dispatch(updateUserFailed())
                toast.error("Update user failed!!!")

            }
        } catch (error) {
            dispatch(deletesUserFailed())
            console.log(error)
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,
})

export const updateUserFailed = () => ({
    type: actionTypes.UPDATE_USER_FAILED
})