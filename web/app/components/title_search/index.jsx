import React, { Component, ProTypes } from 'react';
import { Input, Button } from '../../skit_ui';
const Search = Input.Search;
import './less';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { modalStatusAction } from '../../redux/actions';
class TitleSearch extends Component {
    static proTypes = {
    }
    static defaultProps = {
    }
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentWillMount() {
    }
    componentDidMount() {
    }
    addAction(){
        const { query } = hashHistory.getCurrentLocation();
        const { dispatch } = this.props;
        dispatch(modalStatusAction( {
            modalParams: query,
            curForm: this.props.data.addForm.curForm,
            modalTitle: this.props.data.addForm.modalTitle,
            status: true,
            rodam: Math.random(0, 1)
        }));
    };
    render() {
        return (
            <div className="titleSearchContainer">
                <div className="title">{this.props.data.title}</div>
                <div className="searchContainer">
                        {/* <Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                            className="spaceRight"
                        /> */}
                        <Button onClick={()=>{
                            this.addAction();
                        }} type="success" icon="plus"  className="spaceRight">
                            新增
                        </Button>
                </div>
            </div>
        )
    }
}
export default connect()(TitleSearch);