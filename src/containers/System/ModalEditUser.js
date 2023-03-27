import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash'
class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phonenumber: ''
        }

    }

    componentDidMount() {
        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'aaa',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phonenumber: user.phonenumber
            })
        }
        console.log('didmount edit modal ', this.props.currentUser)
    }

    toggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, id) => {
        let tempState = { ...this.state }
        tempState[id] = event.target.value
        this.setState({
            ...tempState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phonenumber']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing Para: ', arrInput[i])
                break
            }
        }
        return isValid
    }

    handleSaveUser = () => {
        // call api edit user
        if (this.checkValidateInput()) {
            this.props.editUser(this.state)
        }
    }
    render() {
        // console.log('check child', this.props.isOpen)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                fullscreen='xl'
                size='xl'
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>
                    <div classNameName='container'>
                        <form action="/post-crud/" method="post">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Email"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                        value={this.state.email}
                                        disabled
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'password') }}
                                        value={this.state.password}
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label for="inputEmail4">Frist Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        placeholder="First Name"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                        value={this.state.firstName}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label for="inputPassword4">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        placeholder="Last Name"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                        value={this.state.lastName}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="inputAddress">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    placeholder="1234 Main St"
                                    onChange={(event, id) => { this.handleOnChangeInput(event, 'address') }}
                                    value={this.state.address}
                                />
                            </div>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <label for="inputCity">Phonenumber</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phonenumber"
                                        onChange={(event, id) => { this.handleOnChangeInput(event, 'phonenumber') }}
                                        value={this.state.phonenumber}
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputState">Sex</label>
                                    <select name="gender" className="form-control">
                                        <option value="1">Male</option>
                                        <option value="0">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label for="inputZip">Role</label>
                                    <select name="roleId" className="form-control">
                                        <option value="1">Admin</option>
                                        <option value="2">Doctor</option>
                                        <option value="3">Paitent</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => { this.handleSaveUser() }}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
