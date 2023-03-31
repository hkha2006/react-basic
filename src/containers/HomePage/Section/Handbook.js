import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bstuyetnga from '../../../assets/handbook/hb1.jpg'



class Handbook extends Component {


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'>Cẩm nang</span>
                        <button className='btn-more'>TẤT CẢ BÀI VIẾT</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            <div className='img-custom handbook'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section title-hb'>7 bác sĩ khám chữa bệnh Nội tiết Hà Nội giỏi nhiều kinh nghiệm (phần 2)</div>
                            </div>

                            <div className='img-custom handbook'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section title-hb'>7 bác sĩ khám chữa bệnh Nội tiết Hà Nội giỏi nhiều kinh nghiệm (phần 2)</div>
                            </div>

                            <div className='img-custom handbook'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section title-hb'>7 bác sĩ khám chữa bệnh Nội tiết Hà Nội giỏi nhiều kinh nghiệm (phần 2)</div>
                            </div>

                            <div className='img-custom handbook'>
                                <img src={bstuyetnga} alt='' />
                                <div className='text-section title-hb'>7 bác sĩ khám chữa bệnh Nội tiết Hà Nội giỏi nhiều kinh nghiệm (phần 2)</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
