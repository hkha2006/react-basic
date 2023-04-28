import React, { Component } from 'react';
import { connect } from 'react-redux';
import suckhoedoisong from '../../../assets/paper/suckhoedoisong.png'
import boyte from '../../../assets/paper/bo-y-te.png'
import ictnews from '../../../assets/paper/ictnews.png'
import infonet from '../../../assets/paper/infonet.png'
import vtv1 from '../../../assets/paper/vtv1.png'
import vtcnews from '../../../assets/paper/vtcnews.png'
import vnexpress from '../../../assets/paper/vnexpress.png'



class Media extends Component {


    render() {
        return (
            <div className='section media'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='section-titile'>Truyền thông nói gì về Booking care</span>
                    </div>
                    <div className='section-body media row'>
                        <div className='col-6'>
                            <iframe width="560" height="315"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen></iframe>
                        </div>

                        <div className='col-6 paper'>
                            <div className='paper-detail'>
                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={suckhoedoisong} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm" rel="noreferrer">
                                    <img src={boyte} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={ictnews} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={infonet} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={vtv1} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={vnexpress} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={vtcnews} className='paper-detail' alt='' style={{ backgroundColor: '#a3171e', borderRadius: '5px' }}></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={ictnews} className='paper-detail' alt=''></img>
                                </a>

                                <a target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html" rel="noreferrer">
                                    <img src={vtv1} className='paper-detail' alt=''></img>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(Media);
