import './less/index.less';
import React from 'react';
import { push } from 'react-router-redux';
import { Avatar, Menu, Icon, Button, Layout, Dropdown, Tabs } from '../../skit_ui';
import { DataHeader } from '../../components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSelf, fetchRestful } from '../../redux/api/common';
import { PROVINCE_LIST, CITY_LIST, BRAND_LIST, MODEL_LIST } from '../../redux/api/config';
import { savePublicAction } from '../../redux/actions';
import token from '../../utils/token';

// 引入遮罩层
import ConModal from '../../container/modal';

const { Header, Content, Sider } = Layout;
const TabPane = Tabs.TabPane;
const dataHeaderConfig = {
    title: 'productTitle'
};
class Home extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func
    };
    // static contextTypes = { router: React.PropTypes.object };
    constructor(props) {
        super(props);
        this.state = {
            menu: <Menu>
                <Menu.Item key="0">
                    <div onClick={()=> this.handleSignOut() }>退出</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="1" disabled><Icon type="user" />  个人中心  </Menu.Item>
            </Menu>,
            dataList: {},
            collapsed: false,
            curComponent: '',
            menuWrap: 240,
            userIcon: userIcon,
            userName: '',
            userIconUrl: '',
            curSelectSlider: '/home/user',
            sliderList: [
                {
                    text: '用户管理',
                    icon: 'user',
                    key: '/home/user'
                }
                // {
                //     text: '班长管理',
                //     icon: 'user',
                //     key: '/home/class_monitor'
                // }
            ]
        };
    }
    componentDidMount() {
        let {dispatch} = this.props;
        // 路由判断 进行列表展示
        let routePath = this.props.router.toJS().locationBeforeTransitions.pathname || '';
        if(!routePath || routePath === '/home/subject' || routePath === '/home'){
            routePath = '/home/user'
        }
        this.setState({
            curSelectSlider: routePath
        })
        // 获取项目需要的公共列表数据
        let publicData = {};
        let apiList = [];
        // let getDataList = [PROVINCE_LIST, CITY_LIST, BRAND_LIST, MODEL_LIST];
        // getDataList.map((item) => {
        //     apiList.push(fetchRestful('GET', item, {}, dispatch));
        // })
        // // 拿到请求回来的公共数据
        // Promise.all(apiList).then(res => {
        //     getDataList.map((item, index) => {
        //         publicData[item] = res[index].data;
        //     });
        //     // 都请求成功后 发送dispatch 存公共数据
        //     dispatch(savePublicAction({publicData}))
        // })

        //userinfo
        // let loginUser = token.getUser();
        // if (loginUser) {
        //     this.setState({userName: loginUser.nickname, userIconUrl: loginUser.icon});
        // }
    }
    // 点击左侧栏更换路由
    handleClick ({item, key}){
        this.props.dispatch(push(key));
        this.setState({
            curSelectSlider: key
        });
    }
    // 退出登录
    handleSignOut() {
        token.clearToken();
        token.clearUser();
        let {dispatch} = this.props;
        dispatch(push('/'));
    }
    handleToggleCollapsed() {
        if (this.state.collapsed) {
            this.setState({
                collapsed: !this.state.collapsed,
                menuWrap: 240,
                userIcon: userIcon
            });
        } else {
            this.setState({
                collapsed: !this.state.collapsed,
                menuWrap: 0,
                userIcon: userIcon
            });
        }
    }
    render() {
        const menuWrap = this.state.menuWrap;
        return (
            <Layout style={{ height: '100vh' }}>
                <Header className="header-showdow-Bottom" style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between' }} >
                    <DataHeader data={dataHeaderConfig} />
                    <Dropdown overlay={this.state.menu}>
                        <Icon className="home-dropdown-out" type="setting" />
                    </Dropdown>
                    <Button type="primary" onClick={() => { this.handleToggleCollapsed(); }} style={trigerBtn}>
                        <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                    </Button>
                </Header>
                <Layout >
                    <Sider width={menuWrap} style={{ background: '#43a142' }}>
                        <Avatar style={this.state.userIcon} icon="user" src={this.state.userIconUrl} />
                        <div style={userName}>{this.state.userName}</div>
                        {/* <Menu
                            defaultSelectedKeys={['customers']}
                            defaultOpenKeys={['customers']}
                            mode="inline"
                            theme="warm"
                            inlineCollapsed={this.state.collapsed}
                            onClick={this.handleClick}>
                            {sliderList.map((item, index) => {
                                return (
                                    <Menu.Item key="customers" key={item.key}>
                                        <Icon type={item.icon} />
                                        <span>{item.title}</span>
                                    </Menu.Item>
                                );
                            })}
                        </Menu> */}
                        
                        <Menu
                            selectedKeys={[this.state.curSelectSlider]}
                            defaultOpenKeys={['/home/user']}
                            mode="inline"
                            theme="warm"
                            inlineCollapsed={this.state.collapsed}
                            onClick={
                                (item, key)=>{
                                    this.handleClick(item, key);
                                }
                            }>
                            {this.state.sliderList.map((item) => {
                                return (
                                    <Menu.Item key={item.key}>
                                        <Icon type={item.icon} />
                                        <span>{item.text}</span>
                                    </Menu.Item>
                                );
                            })}
                        </Menu>
                    </Sider>
                    <Content style={homeContent}>
                        <ConModal />
                        {this.props.children}
                    
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
const mapStateToProps = state => {
    return {
        router :state.getIn(['router'])
    };
};
export default connect(mapStateToProps)(Home);

const userIcon = {
    backgroundColor: '#fff', color: '#43a142', width: 76, height: 76, margin: '15px 82px',
    marginTop: '80px',
    borderRadius: '50%', fontSize: 50, lineHeight: '76px'
};
const userName = {
    fontSize: 16,
    marginBottom: '60px',
    color: '#fff',
    textAlign: 'center'
};
const homeContent = {
    padding: '16px',
    overflow: 'auto'
};
const trigerBtn = {
    marginBottom: '16px',
    position: 'absolute',
    zIndex: '100',
    left: '195px',
    top: '19px',
    background: 'transparent',
    border: 'none'
};

