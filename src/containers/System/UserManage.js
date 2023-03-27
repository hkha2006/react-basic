import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUserService, handleLogin, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser'
import ModalEditUser from './ModalEditUser'
import { emitter } from '../../utils/emitter'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenEditModalUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsers()
    }

    getAllUsers = async () => {
        let response = await getAllUsers('all')
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
            // console.log(this.state.arrUser)
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    toggleEditUserModal = () => {
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            console.log('create new user', response)
            if (response && response.errCode !== 0) {
                alert(response.message)
            }
            else {
                await this.getAllUsers();
                this.toggleUserModal();
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (error) {
            console.log(error)
        }

    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id)
            if (response && response.errCode !== 0) {
                alert(response.message)
            }
            else {
                await this.getAllUsers();
            }
        } catch (error) {
            console.log(error)
        }
        // console.log(userId)
    }

    handleEditUser = (user) => {
        console.log('check edit user', user.id)
        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user)
            console.log('update user', res)
            if (res && res.errCode !== 0) {
                alert(res.message)
            }
            else {
                await this.getAllUsers();
                this.toggleEditUserModal();
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrUser = this.state.arrUser;
        // console.log(arrUser)
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenEditModalUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenEditModalUser}
                        toggle={this.toggleEditUserModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage Users</div>
                <div className='user-table container'>
                    <button type="button"
                        className="btn btn-primary my-1 px-3"
                        onClick={() => { this.handleAddNewUser() }}><i className="fas fa-plus"></i> Add New User</button>
                    <table className="table table-hover">
                        <thead>
                            <tr className='table-success'>
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">First name</th>
                                <th scope="col">Last name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUser && arrUser.map((item, index) => {
                                // console.log('hello', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td><a href='#icon'><i className="material-icons" onClick={() => this.handleEditUser(item)}>&#xE8B8;</i></a>
                                            <a href='#icon' style={{ color: "red" }} onClick={() => { this.handleDeleteUser(item) }}><i className="material-icons">&#xE5C9;</i></a>
                                        </td>
                                    </tr>
                                )
                            })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

