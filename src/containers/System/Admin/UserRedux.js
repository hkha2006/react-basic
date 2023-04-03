import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormattedMessage } from 'react-intl';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as actions from '../../../store/actions'

class UserRedux extends Component {



    constructor(props) {
        super(props)
        this.state = {
            genderArr: []
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        // try {
        //     let res = await getAllCodeService('gender')
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (error) {
        //     console.log('error');
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }
    }


    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        console.log('check props from redux ', this.props.genderRedux);
        return (
            <div>
                <div className='title'>
                    <FormattedMessage id="manage-user.add" />
                </div>
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
                                    <option>Male....</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>RoleId</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Male...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label><FormattedMessage id="manage-user.img" /></Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row>




                        <Button variant="primary" type="submit">
                            <Form.Label><FormattedMessage id="manage-user.submit" /></Form.Label>
                        </Button>
                    </Form>
                </div>

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart())
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLaguageAppRedux: (language) => dispatch(actions.changeLaguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
