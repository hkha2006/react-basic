import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Header.scss'
import { LANGUAGES } from "../../utils"
import { changeLaguageApp } from '../../store/actions/appActions';

class Header extends Component {

    changeLaguage = (language) => {
        this.props.changeLaguageAppRedux(language)
    }

    render() {

        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.speciality" /> </b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.finddoctor" />
                                </div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.health-facilities" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.choose-hospital" />
                                </div>
                            </div>

                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.doctor" /></b>
                                </div >
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.choose-good-doctor" />
                                </div>
                            </div>

                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.checkup" /></b>
                                </div>
                                <div className='subs-title'>
                                    <FormattedMessage id="home-header.general-health-check" />
                                </div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div className='support'><i class="fas fa-question-circle"></i> <FormattedMessage id="home-header.support" /></div>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLaguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLaguage(LANGUAGES.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='content-up'>
                        <div className='title1'>
                            <FormattedMessage id="banner-header.title1" />
                        </div>
                        <div className='title2'>
                            <FormattedMessage id="banner-header.title2" />
                        </div>
                        <div className='search'>
                            <i className="fa fa-search" aria-hidden="true"></i>

                            <input type='text' placeholder='Tìm chuyên khoa khám bệnh' />
                        </div>
                    </div>
                    <div className='content-down'>
                        <div className='options'>
                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="far fa-hospital" aria-hidden="true"></i>

                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.specialist-examination" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-hospital-user"></i>

                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.general-examination" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-microscope"></i>

                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.medical-test" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-notes-medical"></i>

                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.mental-health" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-tooth"></i>
                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.dental" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-briefcase-medical"></i>

                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.surgery-package" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa fa-ambulance" aria-hidden="true"></i>

                                </div>
                                <div className='child-text'>
                                    <FormattedMessage id="banner-header.medical-products" />
                                </div>
                            </div>

                            <div className='option-child'>
                                <div className='child-icon'>
                                    <i className="fa-solid fa-hospital"></i>
                                </div>
                                <div className='child-text'>
                                    < FormattedMessage id="banner-header.bussiness-health" />
                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </React.Fragment>
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
        changeLaguageAppRedux: (language) => dispatch(changeLaguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
