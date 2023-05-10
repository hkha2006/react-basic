import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManagePatient.scss'
import { getAllPatientForDoctor, postSendRedemy } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import RedemyModal from './RedemyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay'
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRedemyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {

        this.getDataPatient()
    }

    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatedDate = new Date(currentDate).getTime()
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })

        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }


    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }

    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName
        }
        this.setState({
            isOpenRedemyModal: true,
            dataModal: data
        })
        // console.log('check data', data);
    }


    closeModal = () => {
        this.setState({
            isOpenRedemyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataChild) => {
        let { dataModal } = this.state
        this.setState({
            isShowLoading: true
        })
        let res = await postSendRedemy({
            email: dataChild.email,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
            language: this.props.language,
            imgBase64: dataChild.imgBase64,
            patientName: dataModal.patientName

        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Send Redemy Success!!!')
            this.closeModal()
            await this.getDataPatient()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Send Redemy Success!!!')
            console.log('error send', res);
        }
    }

    render() {
        // console.log('check state user', this.state);
        let { dataPatient, isOpenRedemyModal, dataModal } = this.state
        let { language } = this.props
        return (
            <>
                <div className='manage-patient-container'>
                    <div className='m-p-title'>
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className='manage-patient-body row'>
                        <div className='col-4 form-group'>
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                            />
                        </div>
                        <div className='col-12 table-manage-patient '>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Thời gian</th>
                                        <th scope="col">Họ và tên</th>
                                        <th scope="col">Địa chỉ</th>
                                        <th scope="col">Giới tính</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dataPatient && dataPatient.length > 0 ?
                                        dataPatient.map((item, index) => {
                                            let time = language === LANGUAGES.VI ?
                                                item.timeTypeDataPatient.valueVi : item.timeTypeDataPatient.valueEn
                                            let gender = language === LANGUAGES.VI ?
                                                item.patientData.genderData.valueVi : item.patientData.genderData.valueEn
                                            return (
                                                <tr key={index}>
                                                    <th scope="row">1</th>
                                                    <td>{time}</td>
                                                    <td>{item.patientData.firstName}</td>
                                                    <td>{item.patientData.address}</td>
                                                    <td>{gender}</td>
                                                    <td>
                                                        <button type='button' className='btn btn-primary'
                                                            onClick={() => this.handleBtnConfirm(item)}
                                                        >
                                                            Xác nhận
                                                        </button>
                                                    </td>
                                                </tr>)

                                        }
                                        ) :
                                        <tr></tr>
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>


                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <RedemyModal
                        isOpenModal={isOpenRedemyModal}
                        dataModal={dataModal}
                        closeModal={this.closeModal}
                        sendRemedy={this.sendRemedy}
                    />
                </LoadingOverlay>
            </>
        )

    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
