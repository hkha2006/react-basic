import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Header.scss'

class Header extends Component {

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i classNameName="fa fa-bars" aria-hidden="true"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b>Chuyên khoa</b>
                                </div>
                                <div className='subs-title'>
                                    Tìm bác sĩ theo chuyên khoa
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>Cơ sở y tế</b>
                                </div>
                                <div className='subs-title'>
                                    Chọn bệnh viện phòng khám
                                </div>
                            </div>

                            <div className='child-content'>
                                <div>
                                    <b>Bác sĩ</b>
                                </div >
                                <div className='subs-title'>
                                    Chọn bác sĩ giỏi
                                </div>
                            </div>

                            <div className='child-content'>
                                <div>
                                    <b>Gói khám</b>
                                </div>
                                <div className='subs-title'>
                                    Khám sức khỏe tổng quát
                                </div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <i classNameName="fa fa-question-circle" aria-hidden="true">Hỗ trợ</i>
                            <div className='flag'>VN</div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            NỀN TẢNG Y TẾ
                        </div>
                        <div className='title2'>
                            CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                        </div>
                        <div className='search'>
                            <i className="fa fa-search" aria-hidden="true"></i>

                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="far fa-hospital" aria-hidden="true"></i>

                                </div>
                                <div className='child-text'>
                                    Khám chuyên khoa
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-hospital-user"></i>

                                </div>
                                <div className='child-text'>
                                    Khám tổng quát
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-microscope"></i>

                                </div>
                                <div className='child-text'>
                                    Xét nghiệm y học
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-notes-medical"></i>

                                </div>
                                <div className='child-text'>
                                    Sức khỏe tinh thần
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-tooth"></i>
                                </div>
                                <div className='child-text'>
                                    Khám nha khoa
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-briefcase-medical"></i>

                                </div>
                                <div className='child-text'>
                                    Gói phẫu thuật
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa fa-ambulance" aria-hidden="true"></i>

                                </div>
                                <div className='child-text'>
                                    Sản phẩm y tế
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-hospital"></i>
                                </div>
                                <div className='child-text'>
                                    Sức khỏe doanh nghiệp
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
