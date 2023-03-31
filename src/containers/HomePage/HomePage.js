import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
// import { FormattedMessage } from 'react-intl';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import Doctor from './Section/Doctor';
import Handbook from './Section/Handbook';
import './StyleHomePage.scss'


class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div>
                <Header />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <Doctor settings={settings} />
                <Handbook />

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
