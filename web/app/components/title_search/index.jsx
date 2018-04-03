import React, { Component, ProTypes } from 'react';
import { Input, Button } from '../../skit_ui';
const Search = Input.Search;
import './less';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { modalStatusAction, refrehTableAction } from '../../redux/actions';
import { fetchGet, fetchSelf, fetchRestful } from '../../redux/api/common';
class TitleSearch extends Component {
    static proTypes = {
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props)
        this.state = {
            status: true,
            btnText: '新增'
        };
    }
    componentWillMount() {
    }
    componentDidMount() {
        let { status, btnText } = this.props;
        this.setState({
            status,
            btnText
        });
    }
    searchUser(value) {
        let {dispatch} = this.props;
        dispatch(refrehTableAction({real_name: value}));
    }
    addAction() {
        const { query } = hashHistory.getCurrentLocation();
        const { dispatch } = this.props;
        dispatch(modalStatusAction({
            modalParams: query,
            curForm: this.props.data.addForm.curForm,
            modalTitle: this.props.data.addForm.modalTitle,
            status: true,
            rodam: Math.random(0, 1)
        }));
    };
    render() {
        let { hasSearch } = this.props;
        console.log(hasSearch)
        let searchView;
        hasSearch ? searchView = <Search
            placeholder="input search text"
            onSearch={value => this.searchUser(value)}
            style={{ width: 200 }}
            className="spaceRight"
        /> : searchView = null;
        let AddBtnStatus;
        let { status, btnText } = this.state;
        status ? AddBtnStatus = <Button onClick={() => { this.addAction() }} type="success" icon="plus" className="spaceRight">{btnText}</Button> : null;
        return (
            <div className="titleSearchContainer">
                <div className="title">{this.props.data.title}</div>
                <div className="searchContainer">
                    {searchView}
                    {AddBtnStatus}
                </div>
            </div>
        );
    }
}
export default connect()(TitleSearch);
