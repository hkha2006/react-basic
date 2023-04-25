import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss'


class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');

            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { statusVerify, errCode } = this.state

        return (
            <>
                <HomeHeader />
                <div className='verify-email-container'>
                    {statusVerify === false ?
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                        :
                        <div className='verify-email'>
                            {errCode === 0 ?
                                <div className='text-infor'>Xác nhận lịch hẹn thành công.</div> : <div className='text-infor'>Lịch hẹn đã xác nhận hoặc không tồn tại!!!</div>
                            }
                        </div>
                    }
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
