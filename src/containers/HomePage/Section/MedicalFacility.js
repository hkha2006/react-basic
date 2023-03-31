import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import choray from '../../../assets/medicalfacility/cho-ray.jpg';
import yduoc from '../../../assets/medicalfacility/dh-y-duoc.jpg';
import hungviet from '../../../assets/medicalfacility/hung-viet.png';
import meditec from '../../../assets/medicalfacility/meditec.jpeg';
import quandoi from '../../../assets/medicalfacility/quan-doi.jpg';
import vietduc from '../../../assets/medicalfacility/viet-duc.jpg';

class MedicalFacility extends Component {

    render() {
        let settings = this.props.settings
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'>Cơ sở y tế nổi bật</span>
                        <button className='btn-more'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='img-custom'>
                                <img src={choray} alt='' />
                                <div className='text-section'>Bệnh viện Chợ Rẫy</div>
                            </div>
                            <div className='img-custom'>
                                <img src={yduoc} alt='' />
                                <div className='text-section'>Phòng khám Bệnh viện Đại học Y Dược 1</div>
                            </div>
                            <div className='img-custom'>
                                <img src={vietduc} alt='' />
                                <div className='text-section'>Bệnh viện Hữu nghị Việt Đức</div>
                            </div>
                            <div className='img-custom'>
                                <img src={quandoi} alt='' />
                                <div className='text-section'>Trung tâm Khám sức khỏe định kỳ, Bệnh viện Trung ương Quân đội 108</div>
                            </div>
                            <div className='img-custom'>
                                <img src={hungviet} alt='' />
                                <div className='text-section'>Bệnh viện Ung bướu Hưng Việt</div>
                            </div>
                            <div className='img-custom'>
                                <img src={meditec} alt='' />
                                <div className='text-section'>Phòng khám Đa khoa Meditec</div>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
