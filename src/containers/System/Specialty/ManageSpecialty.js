import React, { Component } from 'react';
import { connect } from "react-redux";
import { LANGUAGES, CommonUtils } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewSpecialty } from '../../../services/userService';
import { toast } from 'react-toastify';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionMarkdown: '',
            descriptionHTML: '',
        }
    }

    componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
        // console.log('handleEditorChange', html, text);
    }

    handledOnChangeImg = async (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            // chuyển ảnh thành base64
            let base64 = await CommonUtils.getBase64(file)
            this.setState({
                imageBase64: base64
            })
        }
    }

    handleSaveSpecialty = async () => {
        let res = await createNewSpecialty(this.state)
        if (res && res.errCode === 0) {
            toast.success('Create new Specialty succeed!!!')
            this.setState({
                name: '',
                imageBase64: '',
                descriptionMarkdown: '',
                descriptionHTML: '',
            })
        } else {
            toast.error('Create failed!!!')
            console.log('check err', res);
        }
    }


    render() {

        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý chuyên khoa</div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên chuyên khoa</label>
                        <input className='form-control'
                            type='text'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        />
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh chuyên khoa</label>
                        <input className='form-control'
                            type='file'
                            onChange={(event) => this.handledOnChangeImg(event)}
                        />
                    </div>
                    <div className='markdown col-12'>
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button type="button" class="save-specialty btn btn-info"
                            onClick={() => this.handleSaveSpecialty()}
                        >
                            Save</button>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
