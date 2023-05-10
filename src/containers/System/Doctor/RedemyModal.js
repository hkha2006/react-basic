import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import { CommonUtils } from '../../../utils';
import './RedemyModal.scss'
import _ from 'lodash';
import { toast } from 'react-toastify';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';


class RedemyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''
        }
    }

    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }



    handleConfirmBooking = async () => {

    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handledOnChangeImg = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            // chuyển ảnh thành base64
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imgBase64: base64
            })
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }


    render() {
        let { isOpenModal, closeModal } = this.props
        return (
            <Modal
                isOpen={isOpenModal}
                className={'booking-modal-container'}
                size='lg'
                centered
            >
                <ModalHeader toggle={closeModal}>Gửi hóa đơn khám bệnh thành công</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>email Bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            ></input>
                        </div>

                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control' type='file'
                                onChange={(event) => this.handledOnChangeImg(event)}
                            ></input>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSendRemedy}>
                        Send
                    </Button>{' '}
                    <Button color="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )

    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RedemyModal);
