import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import coxuongkhop from '../../../assets/specialtyImg/co-xuong-khop.jpg';
import cotsong from '../../../assets/specialtyImg/cot-song.jpg';
import taimuihong from '../../../assets/specialtyImg/tai-mui-hong.jpg';
import thankinh from '../../../assets/specialtyImg/than-kinh.jpg';
import tieuhoa from '../../../assets/specialtyImg/tieu-hoa.jpg';
import timmach from '../../../assets/specialtyImg/tim-mach.jpg';



class Specialty extends Component {


    render() {
        let settings = this.props.settings
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'>Chuyên khoa phổ biến</span>
                        <button className='btn-more'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='img-custom'>
                                <img src={coxuongkhop} alt='' />
                                <div className='text-section'>Cơ xương khớp</div>
                            </div>
                            <div className='img-custom'>
                                <img src={cotsong} alt='' />
                                <div className='text-section'>Cột sống</div>
                            </div>
                            <div className='img-custom'>
                                <img src={taimuihong} alt='' />
                                <div className='text-section'>Tai mũi họng</div>
                            </div>
                            <div className='img-custom'>
                                <img src={thankinh} alt='' />
                                <div className='text-section'>Thần kinh</div>
                            </div>
                            <div className='img-custom'>
                                <img src={tieuhoa} alt='' />
                                <div className='text-section'>Tiêu hóa</div>
                            </div>
                            <div className='img-custom'>
                                <img src={timmach} alt='' />
                                <div className='text-section'>Tim mạch</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
