import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss"
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';


const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            listDoctors: ''
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors()
    }

    bulidDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props
        if (inputData && inputData.length > 0) {
            // eslint-disable-next-line array-callback-return
            inputData.map((item, index) => {
                let object = {}
                let labelVi = `${item.lastName} ${item.firstName}`
                let labelEn = `${item.firstName} ${item.lastName}`
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            })
        }

        return result
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors || prevProps.language !== this.props.language) {
            let dataSelect = this.bulidDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
        console.log('handleEditorChange', html, text);
    }

    handleSaveContent = () => {
        console.log('check state', this.state);
        this.props.saveDetailDoctors({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value
        })
    }

    handleChange = (selectedDoctor) => {
        this.setState({ selectedDoctor }, () =>
            console.log(`Option selected:`, this.state.selectedDoctor)
        );
    }

    handleChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        return (

            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thông tin bác sĩ
                </div>
                <div className='more-info'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className='content-right'>

                        <label>Thông tin giới thiệu</label>
                        <textarea className='form-control' rows="5"
                            onChange={(event) => this.handleChangeDesc(event)}
                            value={this.state.description}
                        >

                        </textarea>


                    </div>
                </div>

                <div className='manage-doctor-editor'>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
                </div>
                <button
                    onClick={() => this.handleSaveContent()}
                    type="button"
                    className="btn btn-primary save-content">
                    Save
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        saveDetailDoctors: (data) => dispatch(actions.saveDoctors(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);

