import React, {Component} from 'react'
import {Layout, Menu, Icon} from "antd"
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

import {MenuData} from "../../../analogData/basicMessage";//侧边栏配置数据
import styles from './index.less'
import logo from '../../../public/image/logo.png'

const {Sider} = Layout;
const {SubMenu} = Menu;


class SliderLayout extends Component {
    static propTypes = {
        collapsed: PropTypes.bool.isRequired,//收起状态
    };

    static defaultProps = {
        collapsed: false
    };

    constructor(props) {
        super(props);
    }

    state = {
        defaultOpenKeys: undefined,
        defaultSelectedKeys: [],//初始选中的菜单项 key 数组
        selectedKeys: [],//当前选中的key[]
    };
    componentWillMount = () => {
        this.selectedMenuItem()

    };
    componentDidMount = () => {
    };
    /**
     * 设置默认选择menu
     */
    selectedMenuItem = () => {
        const pathname = window.location.pathname;
        const selectedKeys = [pathname];
        const defaultOpenKeys = this.getDefaultOpenKeys(MenuData, pathname);
        defaultOpenKeys.pop();
        this.setState({
            selectedKeys,
            defaultOpenKeys,
        })
    };

    /**
     * 根据导航数据 获取选中菜单的默认展开项
     * @param data
     * @param pathname
     * @returns {Array}
     */
    getDefaultOpenKeys = (data, pathname) => {
        let keys = [];
        let result = false;
        data.some((value) => {
            const {children, action} = value;
            keys.push(action);//添加本对象的action
            if (Array.isArray(children) && children.length > 0) {
                const resultValue = this.getDefaultOpenKeys(children, pathname);
                if (Array.isArray(resultValue) && resultValue.length > 0) {
                    keys.push(...resultValue);
                    result = true;
                } else {
                    keys = [];
                }
            } else if (action === pathname) {//如果action 相等 则标志 找到目标选项
                result = true;
            }
            if (result) {
                return keys
            } else {
                keys = []
            }
        });
        return keys;
    };
    /**
     * 当切换submenu时的回调 可以设置默认首选操作
     * @param val
     */
    handelSubMenuOpenChange = (val) => {
        // console.log(val)
    };
    /**
     * 当menu-item 被选中时
     */
    handelSelected = ({item, key, selectedKeys}) => {
        this.setState({
            selectedKeys
        })
    };
    /**
     * menu list
     * @returns {Array}
     */
    getMenuDom = () => {
        const data = MenuData;
        let element = [];
        if (Array.isArray(data) && data.length > 0) {
            element = this.getMenuChild(data)
        }
        return element;
    };
    /**
     * 递归获取导航列表
     * @param data
     * @returns {Array}
     */
    getMenuChild = (data) => {
        let element = [];
        data.forEach((value) => {
            const child = value.children;
            if (Array.isArray(child) && child.length > 0) {
                element.push(
                    <SubMenu
                        key={value.action}
                        title={<span><Icon type={value.icon}/><span>{value.name}</span></span>}>
                        {this.getMenuChild(child)}
                    </SubMenu>
                );
            } else {
                const subMenu = (
                    <Menu.Item key={value.action}>
                        <Link to={value.action}>
                            <Icon type={value.icon}/>
                            <span style={{color: '#fff'}}>{value.name}</span>
                        </Link>
                    </Menu.Item>
                );
                element.push(subMenu);
            }
        });
        return element;
    };

    render() {
        const {collapsed} = this.props;
        const {defaultOpenKeys, selectedKeys} = this.state;
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}//收起状态
            >
                <div className={styles.logo} title="魔力耳朵">
                    <img src={logo} alt="" width={'48px'}/>
                </div>
                <Menu
                    defaultOpenKeys={defaultOpenKeys}//默认展开项目 数组['key']
                    selectedKeys={selectedKeys}
                    onOpenChange={this.handelSubMenuOpenChange}
                    onSelect={this.handelSelected}
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuDom()}
                </Menu>
            </Sider>

        );
    }
}

export default SliderLayout;