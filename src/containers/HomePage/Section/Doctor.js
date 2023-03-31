import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bstuyetnga from '../../../assets/doctor/bs-tuyet-nga.jpg'



class Doctor extends Component {


    render() {
        let settings = this.props.settings
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'>Bác sĩ phổ biến trong tuần</span>
                        <button className='btn-more'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='img-custom doctor'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section doctor-name'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                                <div className='text-section doctor-degree'>Sản phụ khoa</div>
                            </div>
                            <div className='img-custom doctor'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section doctor-name'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                                <div className='text-section doctor-degree'>Sản phụ khoa</div>
                            </div>
                            <div className='img-custom doctor'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section doctor-name'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                                <div className='text-section doctor-degree'>Sản phụ khoa</div>
                            </div>
                            <div className='img-custom doctor'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section doctor-name'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                                <div className='text-section doctor-degree'>Sản phụ khoa</div>
                            </div>
                            <div className='img-custom doctor'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section doctor-name'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                                <div className='text-section doctor-degree'>Sản phụ khoa</div>
                            </div>
                            <div className='img-custom doctor'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section doctor-name'>Bác sĩ Chuyên khoa I Phí Thị Tuyết Nga</div>
                                <div className='text-section doctor-degree'>Sản phụ khoa</div>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
