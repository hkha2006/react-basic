import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { getExtraInforDoctorById } from '../../../services/userService'
import { NumericFormat } from 'react-number-format';

class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetail: false,
            extraInfor: {}
        }
    }

    componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.language !== prevProps.language) {

        }
        if (this.props.detailDoctorId !== prevProps.detailDoctorId) {
            let res = await getExtraInforDoctorById(this.props.detailDoctorId)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    showHideDetailInfor = () => {
        this.setState({
            isShowDetail: !this.state.isShowDetail
        })
    }

    render() {
        let { isShowDetail, extraInfor } = this.state
        let { language } = this.props
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'> <FormattedMessage id='patient.extra-info-doctor.text-address' /></div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                {extraInfor ?
                    <div className='content-down'>
                        {isShowDetail === false ? <div className='short-infor'>
                            <span className='title-price'> <FormattedMessage id='patient.extra-info-doctor.price' /></span>
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                <span>
                                    <NumericFormat
                                        className='currency'
                                        displayType="text"
                                        value={extraInfor.priceTypeData.valueEn}
                                        thousandSeparator={true}
                                        suffix='$' />
                                </span>
                            }
                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                <span>
                                    <NumericFormat
                                        className='currency'
                                        displayType="text"
                                        value={extraInfor.priceTypeData.valueVi}
                                        thousandSeparator={true}
                                        suffix='đ' />
                                </span>
                            }
                            <span className='read-detail' onClick={() => this.showHideDetailInfor()}> <FormattedMessage id='patient.extra-info-doctor.read-more' /></span>
                        </div> :
                            <>
                                <div className='title-price'> <FormattedMessage id='patient.extra-info-doctor.price' /></div>
                                <div className='text-detail'>
                                    <div className='price'>
                                        <span className='text-left'> <FormattedMessage id='patient.extra-info-doctor.price' /></span>
                                        <span className='text-right'>
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.EN &&
                                                <span>
                                                    <NumericFormat
                                                        className='currency'
                                                        displayType="text"
                                                        value={extraInfor.priceTypeData.valueEn}
                                                        thousandSeparator={true}
                                                        suffix='$' />
                                                </span>
                                            }
                                            {extraInfor && extraInfor.priceTypeData && language === LANGUAGES.VI &&
                                                <span>
                                                    <NumericFormat
                                                        className='currency'
                                                        displayType="text"
                                                        value={extraInfor.priceTypeData.valueVi}
                                                        thousandSeparator={true}
                                                        suffix='đ' />
                                                </span>
                                            }
                                        </span>
                                    </div>
                                    <div className='note-price'>{extraInfor.note ? extraInfor.note : ''}</div>
                                </div>
                                <div className='payment'> <FormattedMessage id='patient.extra-info-doctor.payment' />{extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueVi : ''}</div>

                                <div className='hide-price'><span onClick={() => this.showHideDetailInfor()}><FormattedMessage id='patient.extra-info-doctor.hide-price' /></span></div>
                            </>
                        }



                    </div>
                    : <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>}



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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
