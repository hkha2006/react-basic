import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
// import { FormattedMessage } from 'react-intl';
import Specialty from './Section/Specialty';


class HomePage extends Component {

    render() {

        return (
            <div>
                <Header />
                <Specialty />

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
