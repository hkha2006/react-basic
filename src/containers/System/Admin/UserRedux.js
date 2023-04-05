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
            isOpen: false
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }

        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
    }
    handledOnChangeImg = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl
            })
        }
    }

    openPreviewImg = () => {
        if (!this.state.previewImgUrl) return;
        this.setState({
            isOpen: true
        })
    }

    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        let positions = this.props.positions
        let roles = this.props.roles
        let isLoadingGender = this.props.isLoadingGender
        // console.log('check state from redux ', this.state);

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
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label><FormattedMessage id="manage-user.pass" /></Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><FormattedMessage id="manage-user.firstname" /></Form.Label>
                                    <Form.Control placeholder="first name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label><FormattedMessage id="manage-user.lastname" /></Form.Label>
                                    <Form.Control placeholder="last name" />
                                </Form.Group>
                            </Row>


                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridAddress">
                                    <Form.Label><FormattedMessage id="manage-user.address" /></Form.Label>
                                    <Form.Control placeholder='123 ADV' />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label><FormattedMessage id="manage-user.phone" /></Form.Label>
                                    <Form.Control />
                                </Form.Group>
                            </Row>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label><FormattedMessage id="manage-user.gender" /></Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        {genders && genders.length > 0 && genders.map((item, index) =>
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label><FormattedMessage id="manage-user.position" /></Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        {positions && positions.length > 0 && positions.map((item, index) =>
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )}
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label>RoleId</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        {roles && roles.length > 0 && roles.map((item, index) =>
                                            <option key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
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

                            <Button variant="primary" type="submit">
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
        getRoleStart: () => dispatch(actions.fetchRoleStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLaguageAppRedux: (language) => dispatch(actions.changeLaguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
