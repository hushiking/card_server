// @up_clue page
import './less';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModSearchSheet from '../../module/search_sheet';
import { UserConfig } from '../../config';
import { Button, Tabs, Upload, Message } from '../../skit_ui';
const TabPane = Tabs.TabPane;
class UserPage extends Component {
    static defaultProps = {
    }
    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    handleChange = (info) => {
        let fileList = info.fileList;
        // 1. Limit the number of uploaded files
        //    Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);

        // 2. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 3. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                console.log(file.response);
                if (file.response.status === 1) {
                    Message.success('导入成功');

                } else {
                    Message.error(file.response.errmsg || '导入失败');
                }
                // return file.response.status === 'success';
            }
            return true;
        });

        this.setState({ fileList });
    }
    render() {
        const props = {
            // beforeUpload: () => { return false },
            action: '/api/uploadUser',
            onChange: this.handleChange.bind(this),
            multiple: false,
            headers: {
            }
        };
        return (
            <div>
                <Upload {...props} fileList={this.state.fileList} >
                    <Button type="success" icon="download" onClick={this.handleInsert} >导入</Button>

                </Upload>
                <ModSearchSheet dataConfig={UserConfig} rowSelectionRow={true} status={true} />
            </div>

        );
    }
}
export default UserPage;