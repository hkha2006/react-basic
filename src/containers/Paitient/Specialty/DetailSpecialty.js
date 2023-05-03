import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../../System/Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';




class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [25, 26, 32]

        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { arrDoctorId } = this.state
        return (
            <div className='detail-specialty-container'>
                <HomeHeader isShowBanner={false} />
                <div className='detail-specialty-body'>


                    <div className='description-specialty'>

                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (

                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor doctorId={item}
                                                isShowDescriptionDoctor={true}
                                            // dataTime={data}    
                                            />
                                        </div>


                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                detailDoctorId={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor detailDoctorId={item} />

                                        </div>

                                    </div>
                                </div>

                            )
                        })
                    }
                </div>

            </div>

        )

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
