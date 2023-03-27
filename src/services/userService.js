import axios from "../axios"
const handleLogin = (email, password) => {
    return axios.post('api/login', { email, password })
}

const getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}

const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}

const deleteUserService = (userId) => {
    return axios.delete(`/api/delete-user`, { data: { id: userId } })
}

const editUserService = (user) => {
    return axios.put('/api/update-user', user)
}
export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService
}

