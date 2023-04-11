import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { LANGUAGES } from "../../../utils"
import { FormattedMessage } from 'react-intl';
class Doctor extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    render() {
        // console.log('check props', this.props.topDoctors);
        let settings = this.props.settings
        let arrTopDoctors = this.state.arrDoctors
        let language = this.props.language
        //nối thêm chuỗi về db ko đủ
        // arrTopDoctors = arrTopDoctors.concat(arrTopDoctors).concat(arrTopDoctors)
        return (
            <div className='section'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'><FormattedMessage id="homepage.doctor" /></span>
                        <button className='btn-more'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...settings}>

                            {arrTopDoctors && arrTopDoctors.length > 0 && arrTopDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64').toString('binary')
                                }
                                let nameVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`
                                let nameEn = `${item.positionData.valueEn} ${item.firstName} ${item.lastName}`
                                return (
                                    <div className='img-custom doctor' key={index}>
                                        <img src={`${imageBase64}`} alt='' />
                                        <div className='text-section doctor-name'>
                                            {language === LANGUAGES.VI ? nameVi : nameEn}
                                        </div>
                                        <div className='text-section doctor-degree'>Sản phụ khoa</div>
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
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
