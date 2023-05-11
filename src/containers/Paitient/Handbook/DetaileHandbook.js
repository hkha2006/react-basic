import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailHandbookById } from '../../../services/userService';
import _ from 'lodash';
import './DetailHandbook.scss'

class DetailHandbook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            let res = await getDetailHandbookById({
                id: id,
            })


            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailHandbook: res.data
                })

            }
        }

    }

    componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { dataDetailHandbook } = this.state
        return (
            <div className='detail-handbook-container'>
                <HomeHeader isShowBanner={false} />
                <div className='detail-handbook-body'>
                    {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) &&
                        <>
                            <div className='title-handbook'>
                                <div className='bg-title'>
                                    <div className='text-title'>
                                        {dataDetailHandbook.name}</div>
                                </div>

                            </div>
                            <div className='content-handbook' dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }}>
                            </div>
                        </>
                    }
                </div>
            </div>
        )

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);
