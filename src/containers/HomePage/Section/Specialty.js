import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import coxuongkhop from '../../../assets/specialtyImg/co-xuong-khop.jpg';
import { getAllSpecialties } from '../../../services/userService';

class Specialty extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialties()
        console.log('check state', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    render() {
        let { dataSpecialty } = this.state
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
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='img-custom' key={index}>
                                            <img src={`${item.image}`} alt='' />
                                            <div className='text-section'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }


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
