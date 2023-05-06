import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localizaton from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'
import { FormattedMessage } from 'react-intl';
import BookingModal from '../../Paitient/Doctor/Modal/BookingModal'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isOpenModalTime: false,
            dataScheduleTimeModal: {}
        }
    }
    // viết hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        let allDays = this.getArrDays()
        if (this.props.detailDoctorId) {
            console.log('check allDay', allDays);
            let res = await getScheduleDoctorByDate(this.props.detailDoctorId, allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
        this.setState({
            allDays: allDays
        })


    }

    getArrDays = () => {
        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}

            // if (i === 0) {
            //     let ddMM = moment(new Date()).add(i, 'days').format('DD/MM')

            //     let todayVi = `Hôm nay - ${ddMM}`
            //     object.labelVi = todayVi

            //     let todayEn = `Today - ${ddMM}`
            //     object.labelEn = todayEn

            // } else {
            //     object.labelVi = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
            //     object.labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            //     object.value = moment(new Date()).add(i, 'days').locale('en').startOf('day').valueOf()
            // }

            object.labelVi = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
            object.labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').locale('en').startOf('day').valueOf()
            arrDays.push(object)
        }
        return arrDays
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
            let res = await getScheduleDoctorByDate(this.props.detailDoctorId, this.state.allDays[0].value)
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })

        }
    }

    handleOnChageSelect = async (event) => {
        if (this.props.detailDoctorId && this.props.detailDoctorId !== -1) {
            let doctorId = this.props.detailDoctorId
            let date = event.target.value
            let res = await getScheduleDoctorByDate(doctorId, date)
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })
            }
        }
    }

    hanleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalTime: true,
            dataScheduleTimeModal: time
        })
    }

    closeBookingModal = () => {
        this.setState({
            isOpenModalTime: false
        })
    }
    render() {
        let { allDays, allAvailableTime, isOpenModalTime, dataScheduleTimeModal } = this.state
        let { language } = this.props
        // console.log('check allAvilabel', allAvailableTime);
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>
                        <select onChange={(event) => this.handleOnChageSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return (
                                    <option key={index} value={item.value}> {language === LANGUAGES.VI ? item.labelVi : item.labelEn}</option>
                                )
                            })}

                        </select>
                    </div>
                    <div className='all-available-time'>
                        <div className='text-calendar'>
                            <span className='text-schedule'><i className="fas fa-calendar-alt"></i><FormattedMessage id="patient.detail-doctor.schedule" /></span>
                            <div className='time-content'>
                                {allAvailableTime && allAvailableTime.length > 0 ?
                                    <>
                                        <div className='time-content-btns'>
                                            {allAvailableTime.map((item, index) => {
                                                let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => this.hanleClickScheduleTime(item)}
                                                    >{timeDisplay}</button>
                                                )
                                            })
                                            }
                                        </div>
                                        <div className='book-free'>
                                            <span><FormattedMessage id="patient.detail-doctor.select" /> <i className="fas fa-hand-point-up"></i><FormattedMessage id="patient.detail-doctor.book-free" /></span>
                                        </div>
                                    </>
                                    :
                                    <div className='text-no-schedule'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <BookingModal
                    isOpenModal={isOpenModalTime}
                    isCloseModal={this.closeBookingModal}
                    data={dataScheduleTimeModal} />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
