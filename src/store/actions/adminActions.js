import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctors, getAllSpecialties, getAllClinics
} from '../../services/userService';
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


export const fetchTopDoctors = (user) => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            })
        }
    }
}

export const saveDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctors(data)
            if (res && res.errCode === 0) {
                toast.success("Success!!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            }
            else {
                toast.error("Error!!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
                })
            }
        } catch (error) {
            toast.error("Error!!!")
            console.log(error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,
            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('TIME')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            })
        }
    }
}

export const getRequireDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_START
            })
            let resPrice = await getAllCodeService('price')
            let resPaymet = await getAllCodeService('payment')
            let resProvice = await getAllCodeService('province')
            let resSpecialty = await getAllSpecialties()
            let resClinic = await getAllClinics()
            if (resPrice && resPrice.errCode === 0
                && resPaymet && resPaymet.errCode === 0
                && resProvice && resProvice.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPaymet: resPaymet.data,
                    resProvice: resProvice.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorSuccess(data))
            }
            else {
                dispatch(fetchRequiredDoctorFailed())
            }
        } catch (error) {
            dispatch(fetchRequiredDoctorFailed())
            console.log(error)
        }
    }

}

export const fetchRequiredDoctorSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})

export const fetchRequiredDoctorFailed = () => ({
    type: actionTypes.FETCH_REQUIRE_DOCTOR_INFOR_FAILED
})