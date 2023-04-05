import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormattedMessage } from 'react-intl';
// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
            avt: ''
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
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.positions !== this.props.positions) {
            let arrPositions = this.props.positions
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if (prevProps.roles !== this.props.roles) {
            let arrRoles = this.props.roles
            this.setState({
                roleArr: arrRoles,
                roles: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
    }
    handledOnChangeImg = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avt: file
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
        if (isValid === false) return;
        //fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })
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
                {isLoadingGender ? <div class="text-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
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
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label><FormattedMessage id="manage-user.pass" /></Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }} />
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
                                            <option key={index} value={item.key}>
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
                                            <option key={index} value={item.key}>
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
                                            <option key={index} value={item.key}>
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
                                        <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i class="fas fa-upload fa-lg"></i></label>
                                        <div className='preview-Img'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImg()}
                                        >

                                        </div>
                                    </div>
                                </Form.Group>
                            </Row>

                            <Button variant="primary"
                                type="submit"
                                onClick={() => this.hanldeSaveUser()}
                            >
                                <Form.Label><FormattedMessage id="manage-user.submit" /></Form.Label>
                            </Button>

                            {this.state.isOpen &&
                                <Lightbox
                                    mainSrc={this.state.previewImgUrl}
                                    onCloseRequest={() => this.setState({ isOpen: false })}
                                />
                            }
                        </Form>

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


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data))

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLaguageAppRedux: (language) => dispatch(actions.changeLaguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
