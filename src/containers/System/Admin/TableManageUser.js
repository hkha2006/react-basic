import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (id) => {
        this.props.deleteUser(id)
    }

    handleEditUser = (data) => {
        this.props.handleEditUserFromParent(data)
    }

    render() {
        let arrUser = this.state.usersRedux
        // console.log('check all user', arrUser);
        return (
            <div className="user-container">
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
                            {arrUser && arrUser.length > 0 && arrUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td><a href='#icon'><i className="material-icons"
                                            onClick={() => { this.handleEditUser(item) }}>&#xE8B8;</i></a>
                                            <a href='#icon' style={{ color: "red" }}
                                                onClick={() => { this.handleDeleteUser(item.id) }}><i className="material-icons">&#xE5C9;</i></a>
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
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

