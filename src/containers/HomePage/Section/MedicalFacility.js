import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinics } from '../../../services/userService';
import { withRouter } from 'react-router';

class MedicalFacility extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinics()
        console.log('check state', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`)
    }
    render() {
        let { dataClinic } = this.state
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
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='img-custom' key={index} onClick={() => this.handleViewDetailClinic(item)}>
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
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
