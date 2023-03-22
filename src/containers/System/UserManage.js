import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: []
        }
    }

    async componentDidMount() {
        let response = await getAllUsers('all')
        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.users
            })
            // console.log(this.state.arrUser)
        }
    }


    render() {
        let arrUser = this.state.arrUser;
        return (
            <div className="user-container">
                <div className='title text-center'>Manage Users</div>
                <div className='user-table mt-4 mx-3'>
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
                                        <td><a href='#icon'><i className="material-icons">&#xE8B8;</i></a>
                                            <a href='#icon' style={{ color: "red" }}><i className="material-icons">&#xE5C9;</i></a>
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
