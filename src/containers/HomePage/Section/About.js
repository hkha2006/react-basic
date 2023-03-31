import React, { Component } from 'react';
import { connect } from 'react-redux';



class About extends Component {


    render() {
        return (
            <div className='section about'>
                <div className='row about-container'>
                    <div className='col-5 about-left'>
                        <div className='about-logo'>

                        </div>
                        <div className='about-address'>
                            <span><b>Công ty Cổ phần Công nghệ Bookingcare</b></span><br />
                            <span> <i class="fas fa-map-marker"></i>  Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội.</span><br />
                            <span><i class="fas fa-check"></i>  ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015.</span>
                        </div>
                    </div>
                    <div className='col-3 about-center'>
                        <ul>
                            <li>
                                <a href='#'>Liên hệ hợp tác</a>
                            </li>
                            <li>
                                <a href='#'>Gói chuyển đổi số doanh nghiệp</a>
                            </li>
                            <li>
                                <a href='#'>Tuyển dụng</a>
                            </li>
                            <li>
                                <a href='#'>Câu hỏi thường gặp</a>
                            </li>
                            <li>
                                <a href='#'>Điều khoản sử dụng</a>
                            </li>
                            <li>
                                <a href='#'>Chính sách bảo mật</a>
                            </li>
                            <li>
                                <a href='#'>Quy trình hỗ trợ và giải quyết khiếu nại</a>
                            </li>
                            <li>
                                <a href='#'>Quy chế hoạt động</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-4 about-right'>
                        <p><b>Trụ ở tại Hà Nội</b><br />
                            Tầng 6, Tòa nhà D'Office, tổ 28, P. Dịch Vọng, Q. Cầu Giấy, Tp. Hà Nội
                        </p>
                        <p><b>Văn phòng tại TP Hồ Chí Minh</b><br />
                            Số 01, Hồ Bá Kiện, Phường 15, Quận 10
                        </p>
                        <p><b>Hỗ trợ khách hàng</b><br />
                            support@bookingcare.vn (7h - 20h)
                        </p>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);