import React, { Component } from 'react';
import { connect } from 'react-redux';



class HomeFooter extends Component {


    render() {
        return (
            <div className='section footer'>
                <div className='row footer'>
                    <div className='col-6 left'>
                        <p>&copy; 2023 Dang Hoang Kha</p>
                    </div>
                    <div className='col-6 right'>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-youtube"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
