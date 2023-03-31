import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss'
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
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div className='section-specialty'>
                <div className='specialty-container'>
                    <div className='specialty-header'>
                        <span className='specialty-titile'>Chuyên khoa phổ biến</span>
                        <button className='btn-more'>XEM THÊM</button>
                    </div>
                    <div className='specialty-body'>
                        <Slider {...settings}>
                            <div className='img-custom'>
                                <img src={coxuongkhop} alt='' />
                                <div className='text-specialty'>Cơ xương khớp</div>
                            </div>
                            <div className='img-custom'>
                                <img src={cotsong} alt='' />
                                <div className='text-specialty'>Cột sống</div>
                            </div>
                            <div className='img-custom'>
                                <img src={taimuihong} alt='' />
                                <div className='text-specialty'>Tai mũi họng</div>
                            </div>
                            <div className='img-custom'>
                                <img src={thankinh} alt='' />
                                <div className='text-specialty'>Thần kinh</div>
                            </div>
                            <div className='img-custom'>
                                <img src={tieuhoa} alt='' />
                                <div className='text-specialty'>Tiêu hóa</div>
                            </div>
                            <div className='img-custom'>
                                <img src={timmach} alt='' />
                                <div className='text-specialty'>Tim mạch</div>
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
