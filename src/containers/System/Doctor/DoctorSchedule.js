import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss'
import { LANGUAGES } from '../../../utils';
import moment from 'moment';
import localizaton from 'moment/locale/vi'
import { getScheduleDoctorByDate } from '../../../services/userService'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
        }
    }
    // viết hoa chữ cái đầu
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    componentDidMount() {
        let { language } = this.props

        // console.log('moment vi: ', moment(new Date()).format('dddd - DD/MM'));
        // console.log('moment en ', moment(new Date()).locale('en').format('ddd - DD/MM'));

        let arrDays = []
        for (let i = 0; i < 7; i++) {
            let object = {}
            object.labelVi = this.capitalizeFirstLetter(moment(new Date()).add(i, 'days').format('dddd - DD/MM'))
            object.labelEn = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
            object.value = moment(new Date()).add(i, 'days').locale('en').startOf('day').valueOf()
            arrDays.push(object)
        }

        this.setState({
            allDays: arrDays,
            allAvailableTime: []
        })
    }

    async componentDidUpdate(prevProps, prevState) {

    }

    handleOnChageSelect = async (event) => {
        console.log('check detail doctor', this.props.detailDoctorId);
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
    render() {
        let { allDays, allAvailableTime } = this.state
        let { language } = this.props
        console.log('check allAvilabel', allAvailableTime);
        return (
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
                        <span><i class="fas fa-calendar-alt"></i>Lịch khám</span>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                allAvailableTime.map((item, index) => {
                                    let timeDisplay = language === LANGUAGES.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                    return (
                                        <button key={index}>{timeDisplay}</button>
                                    )
                                })
                                :
                                <div className='text-no-schedule'>Bác sĩ không có lịch hẹn, vui lòng chọn ngày khác.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
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
