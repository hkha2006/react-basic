import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormattedMessage } from 'react-intl';
// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            position: '',
            gender: '',
            role: '',
            avt: '',
            action: '',
            userId: ''
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let arrPositions = this.props.positions
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let arrRoles = this.props.roles
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrPositions = this.props.positions
            let arrRoles = this.props.roles
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avt: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: ''

            })
        }
    }
    handledOnChangeImg = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            // chuyển ảnh thành base64
            let base64 = await CommonUtils.getBase64(file)
            // console.log('check file to base64', base64);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avt: base64
            })
        }
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    hanldeSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return
        let action = this.state.action
        //fire redux action
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.avt
            })
        }
        if (action === CRUD_ACTIONS.UPDATE) {
            console.log('check id', this.state.userId);
            this.props.updateUserReudx({
                id: this.state.userId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                image: this.state.avt

            })
        }



        this.props.fetchUserRedux()
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('this input is required ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    onChangeInput = (event, id) => {
        //Không sử đổi trực tiếp state mà phải thông qua 1 biến khác
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
        // console.log('check state', this.state.role);
    }

    handleEditUser = (user) => {
        let imageBase64 = ''
        // chuyển base64 thành ảnh
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        // console.log('check handle edit user', user);

        this.setState({
            email: user.email,
            password: 'hashcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.position,
            roles: user.roleId,
            avt: '',
            action: CRUD_ACTIONS.UPDATE,
            userId: user.id,
            previewImgUrl: imageBase64

        }, () => { console.log('check img', this.state.previewImgUrl); }
        )
    }

    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        let positions = this.props.positions
        let roles = this.props.roles
        let isLoadingGender = this.props.isLoadingGender
        // console.log('check state from redux ', this.state);

        let { email, password, firstName, lastName, phoneNumber, address, position, gender, role } = this.state

        return (
            <div>
                <div className='title'>
                    <FormattedMessage id="manage-user.add" />
                </div>
                {isLoadingGender ? <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div> :
                    <div className='container'>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><FormattedMessage id="manage-user.email" /></Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label><FormattedMessage id="manage-user.pass" /></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }}
                                        disabled={this.state.action === CRUD_ACTIONS.UPDATE ? true : false} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><FormattedMessage id="manage-user.firstname" /></Form.Label>
                                    <Form.Control
                                        placeholder="first name"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label><FormattedMessage id="manage-user.lastname" /></Form.Label>
                                    <Form.Control
                                        placeholder="last name"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridAddress">
                                    <Form.Label><FormattedMessage id="manage-user.address" /></Form.Label>
                                    <Form.Control
                                        placeholder='123 ADV'
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label><FormattedMessage id="manage-user.phone" /></Form.Label>
                                    <Form.Control
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label><FormattedMessage id="manage-user.gender" /></Form.Label>
                                    <Form.Select defaultValue="Choose..."
                                        value={gender}
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    >
                                        {genders && genders.length > 0 && genders.map((item, index) =>
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )}

                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label><FormattedMessage id="manage-user.position" /></Form.Label>
                                    <Form.Select defaultValue="Choose..."
                                        value={position}
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                    >
                                        {positions && positions.length > 0 && positions.map((item, index) =>
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>RoleId</Form.Label>
                                    <Form.Select defaultValue="Choose..."
                                        value={role}
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    >
                                        {roles && roles.length > 0 && roles.map((item, index) =>
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formFile" className="mb-3">
                                    <Form.Label><FormattedMessage id="manage-user.img" /></Form.Label>
                                    <div className='preview-img-content'>
                                        <input id="previewImg" type='file' hidden
                                            onChange={(event) => this.handledOnChangeImg(event)}
                                        >
                                        </input>
                                        <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className="fas fa-upload fa-lg"></i></label>
                                        <div className='preview-Img'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImg()}
                                        >

                                        </div>
                                    </div>
                                </Form.Group>
                            </Row>

                            <Button variant={this.state.action === CRUD_ACTIONS.UPDATE ? "warning" : "primary"}
                                type="submit"
                                onClick={() => this.hanldeSaveUser()}
                            >
                                <Form.Label><FormattedMessage id={this.state.action === CRUD_ACTIONS.UPDATE ? "manage-user.edit" : "manage-user.submit"} /></Form.Label>
                            </Button>

                            {this.state.isOpen &&
                                <Lightbox
                                    mainSrc={this.state.previewImgUrl}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </Form>
                        <TableManageUser
                            handleEditUserFromParent={this.handleEditUser}
                            action={this.state.action} />

                    </div>


                }

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positions: state.admin.positions,
        roles: state.admin.roles,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        updateUserReudx: (data) => dispatch(actions.updateUser(data))


        // processLogout: () => dispatch(actions.processLogout()),
        // changeLaguageAppRedux: (language) => dispatch(actions.changeLaguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
