import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'reactstrap';
import './BookingModal.scss'
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';


class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            selectedGender: '',
            genders: '',
            doctorId: '',
            timeType: '',
            isShowLoanding: false
        }
    }

    componentDidMount() {
        this.props.getGenders()

    }

    builDataGender = (data) => {
        let result = []
        let language = this.props.language

        if (data && data.length > 0) {
            // eslint-disable-next-line array-callback-return
            data.map(item => {
                let object = {};
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.builDataGender(this.props.genders)
            })
        }

        if (this.props.data !== prevProps.data) {
            let doctorId = this.props.data && !_.isEmpty(this.props.data) ? this.props.data.doctorId : ''
            let timeType = this.props.data && !_.isEmpty(this.props.data) ? this.props.data.timeType : ''
            this.setState({
                doctorId: doctorId,
                timeType: timeType
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption });

    }

    buildTimeBooking = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = language === LANGUAGES.VI ?
                moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+dataTime.date / 1000).locale('en').format('ddd-MM/DD/YYYY')
            let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn

            return `${time} - ${date}`
        }
        return ''
    }

    builDoctorName = (dataTime) => {
        let { language } = this.props
        if (dataTime && !_.isEmpty(dataTime)) {

            let name = language === LANGUAGES.VI ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
                : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`

            return name
        }
        return ''
    }


    handleConfirmBooking = async () => {
        // validate
        this.setState({
            isShowLoanding: true
        })
        let date = new Date(this.state.birthday).getTime()
        let timeString = this.buildTimeBooking(this.props.data)
        let doctorName = this.builDoctorName(this.props.data)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.data.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.props.data.doctorId,
            timeType: this.props.data.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
        })

        this.setState({
            isShowLoanding: false
        })

        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed!!!')
            this.props.isCloseModal()
        }
        else {
            toast.error('Booking a new appointment failed!!!')
        }
    }


    render() {
        let { isOpenModal, isCloseModal, data } = this.props
        let doctorId = data && !_.isEmpty(data) ? data.doctorId : ''
        // console.log('check datatime', data);
        return (
            <LoadingOverlay
                active={this.state.isShowLoanding}
                spinner
                text='Loading...'
            >
                <Modal
                    isOpen={isOpenModal}
                    className={'booking-modal-container'}
                    size='xl'
                    centered
                >
                    <div className='booking-modal-content'>
                        <div className='booking-modal-header'>
                            <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                            <span className='right'
                                onClick={isCloseModal}
                            >
                                <i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-modal-body'>
                            {/* {JSON.stringify(data)} */}
                            <div className='doctor-infor'>
                                <ProfileDoctor doctorId={doctorId}
                                    isShowDescriptionDoctor={false}
                                    dataTime={data}
                                    isShowLinkDetail={false}
                                    isShowPrice={true}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.fullName' /></label>
                                    <input className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.phoneNumber' /></label>
                                    <input className='form-control'
                                        value={this.state.phoneNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.email' /></label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                    <input className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.birthday' /></label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker}
                                        className='form-control'
                                        value={this.state.birthday}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label><FormattedMessage id='patient.booking-modal.gender' /></label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-modal-footer'>
                            <Button color='warning' className='btn-confirm'
                                onClick={() => this.handleConfirmBooking()}
                            ><FormattedMessage id='patient.booking-modal.btnConfirm' /></Button>
                            <Button color='danger' className='btn-cancel' onClick={isCloseModal}>
                                <FormattedMessage id='patient.booking-modal.btnCancel' /></Button>
                        </div>

                    </div>
                </Modal>
            </LoadingOverlay>
        )

    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
