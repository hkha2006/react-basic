import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHandbooks } from '../../../services/userService';
import { withRouter } from 'react-router';

class Handbook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataHandbook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandbooks()
        console.log('check state', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (handbook) => {
        this.props.history.push(`/detail-handbook/${handbook.id}`)
    }

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
        };
        let { dataHandbook } = this.state
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'>Cẩm nang</span>
                        <button className='btn-more'>TẤT CẢ BÀI VIẾT</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>
                            {dataHandbook && dataHandbook.length > 0 &&
                                dataHandbook.map((item, index) => {
                                    return (
                                        <div className='img-custom handbook' key={index} onClick={() => this.handleViewDetailHandbook(item)}>
                                            <img src={`${item.image}`} alt='' />
                                            <div className='text-section title-hb'>{item.name}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Handbook));
